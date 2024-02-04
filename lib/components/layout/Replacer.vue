<template>
    <ClientOnly>
        <Teleport :to="to">
            <slot />
        </Teleport>
    </ClientOnly>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

const { to } = defineProps<{
    to: string
}>()

onMounted(() => {
    document.styleSheets.item(0)?.insertRule(`${to} * { display: none }`)
    document.styleSheets.item(0)?.insertRule(`${to} *:last-child { display: flex }`)
})
</script>
