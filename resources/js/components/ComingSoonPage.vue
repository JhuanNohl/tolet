<script setup lang="ts">
import { Head, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import type { Component } from 'vue';
import AppTopBarShell from '@/components/map/AppTopBarShell.vue';
import { Card, CardContent } from '@/components/ui/card';
import { useAppearance } from '@/composables/useAppearance';

type Props = {
    title: string;
    description: string;
    icon: Component;
};

defineProps<Props>();

const page = usePage();
const auth = computed(() => page.props.auth);
const brandName = computed(() => page.props.name);

const { appearance, resolvedAppearance, updateAppearance } = useAppearance();

function toggleAppearance(): void {
    updateAppearance(resolvedAppearance.value === 'dark' ? 'light' : 'dark');
}
</script>

<template>
    <Head :title="title" />

    <div class="min-h-screen bg-background">
        <div class="sticky top-0 z-10 p-4">
            <AppTopBarShell
                :brand-name="brandName"
                :user="auth.user"
                :appearance="appearance"
                @toggle-appearance="toggleAppearance"
            />
        </div>

        <main
            class="mx-auto flex max-w-6xl items-center justify-center px-4 py-24"
        >
            <Card class="max-w-md text-center">
                <CardContent class="flex flex-col items-center gap-4 p-8">
                    <span
                        class="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary"
                    >
                        <component :is="icon" class="size-6" />
                    </span>
                    <div class="space-y-1.5">
                        <h1 class="text-lg font-semibold text-foreground">
                            {{ title }}
                        </h1>
                        <p class="text-sm text-muted-foreground">
                            {{ description }}
                        </p>
                    </div>
                    <span
                        class="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                    >
                        Em construção
                    </span>
                </CardContent>
            </Card>
        </main>
    </div>
</template>
