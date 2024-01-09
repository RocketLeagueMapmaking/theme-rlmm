<template>
    <ParentLayout>
        <template #layout-top>
            <Banner v-bind="notification" />
        </template>

        <template v-for="homeSlot in Object.keys(homepageSlots ?? {})" #[homeSlot]>
            <component :is="homepageSlots![homeSlot]()" />
        </template>

        <template #[sidebarActionSlot]>
            <component :is="sidebarAction" />
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
import { provide, type VNode } from 'vue'
import { useData } from 'vitepress'

import DefaultTheme from 'vitepress/theme'
import markdownit from 'markdown-it'

import type { RLMMNotification, RLMMThemeConfig } from '../../../types'

import Banner from '../../../components/layout/Banner.vue'

import { renderSidebarAction } from '../sections/sidebarAction'
import { renderNotFinished } from '../sections/notFinished'
import { renderBlocks } from '../sections/block'

defineProps<{
    homepageSlots: Record<string, () => VNode> | undefined
    notification: false | RLMMNotification | undefined
}>()

const { Layout: ParentLayout } = DefaultTheme

const md: markdownit = markdownit()

const {
    theme,
} = useData<RLMMThemeConfig>()

const sidebarActionSlot = `sidebar-nav-${theme.value.sidebarAction?.position === 'bottom' ? 'after' : 'before'}`
const sidebarAction = renderSidebarAction(theme.value)

provide('md', md)
</script>
