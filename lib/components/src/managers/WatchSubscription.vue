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
                <div v-if="!util.isNotSubscribed">
                    <VPButton text="Add" @click="addSubscription()" />
                </div>
                <div v-else>
                    <VPButton style="background-color: var(--vp-c-yellow-1);" text="Update" @click="updateSubscription()" />
                    <VPButton style="background-color: var(--vp-c-red-1);" text="Delete" @click="util.unsubsribe()" />
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
    type WatchedPages,
} from '../../../composables/'

import PreferenceSetting from '../../global/PreferenceSetting.vue'

type SubscriptionData =
    | { type: 'page-update', pages: WatchedPages }

type UserSubscriptionData = Record<
    SubscriptionData['type'],
    Omit<SubscriptionData, 'type'>
>

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
    errorMessage?: string
}>()

const util = useNotificationSubscription<UserSubscriptionData>(props.subscription)
const watched = useWatchedPages(props.settings?.watchPages?.prefix)

const errorMsg = computed(() => props.errorMessage ?? 'Missing required subscriptions options!')

onMounted(() => {
    if (!util.validOptions.value) console.error(errorMsg.value)
})

function getUserData (): UserSubscriptionData {
    const pages = watched.getWatchedPages()

    return {
        "page-update": { pages }
    }
}

async function addSubscription () {
    const data = getUserData()

    const hasSubscribed = await util.subscribe(data)
    if (!hasSubscribed) alert('Failed to subscribe')
}

async function updateSubscription () {
    const data = getUserData()
    const old = util.data.settings.value

    if (old) {
        if (data['page-update'].pages === 'all' && old['page-update'].pages === 'all') return
        else if (Array.isArray(data['page-update'].pages) && Array.isArray(old['page-update'].pages)) {
            if (data['page-update'].pages.length === old['page-update'].pages.length) {
                if (data['page-update'].pages.every(p => old['page-update'].pages.includes(p))) return
            }
        }
    }

    const hasUpdated = await util.settings.update(data)
    if (!hasUpdated) alert('Failed to update settings')
}
</script>