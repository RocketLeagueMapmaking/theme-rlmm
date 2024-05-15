<script setup lang="ts">
import { computed } from 'vue';
import { useStorage } from '../../../composables';

interface Bookmark {
    id: string
    title: string
    content: string
    author: {
        name: string
        iconUrl: string
        discordId: string | null
    }
    tags: string[]
    category: string
}

type LocalBookmark = Omit<Bookmark, 'author'> & { local: true }

const localValue = useStorage().useKey<string>('bookmarks', null)
const localBookmarks = computed(() => localValue.value ? JSON.parse(localValue.value) as LocalBookmark[] : [])
</script>

<template>
    <div class="bookmark-editor">
        <slot name="actions" />

        <slot name="items" :items="localBookmarks" />
    </div>
</template>