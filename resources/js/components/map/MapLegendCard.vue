<script setup lang="ts">
import type { ServiceStatus } from '@/data/serviceStatus';
import {
    STATUS_COLORS,
    STATUS_ICONS,
    STATUS_LABELS,
    STATUS_MEANINGS,
} from '@/data/serviceStatus';

const statuses = (
    Object.keys(STATUS_COLORS) as ServiceStatus[]
).map((status) => ({
    icon: STATUS_ICONS[status],
    color: STATUS_COLORS[status],
    label: STATUS_LABELS[status],
    meaning: STATUS_MEANINGS[status],
    spin: status === 'in-progress',
}));
</script>

<template>
    <div
        class="pointer-events-auto w-fit rounded-2xl border border-black/5 bg-white/70 p-4 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-black/60"
    >
        <p class="mb-3 text-sm font-semibold text-foreground">Legenda</p>
        <ul class="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <li
                v-for="status in statuses"
                :key="status.label"
                class="flex items-center gap-2.5 whitespace-nowrap"
                :title="status.meaning"
            >
                <span
                    class="flex size-5 shrink-0 items-center justify-center rounded-full text-white"
                    :style="{ backgroundColor: status.color }"
                >
                    <component
                        :is="status.icon"
                        class="size-3"
                        :class="{ 'animate-spin': status.spin }"
                    />
                </span>
                <span class="font-medium text-foreground">{{
                    status.label
                }}</span>
            </li>
        </ul>
    </div>
</template>
