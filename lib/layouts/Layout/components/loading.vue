<template>
    <ParentLayout>
        <template #home-features-after>
            <p class="home-resources offline-text" v-html="$frontmatter.offlineText ?? offlineText"></p>
        </template>
    </ParentLayout>
</template>

<script setup lang="ts">
import { computed, withDefaults } from 'vue'
import DefaultTheme from 'vitepress/theme'

import { useMarkdown } from '../../../composables';

const { Layout: ParentLayout } = DefaultTheme

const md = useMarkdown()

const props = withDefaults(defineProps<{
    text?: string | { html: string }
}>(), {
    // TODO: expose this in themeConfig
    text: 'Loading...\n\nYou seem to be offline, reload the page to try again...'
})

const offlineText = computed(() => {
    return typeof props.text === 'string' 
        ? md(props.text)
        : props.text.html
})
</script>

<style scoped>
.offline-text {
    text-align: center;
    margin: 100px 0;
}
</style>
