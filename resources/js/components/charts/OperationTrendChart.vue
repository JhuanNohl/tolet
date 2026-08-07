<script setup lang="ts">
import { computed, ref } from 'vue';
import { STATUS_COLORS, STATUS_ICONS, STATUS_LABELS } from '@/data/serviceStatus';
import type { DailyOperationSummary } from '@/data/statisticsMock';

type Props = {
    data: DailyOperationSummary[];
};

const props = defineProps<Props>();

const width = 640;
const height = 220;
const paddingLeft = 8;
const paddingRight = 8;

const chartWidth = width - paddingLeft - paddingRight;
const maxValue = computed(() => {
    const peak = Math.max(...props.data.flatMap((d) => [d.completed, d.failed]));

    return Math.ceil((peak * 1.15) / 10) * 10 || 10;
});

const stepX = computed(() =>
    props.data.length > 1 ? chartWidth / (props.data.length - 1) : 0,
);

function xFor(index: number): number {
    return paddingLeft + index * stepX.value;
}

function yFor(value: number): number {
    return height - (value / maxValue.value) * height;
}

function lineFor(key: 'completed' | 'failed'): string {
    return props.data
        .map((d, i) => `${i === 0 ? 'M' : 'L'} ${xFor(i)} ${yFor(d[key])}`)
        .join(' ');
}

function areaFor(key: 'completed' | 'failed'): string {
    const line = props.data
        .map((d, i) => `${i === 0 ? 'M' : 'L'} ${xFor(i)} ${yFor(d[key])}`)
        .join(' ');
    const lastX = xFor(props.data.length - 1);

    return `${line} L ${lastX} ${height} L ${paddingLeft} ${height} Z`;
}

const showTable = ref(false);
const hoverIndex = ref<number | null>(null);
const svgRef = ref<SVGSVGElement | null>(null);

function handleMove(event: MouseEvent): void {
    if (!svgRef.value || props.data.length === 0) {
return;
}

    const rect = svgRef.value.getBoundingClientRect();
    const relativeX = ((event.clientX - rect.left) / rect.width) * width;
    const index = Math.round((relativeX - paddingLeft) / (stepX.value || 1));
    hoverIndex.value = Math.min(Math.max(index, 0), props.data.length - 1);
}

function handleLeave(): void {
    hoverIndex.value = null;
}

const hovered = computed(() =>
    hoverIndex.value !== null ? props.data[hoverIndex.value] : null,
);

const CompletedIcon = STATUS_ICONS.completed;
const FailedIcon = STATUS_ICONS.failed;
</script>

<template>
    <div class="space-y-3">
        <div class="flex flex-wrap items-center justify-between gap-3">
            <ul class="flex items-center gap-4 text-sm text-muted-foreground">
                <li class="flex items-center gap-2">
                    <span
                        class="flex size-5 items-center justify-center rounded-full text-white"
                        :style="{ backgroundColor: STATUS_COLORS.completed }"
                    >
                        <component :is="CompletedIcon" class="size-3" />
                    </span>
                    <span class="font-medium text-foreground">{{
                        STATUS_LABELS.completed
                    }}</span>
                </li>
                <li class="flex items-center gap-2">
                    <span
                        class="flex size-5 items-center justify-center rounded-full text-white"
                        :style="{ backgroundColor: STATUS_COLORS.failed }"
                    >
                        <component :is="FailedIcon" class="size-3" />
                    </span>
                    <span class="font-medium text-foreground">{{
                        STATUS_LABELS.failed
                    }}</span>
                </li>
            </ul>

            <button
                type="button"
                class="text-sm font-medium text-primary hover:underline"
                @click="showTable = !showTable"
            >
                {{ showTable ? 'Ver gráfico' : 'Ver tabela' }}
            </button>
        </div>

        <div v-if="!showTable" class="relative">
            <svg
                ref="svgRef"
                :viewBox="`0 0 ${width} ${height}`"
                class="h-56 w-full overflow-visible"
                preserveAspectRatio="none"
                @mousemove="handleMove"
                @mouseleave="handleLeave"
            >
                <line
                    x1="0"
                    :y1="height"
                    :x2="width"
                    :y2="height"
                    class="stroke-border"
                    stroke-width="1"
                />

                <path
                    :d="areaFor('completed')"
                    :fill="STATUS_COLORS.completed"
                    opacity="0.12"
                />
                <path
                    :d="lineFor('completed')"
                    fill="none"
                    :stroke="STATUS_COLORS.completed"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />

                <path
                    :d="lineFor('failed')"
                    fill="none"
                    :stroke="STATUS_COLORS.failed"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-dasharray="4 3"
                />

                <line
                    v-if="hoverIndex !== null"
                    :x1="xFor(hoverIndex)"
                    y1="0"
                    :x2="xFor(hoverIndex)"
                    :y2="height"
                    class="stroke-border"
                    stroke-width="1"
                />
                <circle
                    v-if="hovered"
                    :cx="xFor(hoverIndex!)"
                    :cy="yFor(hovered.completed)"
                    r="4"
                    :fill="STATUS_COLORS.completed"
                    stroke="white"
                    stroke-width="2"
                />
                <circle
                    v-if="hovered"
                    :cx="xFor(hoverIndex!)"
                    :cy="yFor(hovered.failed)"
                    r="4"
                    :fill="STATUS_COLORS.failed"
                    stroke="white"
                    stroke-width="2"
                />
            </svg>

            <div
                v-if="hovered"
                class="pointer-events-none absolute top-0 rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-md"
                :style="{
                    left: `${(xFor(hoverIndex!) / width) * 100}%`,
                    transform:
                        hoverIndex! > data.length / 2
                            ? 'translateX(-100%)'
                            : 'none',
                }"
            >
                <p class="mb-1 font-semibold text-foreground">
                    {{ hovered.label }}
                </p>
                <p class="text-muted-foreground">
                    Concluídas:
                    <span class="font-medium text-foreground">{{
                        hovered.completed
                    }}</span>
                </p>
                <p class="text-muted-foreground">
                    Falhas:
                    <span class="font-medium text-foreground">{{
                        hovered.failed
                    }}</span>
                </p>
            </div>

            <div
                class="mt-1 flex justify-between text-xs text-muted-foreground"
            >
                <span>{{ data[0]?.label }}</span>
                <span>{{ data[data.length - 1]?.label }}</span>
            </div>
        </div>

        <div v-else class="overflow-x-auto rounded-lg border border-border">
            <table class="w-full text-sm">
                <thead>
                    <tr class="border-b border-border bg-muted/50 text-left">
                        <th class="px-3 py-2 font-medium text-muted-foreground">
                            Data
                        </th>
                        <th class="px-3 py-2 font-medium text-muted-foreground">
                            Concluídas
                        </th>
                        <th class="px-3 py-2 font-medium text-muted-foreground">
                            Falhas
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="day in data"
                        :key="day.label"
                        class="border-b border-border last:border-0"
                    >
                        <td class="px-3 py-2 text-foreground">
                            {{ day.label }}
                        </td>
                        <td class="px-3 py-2 text-foreground">
                            {{ day.completed }}
                        </td>
                        <td class="px-3 py-2 text-foreground">
                            {{ day.failed }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
