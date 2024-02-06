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

import { renderText } from '../../../util';

const { Layout: ParentLayout } = DefaultTheme

const props = withDefaults(defineProps<{
    text?: string | { html: string }
}>(), {
    text: 'Loading...\n\nYou seem to be offline, reload the page to try again...'
})

const offlineText = computed(() => renderText(props.text))
</script>

<style scoped>
.offline-text {
    text-align: center;
    margin: 100px 0;
}
</style>
