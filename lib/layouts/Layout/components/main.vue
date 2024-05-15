<template>
    <ParentLayout :class="{ 'banner-dismissed': !(banner != undefined && banner !== false && $frontmatter.banner !== false) }">
        <template #layout-top>
            <Banner v-bind="banner" v-if="banner != undefined && banner !== false && $frontmatter.banner !== false" />
            <Replacer to=".VPHomeSponsors .love" v-if="showReplacer && $frontmatter.layout === 'home'">
                <Icon :icon="theme.home?.sponsorLogo ?? 'fa-brands:patreon'" class="icon" width="28px" fill="currentColor" />
            </Replacer>
        </template>

        <template v-for="homeSlot in Object.keys(homepageSlots ?? {}).filter(s => homepageSlots![s])" #[homeSlot]>
            <component :is="homepageSlots![homeSlot]!()" />
        </template>

        <template v-for="dynamicSlot in slots" #[dynamicSlot.slotName]>
            <component :is="dynamicSlot.node()" />
        </template>

        <template #doc-before>
            <div class="doc-date" v-if="$frontmatter.createdAt" :style="{ right: '20px', position: 'absolute' }">
                <p>
                    {{ new Date($frontmatter.createdAt).toDateString() }}
                </p>
            </div>
            <component v-if="$frontmatter.finished === false && theme.blocks?.notFinished !== false"
                :is="renderNotFinished(theme.blocks?.notFinished)" />
            <component :is="renderBlocks($frontmatter.blocks ?? [], 'top')" />
        </template>

        <template #doc-after>
            <RelatedPages />
        </template>

        <template #doc-footer-before>
            <component :is="renderBlocks($frontmatter.blocks ?? [], 'bottom')" />
            <Feedback v-if="theme.blocks?.feedback" v-bind="theme.blocks?.feedback === true ? {} : theme.blocks.feedback" />
        </template>
    </ParentLayout>
</template>

<script setup lang="ts">
import { h, nextTick, onMounted, provide, ref, type VNode } from 'vue'
import { useCssVar } from '@vueuse/core'
import { useData, useRouter } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import { useStorage } from '../../../composables'
import type {
    BannerNotification,
    StorageData,
    ThemeConfig,
    ThemeNotification,
} from '../../../types'

import { createAnalyticsDataCollector } from '../../../util'

import Banner from '../../../components/layout/Banner.vue'
import Feedback from '../../../components/layout/Feedback.vue'
import NavInbox from '../../../components/layout/Inbox.vue'
import RelatedPages from '../../../components/layout/RelatedPages.vue'
import Replacer from '../../../components/layout/Replacer.vue'

import { renderHomePageSections } from '../sections/home'
import { renderNotFinished } from '../sections/notFinished'
import { renderBlocks } from '../sections/block'

import sidebarActionComponent from '../sections/sidebarActionComponent.vue'

const props = defineProps<{
    banner: false | BannerNotification | undefined
    notifications: ThemeNotification[]
}>()

const { Layout: ParentLayout } = DefaultTheme

const router = useRouter()
const storage = useStorage()

provide('notifications', props.notifications)

const {
    theme,
    frontmatter,
} = useData<ThemeConfig>()

const showReplacer = ref<boolean>(false)
const homepageSlots = ref<Record<string, (() => VNode | undefined) | undefined>>({})

const updateSlots = async () => {
    // TODO: remove when https://github.com/vuejs/vitepress/pull/3654 is merged
    nextTick(() => {
        document.querySelector('.VPSidebarItem .is-active')?.scrollIntoView({
            block: 'center',
            behavior: 'smooth',
        })
    })

    showReplacer.value = false
    homepageSlots.value = await renderHomePageSections(frontmatter) ?? {}
    if (Object.keys(homepageSlots.value).length > 0) showReplacer.value = true
}

const slots: { slotName: string, node: (() => VNode | undefined) }[] = [
    {
        node: () => theme.value.sidebarAction
            ? h(sidebarActionComponent, { options: theme.value.sidebarAction })
            : undefined,
        slotName: `sidebar-nav-${theme.value.sidebarAction?.position === 'bottom' ? 'after' : 'before'}`,
    },
    {
        node: () => h(NavInbox, { options: theme.value.notifications?.inbox, notifications: props.notifications }),
        slotName: `nav-bar-content-${theme.value.notifications?.inbox?.position === 'before' ? 'before' : 'after'}`,
    }
]

router.onAfterRouteChanged = async (to) => {
    await updateSlots()
    return await createAnalyticsDataCollector(theme.value.analytics)(to)
}

function iterateStorage<T>(
    items: StorageData<T> | undefined,
    fn: (value: string, stored: string | null, defaultValue?: T) => void,
) {
    for (const [value, localKey] of Object.entries(items ?? {})) {
        const key = typeof localKey === 'string' ? localKey : localKey.key
        const defaultValue = typeof localKey !== 'string' ? localKey.defaultValue : undefined

        const stored = storage.useKey<never>(key, null)
        fn(value, stored.value, defaultValue)
    }
}

// Apply colors from local storage
onMounted(async () => {
    if (theme.value.storage) {
        iterateStorage(theme.value.storage.colorKeys, (cssName, value, defaultValue) => {
            if ((value != null && !['true', 'false'].includes(value)) || defaultValue != undefined) {
                useCssVar(cssName).value = (value ?? defaultValue)!
            }
        })
        iterateStorage(theme.value.storage.pageClasses, (className, enabled, defaultValue) => {
            if (enabled === 'true' || (enabled == null && defaultValue)) document.documentElement.classList.add(className)
        })
    }
    await updateSlots()
})
</script>
