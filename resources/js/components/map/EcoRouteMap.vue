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
import { toLngLat } from '@/lib/maps/geo';
import {
    avatarMarkerElement,
    pinMarkerElement,
    servicePointMarkerElement,
} from '@/lib/maps/markerIcons';

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

const ROUTE_COLOR = '#22c55e';
const PIN_COLOR = '#15803d';
const LEAF_COLOR = '#16a34a';
const AVATAR_COLOR = '#166534';
const ROUTES_SOURCE_ID = 'eco-rota-routes';

function styleFor(dark: boolean): tt.MapStyleConfig {
    return {
        map: dark ? 'basic_night' : 'basic_main',
        poi: 'poi_main',
        trafficIncidents: dark ? 'incidents_dark' : 'incidents_day',
        trafficFlow: dark ? 'flow_relative0-dark' : 'flow_relative0',
    };
}

function buildRoutesGeoJSON(): FeatureCollection<LineString> {
    return {
        type: 'FeatureCollection',
        features: routeSegments.map((segment): Feature<LineString> => ({
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: segment.path.map(toLngLat),
            },
            properties: { status: segment.status },
        })),
    };
}

function addRouteLayers(): void {
    if (!map || map.getSource(ROUTES_SOURCE_ID)) {
        return;
    }

    map.addSource(ROUTES_SOURCE_ID, {
        type: 'geojson',
        data: buildRoutesGeoJSON(),
    });

    map.addLayer({
        id: `${ROUTES_SOURCE_ID}-in-progress`,
        type: 'line',
        source: ROUTES_SOURCE_ID,
        filter: ['==', ['get', 'status'], 'in-progress'],
        paint: {
            'line-color': ROUTE_COLOR,
            'line-width': 3,
        },
    });

    map.addLayer({
        id: `${ROUTES_SOURCE_ID}-completed`,
        type: 'line',
        source: ROUTES_SOURCE_ID,
        filter: ['==', ['get', 'status'], 'completed'],
        paint: {
            'line-color': ROUTE_COLOR,
            'line-width': 3,
            'line-dasharray': [2, 2],
        },
    });
}

function addMarkers(): void {
    if (!map) {
        return;
    }

    for (const point of servicePoints) {
        const element =
            point.kind === 'pin'
                ? pinMarkerElement(point.label, PIN_COLOR)
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

        map.on('load', addMarkers);
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

defineExpose({ zoomIn, zoomOut, recenter });

onMounted(initMap);

onBeforeUnmount(() => {
    markers.forEach((marker) => marker.remove());
    map?.remove();
});
</script>

<template>
    <div ref="mapContainer" class="h-full w-full" />
</template>
