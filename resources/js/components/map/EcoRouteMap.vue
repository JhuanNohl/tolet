<script setup lang="ts">
import tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import type { Feature, FeatureCollection, LineString } from 'geojson';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import {
    collaborators,
    mapCenter,
    routeSegments,
    servicePoints,
} from '@/data/ecoRouteMock';
import type { LatLng, RouteSegment } from '@/data/ecoRouteMock';
import { STATUS_COLORS } from '@/data/serviceStatus';
import type { ServiceStatus } from '@/data/serviceStatus';
import { toLngLat } from '@/lib/maps/geo';
import {
    avatarMarkerElement,
    pinMarkerElement,
    servicePointMarkerElement,
} from '@/lib/maps/markerIcons';
import { fetchRoadRoute } from '@/lib/maps/tomtomRouting';

type Props = {
    dark: boolean;
};

const props = defineProps<Props>();

const emit = defineEmits<{
    error: [message: string];
}>();

const mapContainer = ref<HTMLDivElement | null>(null);
let map: tt.Map | null = null;
const markers: tt.Marker[] = [];

const DEFAULT_PIN_COLOR = '#15803d';
const LEAF_COLOR = '#16a34a';
const AVATAR_COLOR = '#166534';
const ROUTES_SOURCE_ID = 'eco-rota-routes';
const ROUTE_STATUSES: ServiceStatus[] = [
    'waiting',
    'in-progress',
    'completed',
    'failed',
];

let routeFeatures: FeatureCollection<LineString> | null = null;

function styleFor(dark: boolean): tt.MapStyleConfig {
    return {
        map: dark ? 'basic_night' : 'basic_main',
        poi: 'poi_main',
        trafficIncidents: dark ? 'incidents_dark' : 'incidents_day',
        trafficFlow: dark ? 'flow_relative0-dark' : 'flow_relative0',
    };
}

async function buildRouteFeature(
    segment: RouteSegment,
    apiKey: string,
): Promise<Feature<LineString>> {
    const roadPath = await fetchRoadRoute(segment.waypoints, apiKey);

    return {
        type: 'Feature',
        geometry: {
            type: 'LineString',
            coordinates: (roadPath ?? segment.waypoints).map(toLngLat),
        },
        properties: { status: segment.status },
    };
}

async function loadRouteFeatures(apiKey: string): Promise<void> {
    const features = await Promise.all(
        routeSegments.map((segment) => buildRouteFeature(segment, apiKey)),
    );

    routeFeatures = { type: 'FeatureCollection', features };
}

function addRouteLayers(): void {
    if (!map || !routeFeatures || map.getSource(ROUTES_SOURCE_ID)) {
        return;
    }

    map.addSource(ROUTES_SOURCE_ID, {
        type: 'geojson',
        data: routeFeatures,
    });

    for (const status of ROUTE_STATUSES) {
        map.addLayer({
            id: `${ROUTES_SOURCE_ID}-${status}`,
            type: 'line',
            source: ROUTES_SOURCE_ID,
            filter: ['==', ['get', 'status'], status],
            paint: {
                'line-color': STATUS_COLORS[status],
                'line-width': 3,
                ...(status === 'completed'
                    ? { 'line-dasharray': [2, 2] }
                    : {}),
            },
        });
    }
}

function addMarkers(): void {
    if (!map) {
        return;
    }

    for (const point of servicePoints) {
        const element =
            point.kind === 'pin'
                ? pinMarkerElement(
                      point.label,
                      point.status
                          ? STATUS_COLORS[point.status]
                          : DEFAULT_PIN_COLOR,
                  )
                : servicePointMarkerElement(LEAF_COLOR);

        const marker = new tt.Marker({
            element,
            anchor: point.kind === 'pin' ? 'bottom' : 'center',
        })
            .setLngLat(toLngLat(point.position))
            .addTo(map);

        markers.push(marker);
    }

    for (const collaborator of collaborators) {
        const marker = new tt.Marker({
            element: avatarMarkerElement(
                AVATAR_COLOR,
                collaborator.initials,
                collaborator.active,
            ),
            anchor: 'center',
        })
            .setLngLat(toLngLat(collaborator.position))
            .addTo(map);

        markers.push(marker);
    }
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
