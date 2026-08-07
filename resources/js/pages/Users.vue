<script setup lang="ts">
import { Users } from '@lucide/vue';
import ComingSoonPage from '@/components/ComingSoonPage.vue';
</script>

<template>
    <ComingSoonPage
        title="Gerenciar usuários"
        description="A administração de usuários, permissões e níveis de acesso está sendo finalizada e chega em breve."
        :icon="Users"
    />
</template>
