<script setup lang="ts">
import { Head, usePage } from '@inertiajs/vue3';
import { CircleCheck, RefreshCw, Users } from '@lucide/vue';
import { computed, ref } from 'vue';
import { toast } from 'vue-sonner';
import EcoRouteMap from '@/components/map/EcoRouteMap.vue';
import MapLegendCard from '@/components/map/MapLegendCard.vue';
import MapSustainabilityCard from '@/components/map/MapSustainabilityCard.vue';
import MapTopBar from '@/components/map/MapTopBar.vue';
import MapZoomControls from '@/components/map/MapZoomControls.vue';
import StatCard from '@/components/map/StatCard.vue';
import { Toaster } from '@/components/ui/sonner';
import { useAppearance } from '@/composables/useAppearance';
import { getInitials } from '@/composables/useInitials';
import { operationsStats } from '@/data/ecoRouteMock';

const page = usePage();
const auth = computed(() => page.props.auth);
const brandName = computed(() => page.props.name);

const { appearance, resolvedAppearance, updateAppearance } = useAppearance();

function toggleAppearance(): void {
    updateAppearance(resolvedAppearance.value === 'dark' ? 'light' : 'dark');
}

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
                tagline="Gestão de Rotas Sustentáveis"
                :user-name="auth.user?.name ?? ''"
                :user-avatar="auth.user?.avatar"
                :user-initials="getInitials(auth.user?.name)"
                :appearance="appearance"
                @toggle-appearance="toggleAppearance"
            />

            <div class="flex flex-wrap items-start gap-3">
                <StatCard
                    :icon="Users"
                    label="Ativos"
                    :value="String(operationsStats.active.current)"
                    :suffix="`de ${operationsStats.active.total}`"
                    dot-class="bg-primary animate-pulse"
                    :active="true"
                />
                <StatCard
                    :icon="CircleCheck"
                    label="Finalizados"
                    :value="String(operationsStats.completed)"
                />
                <StatCard
                    :icon="RefreshCw"
                    label="Em andamento"
                    :value="String(operationsStats.inProgress)"
                    dot-class="bg-blue-500"
                />
            </div>

            <div class="flex-1"></div>

            <div class="flex items-end justify-between">
                <MapLegendCard />
                <MapSustainabilityCard :tons="operationsStats.co2AvoidedTons" />
            </div>
        </div>

        <div class="pointer-events-none absolute top-32 left-4">
            <MapZoomControls
                @zoom-in="mapRef?.zoomIn()"
                @zoom-out="mapRef?.zoomOut()"
                @recenter="mapRef?.recenter()"
            />
        </div>

        <Toaster position="top-center" />
    </div>
</template>
