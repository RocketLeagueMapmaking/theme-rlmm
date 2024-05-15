---
editLink: false
feedback: false
footer: false
---

# Bookmarks

<script setup>
import Manager from '../../lib/components/src/managers/BookmarkManager.vue'
</script>

<Manager>
<template #actions="actions">

</template>
<template #items="{ items }">
    {{ items }}
</template>
</Manager>