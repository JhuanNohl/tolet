<script setup lang="ts">
import { Leaf, Moon, Sun } from '@lucide/vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Appearance } from '@/types';

type Props = {
    brandName: string;
    tagline: string;
    userName: string;
    userAvatar?: string;
    userInitials: string;
    appearance: Appearance;
};

defineProps<Props>();

const emit = defineEmits<{
    'toggle-appearance': [];
}>();
</script>

<template>
    <div
        class="pointer-events-auto flex items-center justify-between gap-4 rounded-2xl border border-black/5 bg-white/70 px-4 py-3 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-black/60"
    >
        <div class="flex items-center gap-3">
            <div
                class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm"
            >
                <Leaf class="size-5" />
            </div>
            <div class="leading-tight">
                <p class="text-base font-semibold text-foreground">
                    {{ brandName }}
                </p>
                <p class="text-xs text-muted-foreground">
                    {{ tagline }}
                </p>
            </div>
        </div>

        <div class="flex items-center gap-2">
            <button
                type="button"
                class="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                :aria-label="
                    appearance === 'dark'
                        ? 'Ativar modo claro'
                        : 'Ativar modo escuro'
                "
                @click="emit('toggle-appearance')"
            >
                <Sun v-if="appearance === 'dark'" class="size-4.5" />
                <Moon v-else class="size-4.5" />
            </button>

            <div class="relative">
                <Avatar class="size-9 overflow-hidden rounded-full">
                    <AvatarImage
                        v-if="userAvatar"
                        :src="userAvatar"
                        :alt="userName"
                    />
                    <AvatarFallback
                        class="bg-primary font-semibold text-primary-foreground"
                    >
                        {{ userInitials }}
                    </AvatarFallback>
                </Avatar>
                <span
                    class="absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full border-2 border-white bg-green-500 dark:border-black"
                />
            </div>
        </div>
    </div>
</template>
