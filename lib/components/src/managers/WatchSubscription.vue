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
            ><p>{{ settings.watchAll.text }}</p></PreferenceSetting>

            <details v-if="settings.watchPages" class="details custom-block">
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
                <div v-if="util.isNotSubscribed.value">
                    <VPButton text="Add" @click="addSubscription()" />
                </div>
                <div v-else>
                    <VPButton style="background-color: var(--vp-c-yellow-1); margin-right: 10px;" text="Update" @click="updateSubscription()" />
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
    useStorage,
    type WatchedPages,
} from '../../../composables/'

import PreferenceSetting from '../../global/PreferenceSetting.vue'

type UserSubscriptionData = {
    pages: WatchedPages
    inbox: boolean
    events: boolean
}

const props = defineProps<{
    subscription: SubscriptionOptions
    storageKeys: Record<Exclude<keyof UserSubscriptionData, 'pages'>, string>
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
    const storage = useStorage()

    return {
        pages,
        events: storage.useKey(props.storageKeys.events, null).value === 'true',
        inbox: storage.useKey(props.storageKeys.inbox, null).value === 'true',
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
        const newPages = data.pages, oldPages = old.pages
        if (newPages === 'all' && oldPages === 'all') return
        else if (Array.isArray(newPages) && Array.isArray(oldPages)) {
            if (newPages.length === oldPages.length) {
                if (newPages.every(p => oldPages.includes(p))) return
            }
        }

        if (Object.keys(data).filter(k => k !== 'pages').every(key => data[key] === old[key])) {
            return
        }
    }

    const hasUpdated = await util.settings.update(data)
    if (!hasUpdated) alert('Failed to update settings')
}
</script>