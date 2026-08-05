<script setup lang="ts">
import { LocateFixed, Minus, Plus } from '@lucide/vue';

const emit = defineEmits<{
    'zoom-in': [];
    'zoom-out': [];
    recenter: [];
}>();
</script>

<template>
    <div
        class="pointer-events-auto flex flex-col overflow-hidden rounded-xl border border-black/5 bg-white/80 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-black/60"
    >
        <button
            type="button"
            aria-label="Aumentar zoom"
            class="flex size-9 items-center justify-center text-foreground transition-colors hover:bg-accent"
            @click="emit('zoom-in')"
        >
            <Plus class="size-4" />
        </button>
        <div class="h-px bg-black/5 dark:bg-white/10" />
        <button
            type="button"
            aria-label="Diminuir zoom"
            class="flex size-9 items-center justify-center text-foreground transition-colors hover:bg-accent"
            @click="emit('zoom-out')"
        >
            <Minus class="size-4" />
        </button>
        <div class="h-px bg-black/5 dark:bg-white/10" />
        <button
            type="button"
            aria-label="Centralizar mapa"
            class="flex size-9 items-center justify-center text-foreground transition-colors hover:bg-accent"
            @click="emit('recenter')"
        >
            <LocateFixed class="size-4" />
        </button>
    </div>
</template>
