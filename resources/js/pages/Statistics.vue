<script setup lang="ts">
import { Head, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import OperationTrendChart from '@/components/charts/OperationTrendChart.vue';
import AppTopBarShell from '@/components/map/AppTopBarShell.vue';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Toaster } from '@/components/ui/sonner';
import { useAppearance } from '@/composables/useAppearance';
import type { ServiceStatus } from '@/data/serviceStatus';
import { STATUS_COLORS, STATUS_ICONS, STATUS_LABELS } from '@/data/serviceStatus';
import {
    collaboratorPerformance,
    dailyOperationHistory,
    geoZoneSummary,
} from '@/data/statisticsMock';

const page = usePage();
const auth = computed(() => page.props.auth);
const brandName = computed(() => page.props.name);

const { appearance, resolvedAppearance, updateAppearance } = useAppearance();

function toggleAppearance(): void {
    updateAppearance(resolvedAppearance.value === 'dark' ? 'light' : 'dark');
}

const totals = computed(() =>
    geoZoneSummary.reduce(
        (acc, zone) => ({
            waiting: acc.waiting + zone.waiting,
            inProgress: acc.inProgress + zone.inProgress,
            completed: acc.completed + zone.completed,
            failed: acc.failed + zone.failed,
        }),
        { waiting: 0, inProgress: 0, completed: 0, failed: 0 },
    ),
);

const totalOrders = computed(
    () =>
        totals.value.waiting +
        totals.value.inProgress +
        totals.value.completed +
        totals.value.failed,
);

const kpis = computed(() => [
    {
        key: 'total' as const,
        label: 'Total de OS',
        value: totalOrders.value,
        color: 'var(--color-primary)',
        icon: STATUS_ICONS.completed,
    },
    {
        key: 'completed' as const,
        label: STATUS_LABELS.completed,
        value: totals.value.completed,
        color: STATUS_COLORS.completed,
        icon: STATUS_ICONS.completed,
    },
    {
        key: 'in-progress' as const,
        label: STATUS_LABELS['in-progress'],
        value: totals.value.inProgress,
        color: STATUS_COLORS['in-progress'],
        icon: STATUS_ICONS['in-progress'],
    },
    {
        key: 'failed' as const,
        label: STATUS_LABELS.failed,
        value: totals.value.failed,
        color: STATUS_COLORS.failed,
        icon: STATUS_ICONS.failed,
    },
]);

const rankedCollaborators = computed(() =>
    [...collaboratorPerformance].sort((a, b) => b.completed - a.completed),
);

const maxCompleted = computed(() =>
    Math.max(...rankedCollaborators.value.map((c) => c.completed)),
);

const legendStatuses: ServiceStatus[] = ['waiting', 'in-progress', 'completed', 'failed'];

function zoneTotal(zone: (typeof geoZoneSummary)[number]): number {
    return zone.waiting + zone.inProgress + zone.completed + zone.failed;
}
</script>

