<script setup lang="ts">
import type { Component } from 'vue';
import AppTopBarShell from '@/components/map/AppTopBarShell.vue';
import MapSearch from '@/components/map/MapSearch.vue';
import ServiceOrderDialog from '@/components/map/ServiceOrderDialog.vue';
import StatCard from '@/components/map/StatCard.vue';
import type { LatLng } from '@/data/ecoRouteMock';
import type { MapStatusFilter } from '@/data/serviceStatus';
import type { Appearance, User } from '@/types';

export type TopBarStat = {
    filterKey: MapStatusFilter;
    icon: Component;
    label: string;
    value: string;
    suffix?: string;
    dotClass?: string;
    dotColor?: string;
    selected: boolean;
    dimmed: boolean;
};

type Props = {
    brandName: string;
    user: User;
    appearance: Appearance;
    stats: TopBarStat[];
};

defineProps<Props>();

const emit = defineEmits<{
    'toggle-appearance': [];
    'search-select': [position: LatLng];
    'select-stat': [key: MapStatusFilter];
}>();
</script>

<template>
    <AppTopBarShell
        :brand-name="brandName"
        :user="user"
        :appearance="appearance"
        @toggle-appearance="emit('toggle-appearance')"
    >
        <div class="flex shrink-0 items-center gap-1 overflow-x-auto md:gap-2">
            <StatCard
                v-for="stat in stats"
                :key="stat.label"
                :icon="stat.icon"
                :label="stat.label"
                :value="stat.value"
                :suffix="stat.suffix"
                :dot-class="stat.dotClass"
                :dot-color="stat.dotColor"
                :selected="stat.selected"
                :dimmed="stat.dimmed"
                @click="emit('select-stat', stat.filterKey)"
            />
        </div>

        <div class="flex flex-1 items-center justify-end gap-2">
            <MapSearch @select="emit('search-select', $event)" />
            <ServiceOrderDialog />
        </div>
    </AppTopBarShell>
</template>
