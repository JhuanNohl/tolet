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
    dotClass: undefined,
    active: false,
});
</script>

<template>
    <div
        class="flex shrink-0 items-center gap-2 rounded-full px-2.5 py-1.5 transition-colors"
        :class="
            active ? 'bg-primary/10 dark:bg-primary/15' : 'hover:bg-accent/60'
        "
    >
        <div
            class="flex size-7 shrink-0 items-center justify-center rounded-full"
            :class="
                active
                    ? 'bg-primary/20 text-primary dark:bg-primary/25'
                    : 'bg-muted text-muted-foreground'
            "
        >
            <component :is="icon" class="size-3.5" />
        </div>
        <div class="leading-tight whitespace-nowrap">
            <p class="text-[11px] text-muted-foreground">{{ label }}</p>
            <p class="text-sm font-semibold text-foreground">
                {{ value }}
                <span
                    v-if="suffix"
                    class="text-xs font-normal text-muted-foreground"
                    >{{ suffix }}</span
                >
            </p>
        </div>
        <span v-if="dotClass" class="size-1.5 rounded-full" :class="dotClass" />
    </div>
</template>
