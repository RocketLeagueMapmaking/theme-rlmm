<template>
    <ClientOnly>
        <Teleport :to="to" v-if="show">
            <slot />
        </Teleport>
    </ClientOnly>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';

const { to } = defineProps<{
    to: string
}>()

const show = ref<boolean>(false)

onMounted(() => {
    document.styleSheets.item(0)?.insertRule(`${to} * { display: none !important }`)
    document.styleSheets.item(0)?.insertRule(`${to} *:last-child { display: flex !important }`)

    nextTick(() => show.value = true)
})
</script>