<template>
    <Head title="Estatísticas da Operação" />

    <div class="min-h-screen bg-background">
        <div class="sticky top-0 z-10 p-4">
            <AppTopBarShell
                :brand-name="brandName"
                :user="auth.user"
                :appearance="appearance"
                @toggle-appearance="toggleAppearance"
            />
        </div>

        <main class="mx-auto max-w-6xl space-y-6 px-4 pb-12">
            <div>
                <h1 class="text-2xl font-semibold text-foreground">
                    Estatísticas da operação
                </h1>
                <p class="text-muted-foreground">
                    Visão consolidada do que já aconteceu e de como está o
                    desempenho geral da operação.
                </p>
            </div>

            <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <Card v-for="kpi in kpis" :key="kpi.key">
                    <CardContent class="flex items-center gap-3 p-4">
                        <span
                            class="flex size-9 shrink-0 items-center justify-center rounded-full text-white"
                            :style="{ backgroundColor: kpi.color }"
                        >
                            <component :is="kpi.icon" class="size-4" />
                        </span>
                        <div>
                            <p class="text-xs text-muted-foreground">
                                {{ kpi.label }}
                            </p>
                            <p class="text-2xl font-semibold text-foreground">
                                {{ kpi.value }}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Evolução no tempo</CardTitle>
                    <CardDescription>
                        Ordens de serviço concluídas e falhas por dia, últimos
                        14 dias
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <OperationTrendChart :data="dailyOperationHistory" />
                </CardContent>
            </Card>

            <div class="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Desempenho por colaborador</CardTitle>
                        <CardDescription>
                            Ranking por atendimentos concluídos
                        </CardDescription>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <div
                            v-for="collaborator in rankedCollaborators"
                            :key="collaborator.id"
                            class="space-y-1.5"
                        >
                            <div
                                class="flex items-center justify-between text-sm"
                            >
                                <div class="flex items-center gap-2">
                                    <span
                                        class="flex size-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary"
                                    >
                                        {{ collaborator.initials }}
                                    </span>
                                    <span class="font-medium text-foreground">
                                        {{ collaborator.name }}
                                    </span>
                                </div>
                                <span class="text-xs text-muted-foreground">
                                    {{ collaborator.avgDurationMinutes }} min
                                    méd.
                                </span>
                            </div>
                            <div
                                class="h-2 w-full overflow-hidden rounded-full bg-muted"
                            >
                                <div
                                    class="h-full rounded-full bg-primary"
                                    :style="{
                                        width: `${(collaborator.completed / maxCompleted) * 100}%`,
                                    }"
                                />
                            </div>
                            <div
                                class="flex justify-between text-xs text-muted-foreground"
                            >
                                <span
                                    >{{ collaborator.completed }}
                                    concluídas</span
                                >
                                <span v-if="collaborator.failed">
                                    {{ collaborator.failed }} falhas
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Distribuição geográfica</CardTitle>
                        <CardDescription>
                            Atendimentos por região atendida
                        </CardDescription>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <ul
                            class="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground"
                        >
                            <li
                                v-for="status in legendStatuses"
                                :key="status"
                                class="flex items-center gap-1.5"
                            >
                                <span
                                    class="size-2.5 shrink-0 rounded-full"
                                    :style="{
                                        backgroundColor: STATUS_COLORS[status],
                                    }"
                                />
                                {{ STATUS_LABELS[status] }}
                            </li>
                        </ul>

                        <div
                            v-for="zone in geoZoneSummary"
                            :key="zone.zone"
                            class="space-y-1.5"
                        >
                            <div
                                class="flex items-center justify-between text-sm"
                            >
                                <span class="font-medium text-foreground">
                                    {{ zone.zone }}
                                </span>
                                <span class="text-xs text-muted-foreground">
                                    {{ zoneTotal(zone) }} atendimentos
                                </span>
                            </div>
                            <div class="flex h-2.5 w-full gap-0.5">
                                <span
                                    v-if="zone.waiting"
                                    class="h-full rounded-full"
                                    :style="{
                                        flexGrow: zone.waiting,
                                        backgroundColor:
                                            STATUS_COLORS.waiting,
                                    }"
                                />
                                <span
                                    v-if="zone.inProgress"
                                    class="h-full rounded-full"
                                    :style="{
                                        flexGrow: zone.inProgress,
                                        backgroundColor:
                                            STATUS_COLORS['in-progress'],
                                    }"
                                />
                                <span
                                    v-if="zone.completed"
                                    class="h-full rounded-full"
                                    :style="{
                                        flexGrow: zone.completed,
                                        backgroundColor:
                                            STATUS_COLORS.completed,
                                    }"
                                />
                                <span
                                    v-if="zone.failed"
                                    class="h-full rounded-full"
                                    :style="{
                                        flexGrow: zone.failed,
                                        backgroundColor: STATUS_COLORS.failed,
                                    }"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>

        <Toaster position="top-center" />
    </div>
</template>
