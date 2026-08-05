<script setup lang="ts">
import { Head, usePage } from '@inertiajs/vue3';
import { CircleCheck, RefreshCw, Users } from '@lucide/vue';
import { computed, ref } from 'vue';
import { toast } from 'vue-sonner';
import EcoRouteMap from '@/components/map/EcoRouteMap.vue';
import MapLegendCard from '@/components/map/MapLegendCard.vue';
import MapSustainabilityCard from '@/components/map/MapSustainabilityCard.vue';
import MapTopBar from '@/components/map/MapTopBar.vue';
import type { TopBarStat } from '@/components/map/MapTopBar.vue';
import MapZoomControls from '@/components/map/MapZoomControls.vue';
import { Toaster } from '@/components/ui/sonner';
import { useAppearance } from '@/composables/useAppearance';
import { operationsStats } from '@/data/ecoRouteMock';

const page = usePage();
const auth = computed(() => page.props.auth);
const brandName = computed(() => page.props.name);

const { appearance, resolvedAppearance, updateAppearance } = useAppearance();

function toggleAppearance(): void {
    updateAppearance(resolvedAppearance.value === 'dark' ? 'light' : 'dark');
}

const topBarStats = computed<TopBarStat[]>(() => [
    {
        icon: Users,
        label: 'Ativos',
        value: String(operationsStats.active.current),
        suffix: `de ${operationsStats.active.total}`,
        dotClass: 'bg-primary animate-pulse',
        active: true,
    },
    {
        icon: CircleCheck,
        label: 'Finalizados',
        value: String(operationsStats.completed),
    },
    {
        icon: RefreshCw,
        label: 'Em andamento',
        value: String(operationsStats.inProgress),
        dotClass: 'bg-blue-500',
    },
]);

const mapRef = ref<InstanceType<typeof EcoRouteMap> | null>(null);

function handleMapError(message: string): void {
    toast.error(message);
}
</script>

<template>
    <Head title="Mapa de Operações" />

    <div class="relative h-screen w-screen overflow-hidden bg-background">
        <EcoRouteMap
            ref="mapRef"
            class="absolute inset-0"
            :dark="resolvedAppearance === 'dark'"
            @error="handleMapError"
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
            />

            <div class="flex-1"></div>

            <div class="flex items-end justify-between">
                <MapLegendCard />
                <MapSustainabilityCard :tons="operationsStats.co2AvoidedTons" />
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
