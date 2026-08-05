<script setup lang="ts">
import { Leaf } from '@lucide/vue';

type Props = {
    tons: number;
};

defineProps<Props>();
</script>

<template>
    <div
        class="pointer-events-auto relative w-64 overflow-hidden rounded-2xl border border-black/5 bg-white/70 p-4 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-black/60"
    >
        <Leaf
            class="pointer-events-none absolute -right-4 -bottom-4 size-24 text-primary/10"
        />
        <div
            class="relative flex items-center gap-2 text-sm font-semibold text-foreground"
        >
            <Leaf class="size-4 text-primary" />
            Sustentabilidade
        </div>
        <p class="relative mt-2 text-xs text-muted-foreground">
            Você já evitou a emissão de
        </p>
        <p class="relative text-2xl font-bold text-primary">
            {{ tons.toLocaleString('pt-BR', { minimumFractionDigits: 1 }) }}
            TON
        </p>
        <p class="relative text-xs text-muted-foreground">de CO₂ este mês</p>
    </div>
</template>
