<template>
    <ParentLayout :class="{ 'banner-dismissed': !(banner != undefined && banner !== false) }">
        <template #layout-top>
            <Banner v-bind="banner" v-if="banner != undefined && banner !== false" />
            <Replacer to=".VPHomeSponsors .love">
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
                :is="renderNotFinished(md, theme.blocks?.notFinished)" />
            <component :is="renderBlocks(md, $frontmatter.blocks ?? [], 'top')" />
        </template>

        <template #doc-after>
            <RelatedPages />
        </template>

        <template #doc-footer-before>
            <component :is="renderBlocks(md, $frontmatter.blocks ?? [], 'bottom')" />
            <Feedback v-if="theme.blocks?.feedback" v-bind="theme.blocks?.feedback === true ? {} : theme.blocks.feedback" />
        </template>
    </ParentLayout>
</template>

<script setup lang="ts">
import { h, provide, type VNode } from 'vue'
import { useCssVar } from '@vueuse/core'
import { useData, useRouter } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import { useMarkdown, useStorage } from '../../../composables'
import type {
    BannerNotification,
    ThemeConfig,
    ThemeNotification,
} from '../../../types'

import Banner from '../../../components/layout/Banner.vue'
import Feedback from '../../../components/layout/Feedback.vue'
import NavInbox from '../../../components/layout/Inbox.vue'
import RelatedPages from '../../../components/layout/RelatedPages.vue'
import Replacer from '../../../components/layout/Replacer.vue'

import { renderSidebarAction } from '../sections/sidebarAction'
import { renderNotFinished } from '../sections/notFinished'
import { renderBlocks } from '../sections/block'
import { createAnalyticsDataCollector } from '../../../util'

const props = defineProps<{
    homepageSlots: Record<string, (() => VNode) | undefined> | undefined
    banner: false | BannerNotification | undefined
    notifications: ThemeNotification[]
}>()

const { Layout: ParentLayout } = DefaultTheme

const md = useMarkdown()
const router = useRouter()
const storage = useStorage()

provide('md', md)
provide('notifications', props.notifications)

const {
    theme,
} = useData<ThemeConfig>()

const slots: { slotName: string, node: (() => VNode | undefined) }[] = [
    {
        node: () => renderSidebarAction(theme.value.sidebarAction),
        slotName: `sidebar-nav-${theme.value.sidebarAction?.position === 'bottom' ? 'after' : 'before'}`,
    },
    {
        node: () => h(NavInbox, { options: theme.value.notifications?.inbox, notifications: props.notifications }),
        slotName: `nav-bar-content-${theme.value.notifications?.inbox?.position === 'before' ? 'before' : 'after'}`,
    }
]

router.onAfterRouteChanged = createAnalyticsDataCollector(theme.value.analytics)

function iterateStorage(
    items: Record<string, string> | undefined,
    fn: (value: string, stored: string) => void,
) {
    for (const [value, localKey] of Object.entries(items ?? {})) {
        const stored = storage.useKey<never>(localKey, null)
        if (stored.value) fn(value, stored.value)
    }
}

// Apply colors from local storage
if (theme.value.storage) {
    iterateStorage(theme.value.storage.colorKeys, (cssName, value) => {
        useCssVar(cssName).value = value
    })

    iterateStorage(theme.value.storage.pageClasses, (className, enabled) => {
        if (enabled === 'true') document.documentElement.classList.add(className)
    })
}
</script>
