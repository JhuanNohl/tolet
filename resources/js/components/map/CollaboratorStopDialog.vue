<script setup lang="ts">
import { CalendarDays, MapPinned, Phone } from '@lucide/vue';
import { computed } from 'vue';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import type { CollaboratorRoute, RouteStop } from '@/data/ecoRouteMock';
import {
    STATUS_COLORS,
    STATUS_ICONS,
    STATUS_LABELS,
    STATUS_MEANINGS,
} from '@/data/serviceStatus';

type Props = {
    open: boolean;
    route: CollaboratorRoute | null;
    stop: RouteStop | null;
    stopIndex: number;
};

const props = defineProps<Props>();

const emit = defineEmits<{
    'update:open': [value: boolean];
}>();

const statusColor = computed(() =>
    props.stop ? STATUS_COLORS[props.stop.status] : undefined,
);
const statusIcon = computed(() =>
    props.stop ? STATUS_ICONS[props.stop.status] : undefined,
);
</script>

<template>
    <Dialog
        :open="open"
        @update:open="(value: boolean) => emit('update:open', value)"
    >
        <DialogContent v-if="route && stop" class="sm:max-w-md">
            <DialogHeader>
                <div class="flex items-center gap-3">
                    <Avatar class="size-14">
                        <AvatarFallback
                            class="text-base font-semibold text-white"
                            :style="{ backgroundColor: statusColor }"
                        >
                            {{ route.initials }}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <DialogTitle>{{ route.name }}</DialogTitle>
                        <DialogDescription>{{ route.role }}</DialogDescription>
                    </div>
                </div>
            </DialogHeader>

            <div
                class="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium"
                :style="{
                    backgroundColor: `${statusColor}1A`,
                    color: statusColor,
                }"
            >
                <component :is="statusIcon" class="size-4" />
                {{ STATUS_LABELS[stop.status] }}
            </div>
            <p class="text-sm text-muted-foreground">
                {{ STATUS_MEANINGS[stop.status] }}
            </p>

            <div class="grid gap-2 text-sm text-muted-foreground">
                <div class="flex items-center gap-2">
                    <MapPinned class="size-4 shrink-0" />
                    Parada {{ stopIndex + 1 }} de {{ route.stops.length }}
                </div>
                <div class="flex items-center gap-2">
                    <Phone class="size-4 shrink-0" />
                    {{ route.phone }}
                </div>
                <div class="flex items-center gap-2">
                    <CalendarDays class="size-4 shrink-0" />
                    {{ route.since }}
                </div>
            </div>
        </DialogContent>
    </Dialog>
</template>
