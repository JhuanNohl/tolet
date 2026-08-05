<script setup lang="ts">
import { Leaf } from '@lucide/vue';
</script>

<template>
    <div
        class="pointer-events-auto w-56 rounded-2xl border border-black/5 bg-white/70 p-4 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-black/60"
    >
        <p class="mb-3 text-sm font-semibold text-foreground">Legenda</p>
        <ul class="space-y-2.5 text-sm text-muted-foreground">
            <li class="flex items-center gap-2.5">
                <span
                    class="flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground"
                >
                    <Leaf class="size-3" />
                </span>
                Local de serviço
            </li>
            <li class="flex items-center gap-2.5">
                <span class="size-3 rounded-full bg-green-500" />
                Colaborador ativo
            </li>
            <li class="flex items-center gap-2.5">
                <span class="h-0.5 w-5 rounded-full bg-primary" />
                Rota em andamento
            </li>
            <li class="flex items-center gap-2.5">
                <span
                    class="h-0.5 w-5 rounded-full bg-primary/70"
                    style="
                        background-image: linear-gradient(
                            to right,
                            currentColor 50%,
                            transparent 50%
                        );
                        background-size: 6px 2px;
                        background-color: transparent;
                        color: var(--color-primary);
                    "
                />
                Rota concluída
            </li>
        </ul>
    </div>
</template>
