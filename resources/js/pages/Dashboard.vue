<script setup lang="ts">
import { Head, usePage } from '@inertiajs/vue3';
import { Users } from '@lucide/vue';
import { computed, ref } from 'vue';
import { toast } from 'vue-sonner';
import CollaboratorStopDialog from '@/components/map/CollaboratorStopDialog.vue';
import EcoRouteMap from '@/components/map/EcoRouteMap.vue';
import type { StopSelection } from '@/components/map/EcoRouteMap.vue';
import MapLegendCard from '@/components/map/MapLegendCard.vue';
import MapTopBar from '@/components/map/MapTopBar.vue';
import type { TopBarStat } from '@/components/map/MapTopBar.vue';
import MapZoomControls from '@/components/map/MapZoomControls.vue';
import { Toaster } from '@/components/ui/sonner';
import { useAppearance } from '@/composables/useAppearance';
import { collaboratorRoutes } from '@/data/ecoRouteMock';
import type { MapStatusFilter, ServiceStatus } from '@/data/serviceStatus';
import { STATUS_COLORS, STATUS_ICONS, STATUS_LABELS } from '@/data/serviceStatus';

const page = usePage();
const auth = computed(() => page.props.auth);
const brandName = computed(() => page.props.name);

const { appearance, resolvedAppearance, updateAppearance } = useAppearance();

function toggleAppearance(): void {
    updateAppearance(resolvedAppearance.value === 'dark' ? 'light' : 'dark');
}

const activeFilter = ref<MapStatusFilter | null>(null);

function selectStat(key: MapStatusFilter): void {
    activeFilter.value = activeFilter.value === key ? null : key;
}

const stopCounts = computed(() => {
    const counts: Record<ServiceStatus, number> = {
        waiting: 0,
        'in-progress': 0,
        completed: 0,
        failed: 0,
    };

    for (const route of collaboratorRoutes) {
        for (const stop of route.stops) {
            counts[stop.status]++;
        }
    }

    return counts;
});

const totalStops = computed(() =>
    collaboratorRoutes.reduce((total, route) => total + route.stops.length, 0),
);

const activeStopsCount = computed(
    () => stopCounts.value.waiting + stopCounts.value['in-progress'],
);

const topBarStats = computed<TopBarStat[]>(() => {
    const definitions: Omit<TopBarStat, 'selected' | 'dimmed'>[] = [
        {
            filterKey: 'active',
            icon: Users,
            label: 'Ativos',
            value: String(activeStopsCount.value),
            suffix: `de ${totalStops.value}`,
            dotClass: 'animate-pulse',
            dotColor: 'var(--color-primary)',
        },
        {
            filterKey: 'completed',
            icon: STATUS_ICONS.completed,
            label: STATUS_LABELS.completed,
            value: String(stopCounts.value.completed),
            dotColor: STATUS_COLORS.completed,
        },
        {
            filterKey: 'in-progress',
            icon: STATUS_ICONS['in-progress'],
            label: STATUS_LABELS['in-progress'],
            value: String(stopCounts.value['in-progress']),
            dotClass: 'animate-pulse',
            dotColor: STATUS_COLORS['in-progress'],
        },
        {
            filterKey: 'failed',
            icon: STATUS_ICONS.failed,
            label: STATUS_LABELS.failed,
            value: String(stopCounts.value.failed),
            dotColor: STATUS_COLORS.failed,
        },
    ];

    return definitions.map((definition) => ({
        ...definition,
        selected: activeFilter.value === definition.filterKey,
        dimmed:
            activeFilter.value !== null &&
            activeFilter.value !== definition.filterKey,
    }));
});

const mapRef = ref<InstanceType<typeof EcoRouteMap> | null>(null);

function handleMapError(message: string): void {
    toast.error(message);
}

const selectedStop = ref<StopSelection | null>(null);

function handleSelectStop(selection: StopSelection): void {
    selectedStop.value = selection;
}

function handleStopDialogOpenChange(open: boolean): void {
    if (!open) {
        selectedStop.value = null;
    }
}
</script>

<template>
    <Head title="Mapa de Operações" />

    <div class="relative h-screen w-screen overflow-hidden bg-background">
        <EcoRouteMap
            ref="mapRef"
            class="absolute inset-0"
            :dark="resolvedAppearance === 'dark'"
            :status-filter="activeFilter"
            @error="handleMapError"
            @select-stop="handleSelectStop"
        />

        <CollaboratorStopDialog
            :open="!!selectedStop"
            :route="selectedStop?.route ?? null"
            :stop="selectedStop?.stop ?? null"
            :stop-index="selectedStop?.stopIndex ?? 0"
            @update:open="handleStopDialogOpenChange"
        />

        <div
            class="pointer-events-none absolute inset-0 flex flex-col gap-4 p-4"
        >
            <MapTopBar
                :brand-name="brandName"
                :user="auth.user"
                :appearance="appearance"
                :stats="topBarStats"
                @toggle-appearance="toggleAppearance"
                @search-select="mapRef?.flyToLocation($event)"
                @select-stat="selectStat"
            />

            <div class="flex-1"></div>

            <div class="flex items-end justify-between">
                <MapLegendCard />
            </div>
        </div>

        <div
            class="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2"
        >
            <MapZoomControls
                @zoom-in="mapRef?.zoomIn()"
                @zoom-out="mapRef?.zoomOut()"
                @recenter="mapRef?.recenter()"
            />
        </div>

        <Toaster position="top-center" />
    </div>
</template>
