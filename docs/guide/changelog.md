---
editLink: false
# feedback: false
# footer: false
---

# Changelog

<script setup>
import { NotificationListWindow } from '../../lib/'
</script>

<NotificationListWindow>
<template #default="{ item }">

## {{ item.title }}

*{{ new Date(item.created_at).toDateString() }}* <Badge v-for="tag in item.tags ?? []" :text="tag" type="info" />

<p v-html="item.text"></p>

</template>
</NotificationListWindow>
