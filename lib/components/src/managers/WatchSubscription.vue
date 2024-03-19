<template>
    <div class="container">
        <div v-if="!util.validOptions.value || !settings" class="danger custom-block">
            <p class="custom-block-title">Invalid component configuration!</p>
            <p>
                {{ errorMsg }}
            </p>
        </div>
        <div v-else class="watch-container">
            <PreferenceSetting
                v-if="settings.watchAll"
                :storeKey="settings.watchAll.key"
                :text="settings.watchAll.text"
            />

            <details v-if="settings.watchPages">
                <summary>{{ settings.watchPages.title }}</summary>
                {{ settings.watchPages.description }}

                <PreferenceSetting
                    :storeKey="watched.pathToKey(page)"
                    v-for="page in $frontmatter.pages?.filter(settings.watchPages.filter ?? (() => true)) ?? []"
                    :key="page"
                    type="switch"
                    :text="watched.pathToDisplay(page)"
                />
            </details>

            <div class="watch-actions">
                <div v-if="!util.data.subscription">
                    <VPButton text="Add" />
                </div>
                <div v-else>
                    <VPButton style="background-color: var(--vp-c-yellow-1);" text="Update" />
                    <VPButton style="background-color: var(--vp-c-red-1);" text="Delete" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import {
    type SubscriptionOptions,
    useNotificationSubscription,
    useWatchedPages,
} from '../../../composables/'

import PreferenceSetting from '../../global/PreferenceSetting.vue'

const props = defineProps<{
    subscription: SubscriptionOptions
    settings: {
        watchAll?: {
            key: string
            text: string
        }
        watchPages?: {
            title: string
            description: string
            prefix?: string
            filter?: (path: string) => boolean   
        }
    }
    // watchPrefix?: string
}>()

const util = useNotificationSubscription(props.subscription)
const watched = useWatchedPages(props.settings?.watchPages?.prefix)

const errorMsg = 'Missing required subscriptions options!'

onMounted(() => {
    if (!util.validOptions.value) console.error(errorMsg)
})
</script>