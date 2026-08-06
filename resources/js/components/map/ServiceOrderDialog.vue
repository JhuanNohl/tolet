<script setup lang="ts">
import { ClipboardList } from '@lucide/vue';
import { computed, ref } from 'vue';
import { toast } from 'vue-sonner';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { collaboratorRoutes } from '@/data/ecoRouteMock';

const open = ref(false);
const collaboratorId = ref('');
const locations = ref('');
const scheduledDate = ref('');
const notes = ref('');

const selectedCollaborator = computed(
    () =>
        collaboratorRoutes.find((route) => route.id === collaboratorId.value) ??
        null,
);

const routeSummary = computed(() =>
    selectedCollaborator.value
        ? `${selectedCollaborator.value.name} — ${selectedCollaborator.value.stops.length} paradas`
        : '',
);

function resetForm(): void {
    collaboratorId.value = '';
    locations.value = '';
    scheduledDate.value = '';
    notes.value = '';
}

function handleSubmit(): void {
    if (!selectedCollaborator.value) {
        toast.error('Selecione o colaborador responsável.');

        return;
    }

    const orderNumber = `OS-${Math.floor(1000 + Math.random() * 9000)}`;

    toast.success(
        `Ordem de serviço ${orderNumber} aberta para ${selectedCollaborator.value.name}.`,
    );

    open.value = false;
    resetForm();
}
</script>

<template>
    <Dialog v-model:open="open">
        <DialogTrigger as-child>
            <Button variant="outline" size="sm" class="gap-2 rounded-full">
                <ClipboardList class="size-4" />
                <span class="hidden sm:inline">Abrir Ordem de Serviço</span>
            </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-lg">
            <DialogHeader>
                <DialogTitle>Abrir Ordem de Serviço</DialogTitle>
                <DialogDescription>
                    Defina o colaborador responsável, a rota e os locais de
                    atendimento.
                </DialogDescription>
            </DialogHeader>

            <form class="grid gap-4" @submit.prevent="handleSubmit">
                <div class="grid gap-2">
                    <Label for="os-collaborator">Colaborador responsável</Label>
                    <Select v-model="collaboratorId">
                        <SelectTrigger id="os-collaborator" class="w-full">
                            <SelectValue placeholder="Selecione um colaborador" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem
                                v-for="route in collaboratorRoutes"
                                :key="route.id"
                                :value="route.id"
                            >
                                {{ route.name }} — {{ route.role }}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div class="grid gap-2">
                    <Label for="os-route">Rota</Label>
                    <Input
                        id="os-route"
                        :model-value="routeSummary"
                        disabled
                        placeholder="Selecione um colaborador para preencher a rota"
                    />
                </div>

                <div class="grid gap-2">
                    <Label for="os-locations">Locais de atendimento</Label>
                    <Textarea
                        id="os-locations"
                        v-model="locations"
                        rows="3"
                        placeholder="Um endereço por linha, ex.: Rua Augusta, 500"
                    />
                </div>

                <div class="grid gap-2">
                    <Label for="os-date">Data prevista</Label>
                    <Input id="os-date" v-model="scheduledDate" type="date" />
                </div>

                <div class="grid gap-2">
                    <Label for="os-notes">Observações</Label>
                    <Textarea
                        id="os-notes"
                        v-model="notes"
                        rows="2"
                        placeholder="Informações adicionais sobre o atendimento"
                    />
                </div>

                <DialogFooter>
                    <Button type="submit">Abrir Ordem de Serviço</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
</template>
