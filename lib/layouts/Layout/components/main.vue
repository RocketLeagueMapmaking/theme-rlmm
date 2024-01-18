<template>
    <ParentLayout>
        <template #layout-top v-if="banner != undefined && banner !== false">
            <Banner v-bind="banner" />
        </template>

        <template v-for="homeSlot in Object.keys(homepageSlots ?? {})" #[homeSlot]>
            <component :is="homepageSlots![homeSlot]()" />
        </template>

        <template v-for="dynamicSlot in slots" #[dynamicSlot.slotName]>
            <component :is="dynamicSlot.node()" />
        </template>

        <template #doc-before>
            <!-- @vue-ignore -->
            <component v-if="$frontmatter.finished === false && theme.notFinished !== false"
                :is="renderNotFinished(md, theme.blocks?.notFinished)" />
            <!-- @vue-ignore -->
            <component :is="renderBlocks(md, $frontmatter.blocks ?? [], 'top')" />
        </template>

        <template #doc-footer-before>
            <!-- TODO: figure out global properties -->
            <!-- @vue-ignore  -->
            <component :is="renderBlocks(md, $frontmatter.blocks ?? [], 'bottom')" />
            <!-- TODO: add related resources -->
        </template>
    </ParentLayout>
</template>

<script setup lang="ts">
import { h, provide, type VNode } from 'vue'
import { useCssVar } from '@vueuse/core'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import markdownit from 'markdown-it'

import { useStorage } from '../../../composables'
import type { BannerNotification, RLMMThemeConfig, ThemeNotification } from '../../../types'

import Banner from '../../../components/layout/Banner.vue'
import NavInbox from '../../../components/layout/Inbox.vue'

import { renderSidebarAction } from '../sections/sidebarAction'
import { renderNotFinished } from '../sections/notFinished'
import { renderBlocks } from '../sections/block'

const props = defineProps<{
    homepageSlots: Record<string, () => VNode> | undefined
    banner: false | BannerNotification | undefined
    notifications: ThemeNotification[]
}>()

const { Layout: ParentLayout } = DefaultTheme

const md: markdownit = markdownit()
const storage = useStorage()

provide('md', md)
provide('notifications', props.notifications)

const {
    theme,
} = useData<RLMMThemeConfig>()

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
