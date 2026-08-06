<script setup lang="ts">
import tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { collaboratorRoutes, mapCenter } from '@/data/ecoRouteMock';
import type { CollaboratorRoute, LatLng, RouteStop } from '@/data/ecoRouteMock';
import type { MapStatusFilter, ServiceStatus } from '@/data/serviceStatus';
import { STATUS_COLORS } from '@/data/serviceStatus';
import { toLngLat } from '@/lib/maps/geo';
import { pinMarkerElement } from '@/lib/maps/markerIcons';
import { fetchRoadRoute } from '@/lib/maps/tomtomRouting';

export type StopSelection = {
    route: CollaboratorRoute;
    stop: RouteStop;
    stopIndex: number;
};

type Props = {
    dark: boolean;
    statusFilter?: MapStatusFilter | null;
};

const props = defineProps<Props>();

const emit = defineEmits<{
    error: [message: string];
    'select-stop': [selection: StopSelection];
}>();

const mapContainer = ref<HTMLDivElement | null>(null);
let map: tt.Map | null = null;
const markers: tt.Marker[] = [];

type StopMarker = { icon: SVGElement; status: ServiceStatus };
const stopMarkers: StopMarker[] = [];

const ROUTE_LINE_COLORS = [
    '#6366f1',
    '#ec4899',
    '#0ea5e9',
    '#f97316',
    '#8b5cf6',
];

type RouteLine = {
    id: string;
    color: string;
    coordinates: [number, number][];
};

let routeLines: RouteLine[] | null = null;

function styleFor(dark: boolean): tt.MapStyleConfig {
    return {
        map: dark ? 'basic_night' : 'basic_main',
        poi: 'poi_main',
        trafficIncidents: dark ? 'incidents_dark' : 'incidents_day',
        trafficFlow: dark ? 'flow_relative0-dark' : 'flow_relative0',
    };
}

async function loadRouteFeatures(apiKey: string): Promise<void> {
    routeLines = await Promise.all(
        collaboratorRoutes.map(async (route, index) => {
            const waypoints = route.stops.map((stop) => stop.position);
            const roadPath = await fetchRoadRoute(waypoints, apiKey);

            return {
                id: route.id,
                color: ROUTE_LINE_COLORS[index % ROUTE_LINE_COLORS.length],
                coordinates: (roadPath ?? waypoints).map(toLngLat),
            };
        }),
    );
}

function addRouteLayers(): void {
    if (!map || !routeLines) {
        return;
    }

    for (const route of routeLines) {
        const sourceId = `eco-rota-route-${route.id}`;

        if (map.getSource(sourceId)) {
            continue;
        }

        map.addSource(sourceId, {
            type: 'geojson',
            data: {
                type: 'Feature',
                geometry: { type: 'LineString', coordinates: route.coordinates },
                properties: {},
            },
        });

        map.addLayer({
            id: `${sourceId}-line`,
            type: 'line',
            source: sourceId,
            paint: { 'line-color': route.color, 'line-width': 3 },
        });
    }
}

function matchesStatusFilter(
    status: ServiceStatus,
    filter: MapStatusFilter | null | undefined,
): boolean {
    if (!filter) {
        return true;
    }

    if (filter === 'active') {
        return status === 'waiting' || status === 'in-progress';
    }

    return status === filter;
}

function applyStatusFilter(): void {
    const filter = props.statusFilter ?? null;

    for (const stopMarker of stopMarkers) {
        const matched = matchesStatusFilter(stopMarker.status, filter);
        stopMarker.icon.style.opacity = matched ? '1' : '0.3';
        stopMarker.icon.style.transform =
            matched && filter ? 'scale(1.15)' : 'scale(1)';
    }
}

function addMarkers(): void {
    if (!map) {
        return;
    }

    for (const route of collaboratorRoutes) {
        for (const [stopIndex, stop] of route.stops.entries()) {
            const element = pinMarkerElement(
                route.initials,
                STATUS_COLORS[stop.status],
            );
            const icon = element.firstElementChild as SVGElement;
            icon.style.transition = 'transform 0.2s ease, opacity 0.2s ease';
            icon.style.transformOrigin = 'bottom center';
            element.style.cursor = 'pointer';
            element.addEventListener('click', (event) => {
                event.stopPropagation();
                emit('select-stop', { route, stop, stopIndex });
            });

            const marker = new tt.Marker({ element, anchor: 'bottom' })
                .setLngLat(toLngLat(stop.position))
                .addTo(map);

            markers.push(marker);
            stopMarkers.push({ icon, status: stop.status });
        }
    }

    applyStatusFilter();
}

function initMap(): void {
    if (!mapContainer.value) {
        return;
    }

    const apiKey = import.meta.env.VITE_TOMTOM_API_KEY as string | undefined;

    if (!apiKey) {
        emit(
            'error',
            'VITE_TOMTOM_API_KEY não está definida. Configure a chave da TomTom Maps API no arquivo .env.',
        );

        return;
    }

    try {
        map = tt.map({
            key: apiKey,
            container: mapContainer.value,
            language: 'pt-BR',
            style: styleFor(props.dark),
            center: toLngLat(mapCenter),
            zoom: 13.5,
        });

        map.on('error', (event) => {
            emit(
                'error',
                event.error.message ||
                    'Não foi possível carregar o TomTom Maps.',
            );
        });

        map.on('load', () => {
            addMarkers();
            void loadRouteFeatures(apiKey).then(addRouteLayers);
        });
        map.on('styledata', addRouteLayers);
    } catch (error) {
        emit(
            'error',
            error instanceof Error
                ? error.message
                : 'Não foi possível carregar o TomTom Maps.',
        );
    }
}

watch(
    () => props.dark,
    (dark) => {
        map?.setStyle(styleFor(dark));
    },
);

watch(() => props.statusFilter, applyStatusFilter);

function zoomIn(): void {
    if (map) {
        map.zoomTo(map.getZoom() + 1);
    }
}

function zoomOut(): void {
    if (map) {
        map.zoomTo(map.getZoom() - 1);
    }
}

function recenter(): void {
    map?.easeTo({ center: toLngLat(mapCenter), zoom: 13.5 });
}

function flyToLocation(position: LatLng, zoom = 15.5): void {
    map?.easeTo({ center: toLngLat(position), zoom });
}

defineExpose({ zoomIn, zoomOut, recenter, flyToLocation });

onMounted(initMap);

onBeforeUnmount(() => {
    markers.forEach((marker) => marker.remove());
    map?.remove();
});
</script>

<template>
    <div ref="mapContainer" class="h-full w-full" />
</template>
