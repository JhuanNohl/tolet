<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';
import { Leaf, Moon, Sun } from '@lucide/vue';
import { useAppearance } from '@/composables/useAppearance';
import { home } from '@/routes';

const page = usePage();
const name = page.props.name;

defineProps<{
    title?: string;
    description?: string;
}>();

const { resolvedAppearance, updateAppearance } = useAppearance();

function toggleAppearance(): void {
    updateAppearance(resolvedAppearance.value === 'dark' ? 'light' : 'dark');
}
</script>

<template>
    <div
        class="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0"
    >
        <div
            class="relative hidden h-full flex-col justify-between overflow-hidden bg-primary p-10 text-primary-foreground lg:flex"
        >
            <Leaf
                class="pointer-events-none absolute -right-16 -bottom-16 size-80 text-primary-foreground/10"
            />
            <Leaf
                class="pointer-events-none absolute top-1/3 -left-12 size-48 -rotate-12 text-primary-foreground/10"
            />

            <Link
                :href="home()"
                class="relative z-20 flex items-center gap-3 text-lg font-semibold"
            >
                <span
                    class="flex size-10 items-center justify-center rounded-xl bg-primary-foreground/15"
                >
                    <Leaf class="size-5" />
                </span>
                {{ name }}
            </Link>

            <div class="relative z-20 max-w-md space-y-3">
                <h2 class="text-3xl leading-tight font-bold">
                    Rotas inteligentes.<br />
                    Impacto sustentável.
                </h2>
                <p class="text-primary-foreground/80">
                    Acompanhe coletas, colaboradores e emissões evitadas em
                    tempo real — tudo em um só lugar.
                </p>
            </div>
        </div>

        <div class="relative lg:p-8">
            <button
                type="button"
                class="absolute top-6 right-6 z-30 flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                :aria-label="
                    resolvedAppearance === 'dark'
                        ? 'Ativar modo claro'
                        : 'Ativar modo escuro'
                "
                @click="toggleAppearance"
            >
                <Sun v-if="resolvedAppearance === 'dark'" class="size-4.5" />
                <Moon v-else class="size-4.5" />
            </button>

            <div
                class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
            >
                <Link
                    :href="home()"
                    class="flex flex-col items-center gap-2 lg:hidden"
                >
                    <span
                        class="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground"
                    >
                        <Leaf class="size-5" />
                    </span>
                    <span class="font-semibold">{{ name }}</span>
                </Link>

                <div class="flex flex-col space-y-2 text-center">
                    <h1 class="text-xl font-medium tracking-tight" v-if="title">
                        {{ title }}
                    </h1>
                    <p class="text-sm text-muted-foreground" v-if="description">
                        {{ description }}
                    </p>
                </div>
                <slot />
            </div>
        </div>
    </div>
</template>
