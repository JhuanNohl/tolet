<script setup lang="ts">
import type { Component } from 'vue';

type Props = {
    icon: Component;
    label: string;
    value: string;
    suffix?: string;
    dotClass?: string;
    dotColor?: string;
    selected?: boolean;
    dimmed?: boolean;
};

withDefaults(defineProps<Props>(), {
    suffix: undefined,
    dotClass: undefined,
    dotColor: undefined,
    selected: false,
    dimmed: false,
});

defineEmits<{ click: [] }>();
</script>

<template>
    <button
        type="button"
        class="flex shrink-0 items-center gap-2 rounded-full px-2.5 py-1.5 transition-colors duration-200"
        :class="[
            selected
                ? 'bg-primary/10 dark:bg-primary/15'
                : 'hover:bg-accent/60',
            dimmed ? 'opacity-50' : '',
        ]"
        @click="$emit('click')"
    >
        <div
            class="flex size-7 shrink-0 items-center justify-center rounded-full transition-colors duration-200"
            :class="
                selected
                    ? 'bg-primary/20 text-primary dark:bg-primary/25'
                    : 'bg-muted text-muted-foreground'
            "
        >
            <component :is="icon" class="size-3.5" />
        </div>
        <div class="text-left leading-tight whitespace-nowrap">
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
        <span
            v-if="dotClass || dotColor"
            class="size-1.5 rounded-full"
            :class="dotClass"
            :style="dotColor ? { backgroundColor: dotColor } : undefined"
        />
    </button>
</template>
