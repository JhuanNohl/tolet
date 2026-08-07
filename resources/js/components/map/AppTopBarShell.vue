<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { BarChart3, Leaf, Map as MapIcon, Moon, Sun } from '@lucide/vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import UserMenuContent from '@/components/UserMenuContent.vue';
import { useCurrentUrl } from '@/composables/useCurrentUrl';
import { getInitials } from '@/composables/useInitials';
import { dashboard, statistics } from '@/routes';
import type { Appearance, NavItem, User } from '@/types';

type Props = {
    brandName: string;
    user: User;
    appearance: Appearance;
};

defineProps<Props>();

const emit = defineEmits<{
    'toggle-appearance': [];
}>();

const { isCurrentUrl } = useCurrentUrl();

const navItems: NavItem[] = [
    { title: 'Mapa', href: dashboard(), icon: MapIcon },
    { title: 'Estatísticas', href: statistics(), icon: BarChart3 },
];
</script>

<template>
    <div
        class="pointer-events-auto flex items-center gap-3 rounded-2xl border border-black/5 bg-white/70 px-4 py-3 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-black/60"
    >
        <div class="flex shrink-0 items-center gap-3">
            <div
                class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm"
            >
                <Leaf class="size-5" />
            </div>
            <p class="hidden text-base font-semibold text-foreground sm:block">
                {{ brandName }}
            </p>
        </div>

        <div class="hidden h-8 w-px bg-black/10 md:block dark:bg-white/10" />

        <nav class="flex shrink-0 items-center gap-1">
            <Link
                v-for="item in navItems"
                :key="item.title"
                :href="item.href"
                class="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                :class="
                    isCurrentUrl(item.href)
                        ? 'bg-primary/10 text-primary dark:bg-primary/15'
                        : ''
                "
            >
                <component :is="item.icon" class="size-4" />
                <span class="hidden sm:inline">{{ item.title }}</span>
            </Link>
        </nav>

        <div class="flex flex-1 items-center gap-2 overflow-x-auto">
            <slot />
        </div>

        <div class="flex shrink-0 items-center gap-2">
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

            <DropdownMenu>
                <DropdownMenuTrigger :as-child="true">
                    <button
                        type="button"
                        class="relative rounded-full focus-within:ring-2 focus-within:ring-primary"
                    >
                        <Avatar class="size-9 overflow-hidden rounded-full">
                            <AvatarImage
                                v-if="user.avatar"
                                :src="user.avatar"
                                :alt="user.name"
                            />
                            <AvatarFallback
                                class="bg-primary font-semibold text-primary-foreground"
                            >
                                {{ getInitials(user.name) }}
                            </AvatarFallback>
                        </Avatar>
                        <span
                            class="absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full border-2 border-white bg-green-500 dark:border-black"
                        />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" class="w-56">
                    <UserMenuContent :user="user" />
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </div>
</template>
