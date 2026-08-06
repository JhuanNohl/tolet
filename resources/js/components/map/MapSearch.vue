<script setup lang="ts">
import { MapPin, Search, UserRound } from '@lucide/vue';
import { onClickOutside } from '@vueuse/core';
import { computed, ref } from 'vue';
import { collaboratorRoutes } from '@/data/ecoRouteMock';
import type { LatLng } from '@/data/ecoRouteMock';
import { STATUS_LABELS } from '@/data/serviceStatus';

type SearchItem = {
    id: string;
    label: string;
    category: string;
    icon: typeof MapPin;
    position: LatLng;
};

const emit = defineEmits<{
    select: [position: LatLng];
}>();

const query = ref('');
const isOpen = ref(false);
const containerRef = ref<HTMLDivElement | null>(null);

onClickOutside(containerRef, () => {
    isOpen.value = false;
});

const stopItems = collaboratorRoutes.flatMap((route): SearchItem[] =>
    route.stops.map((stop, index): SearchItem => ({
        id: `${route.id}-${index}`,
        label: `${route.name} — ${STATUS_LABELS[stop.status]}`,
        category: 'Parada de rota',
        icon: MapPin,
        position: stop.position,
    })),
);

const collaboratorItems = collaboratorRoutes.map(
    (route): SearchItem => ({
        id: route.id,
        label: route.name,
        category: 'Colaborador',
        icon: UserRound,
        position: route.stops[0].position,
    }),
);

const items: SearchItem[] = [...stopItems, ...collaboratorItems];

const results = computed<SearchItem[]>(() => {
    const term = query.value.trim().toLowerCase();

    if (!term) {
        return items;
    }

    return items.filter((item) => item.label.toLowerCase().includes(term));
});

function handleSelect(item: SearchItem): void {
    query.value = item.label;
    isOpen.value = false;
    emit('select', item.position);
}
</script>

<template>
    <div ref="containerRef" class="relative w-full max-w-xs">
        <div class="relative">
            <Search
                class="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <input
                v-model="query"
                type="text"
                placeholder="Buscar rota, ponto ou colaborador..."
                class="h-9 w-full rounded-full border border-black/5 bg-white/70 pr-3 pl-9 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/10 dark:bg-black/40"
                @focus="isOpen = true"
            />
        </div>

        <div
            v-if="isOpen"
            class="absolute top-full right-0 left-0 z-30 mt-2 max-h-72 overflow-y-auto rounded-2xl border border-black/5 bg-white/95 p-1.5 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-black/90"
        >
            <button
                v-for="item in results"
                :key="item.id"
                type="button"
                class="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors hover:bg-accent"
                @click="handleSelect(item)"
            >
                <span
                    class="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground"
                >
                    <component :is="item.icon" class="size-4" />
                </span>
                <span class="flex flex-col leading-tight">
                    <span class="text-sm font-medium text-foreground">{{
                        item.label
                    }}</span>
                    <span class="text-xs text-muted-foreground">{{
                        item.category
                    }}</span>
                </span>
            </button>

            <p
                v-if="results.length === 0"
                class="px-3 py-2 text-sm text-muted-foreground"
            >
                Nenhum resultado encontrado.
            </p>
        </div>
    </div>
</template>
