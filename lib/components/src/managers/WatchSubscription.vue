<template>
    <div class="container">
        <div v-if="!subcription.data.subscription">
            <VPButton text="Add" />
        </div>
        <div v-else>
            <VPButton style="background-color: var(--vp-c-yellow-1);" text="Update" />
            <VPButton style="background-color: var(--vp-c-red-1);" text="Delete" />
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    type SubscriptionOptions,
    useNotificationSubscription,
    useWatchedPages,
} from '../../../composables/'

const props = defineProps<{
    subscription: SubscriptionOptions
    watchPrefix?: string
}>()

const subcription = useNotificationSubscription(props.subscription)
const watched = useWatchedPages(props.watchPrefix)
</script>