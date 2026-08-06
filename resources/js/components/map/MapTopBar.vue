<script setup lang="ts">
import { Leaf, Moon, Sun } from '@lucide/vue';
import type { Component } from 'vue';
import MapSearch from '@/components/map/MapSearch.vue';
import ServiceOrderDialog from '@/components/map/ServiceOrderDialog.vue';
import StatCard from '@/components/map/StatCard.vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import UserMenuContent from '@/components/UserMenuContent.vue';
import { getInitials } from '@/composables/useInitials';
import type { LatLng } from '@/data/ecoRouteMock';
import type { MapStatusFilter } from '@/data/serviceStatus';
import type { Appearance, User } from '@/types';

export type TopBarStat = {
    filterKey: MapStatusFilter;
    icon: Component;
    label: string;
    value: string;
    suffix?: string;
    dotClass?: string;
    dotColor?: string;
    selected: boolean;
    dimmed: boolean;
};

type Props = {
    brandName: string;
    user: User;
    appearance: Appearance;
    stats: TopBarStat[];
};

defineProps<Props>();

const emit = defineEmits<{
    'toggle-appearance': [];
    'search-select': [position: LatLng];
    'select-stat': [key: MapStatusFilter];
}>();
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

        <div class="flex shrink-0 items-center gap-1 overflow-x-auto md:gap-2">
            <StatCard
                v-for="stat in stats"
                :key="stat.label"
                :icon="stat.icon"
                :label="stat.label"
                :value="stat.value"
                :suffix="stat.suffix"
                :dot-class="stat.dotClass"
                :dot-color="stat.dotColor"
                :selected="stat.selected"
                :dimmed="stat.dimmed"
                @click="emit('select-stat', stat.filterKey)"
            />
        </div>

        <div class="flex flex-1 items-center justify-end gap-2">
            <MapSearch @select="emit('search-select', $event)" />
            <ServiceOrderDialog />
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
