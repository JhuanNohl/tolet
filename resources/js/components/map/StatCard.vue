<script setup lang="ts">
import type { Component } from 'vue';

type Props = {
    icon: Component;
    label: string;
    value: string;
    suffix?: string;
    dotClass?: string;
    active?: boolean;
};

withDefaults(defineProps<Props>(), {
    suffix: undefined,
    dotClass: 'bg-muted-foreground/50',
    active: false,
});
</script>

<template>
    <div
        class="pointer-events-auto flex items-center gap-3 rounded-2xl border px-4 py-2.5 shadow-lg backdrop-blur-md transition-colors"
        :class="
            active
                ? 'border-primary/30 bg-primary/10 dark:border-primary/40 dark:bg-primary/15'
                : 'border-black/5 bg-white/70 dark:border-white/10 dark:bg-black/60'
        "
    >
        <div
            class="flex size-9 shrink-0 items-center justify-center rounded-full"
            :class="
                active
                    ? 'bg-primary/20 text-primary dark:bg-primary/25'
                    : 'bg-muted text-muted-foreground'
            "
        >
            <component :is="icon" class="size-4.5" />
        </div>
        <div class="leading-tight">
            <p class="text-xs text-muted-foreground">{{ label }}</p>
            <p class="text-sm font-semibold text-foreground">
                {{ value }}
                <span v-if="suffix" class="font-normal text-muted-foreground">{{
                    suffix
                }}</span>
            </p>
        </div>
        <span class="ml-1 size-1.5 rounded-full" :class="dotClass" />
    </div>
</template>
