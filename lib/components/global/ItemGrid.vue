<template>
    <div class="showcase vp-doc">
        <h1>{{ title }}</h1>
        <p style="text-align: center;" v-if="description">{{ description }}</p>
        <div class="showcase-items" v-for="group in groupedChunks">
            <VPLink v-for="{ item, text, url } in group.map(applyOptions)" :key="item.title" :href="url">
                <div class="showcase-item">
                    <VPImage :image="item.image" />
                    <div class="showcase-item-header">
                        <h1>{{ item.title }}</h1>
                        <Badge style="margin-left: 10px;" v-if="item.tag" :text="item.tag" /> 
                    </div>
                    <p v-html="text"></p>
                    <div class="showcase-item-actions">
                        <VPButton
                            style="margin: 6px 0px;"
                            v-for="action in (item.actions ?? []).slice(0, Math.max(0, Math.min(2, maxItemActions)))"
                            :key="action.link"
                            :href="action.link"
                            :text="action.text"
                            :theme="action.theme ?? (action.primary ? 'brand' : 'alt')"
                            :class="{
                                'vp-external-link-icon': isExternal(action.link),
                            }"
                        />
                    </div>
                </div>
            </VPLink>
        </div>

        <VPButton size="big" :theme="action.theme ?? 'brand'" v-if="'link' in action" :text="action.text"
            :href="action.link" />
        <VPButton size="big" :theme="action.theme ?? 'brand'" v-else-if="!expanded" :text="action.text"
            @click="loadMore('totalItems' in action ? action.totalItems : -1)" />
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useWindowSize } from '@vueuse/core';

import {
    type ComponentData,
    chunk,
    fetchComponentData,
    renderText,
} from '../../util'

import type { ThemeText } from '../../types'

export interface GridItem {
    title: string
    description?: ThemeText
    image: string
    link?: string
    tag?: string
    actions?: {
        text: string
        link: string
        theme?: string
        primary?: boolean
    }[]
}

/** @deprecated */
export type ShowcaseEvent  = GridItem

export interface Props {
    /**
     * The title above the items
     */
    title: string

    /**
     * A small text describing what items are
     */
    description?: string

    /**
     * The action to show below the items.
     * Can either:
     * - show more items
     * - link to another page
     */
    action:
    | {
        link: string
        text?: string
        theme?: 'brand' | 'alt'
    } | {
        text?: string
        totalItems: number
        theme?: 'brand' | 'alt'
    }

    /**
     * The total amount of items to show
     */
    amount?: number

    /**
     * The amount of items in each row
     */
    rowSize?: number

    /**
     * Do not show external links in actions
     */
    disableExternalLinkIcons?: boolean
    /**
     * The maximum length of an item's description
     */
    descriptionLength?: number

    /**
     * The text to render at the end of the description when cut off
     */
    descriptionEllipsis?: string
    createSlug?: (item: GridItem) => string
    createUrl?: (item: GridItem) => string
    useActionLink?: boolean
    maxItemActions?: number
    itemHeight?: string
    data?: GridItem[]
    dataUrl?: string
}

const props = withDefaults(defineProps<Props>(), {
    amount: 3,
    rowSize: 3,
    data: () => [],
    dataUrl: undefined,
    descriptionLength: 100,
    disableExternalLinkIcons: false,
    useActionLink: false,
    maxItemActions: 2,
    itemHeight: '400px',
})

const items = ref<GridItem[]>([])
const showAmount = ref<number>(props.amount)
const expanded = ref<boolean>(false)

const { width } = useWindowSize()

const groupedChunks = computed(() => {
    if (props.rowSize <= 2) return chunk(items.value.slice(0, showAmount.value), props.rowSize)
    else if (props.rowSize % 2 === 1) {
        if (width.value >= 690 && width.value < 960) return chunk(items.value.slice(0, showAmount.value - (showAmount.value % 2 === 1 ? 1 : 0)), props.rowSize - 1)
    } 

    return chunk(items.value.slice(0, showAmount.value), props.rowSize)
})

function isExternal (link: string): boolean {
    return !props.disableExternalLinkIcons
        && typeof link === 'string'
        && link.match(/^(?:[a-z]+:|\/\/)/i) != null
}

function applyOptions(item: GridItem) {
    const { action, descriptionEllipsis, descriptionLength } = props

    return {
        item,
        text: renderText(item.description ?? '', {
            maxLength: descriptionLength,
            ellipsisText: descriptionEllipsis,
        }),
        url: (!props.useActionLink ? item.link : undefined)
            ?? props.createUrl?.(item)
            ?? ('link' in action
                    ? (action.link + '#' + (props.createSlug?.(item) ?? item.title.replace(/ /g, '').toLowerCase()))
                    : undefined
            ) ?? item.link,
    }
}

function loadMore(amount: number) {
    if (expanded.value) return
    expanded.value = true

    showAmount.value = (amount < 0 ? items.value.length : amount)
}

async function fetchData(options: ComponentData<GridItem[], { amount: number }>) {
    return await fetchComponentData<GridItem[], GridItem[]>(options, [])
        .then(items => items.data)
}

onMounted(async () => {
    items.value = await fetchData(props)
})
</script>

<style scoped>
a {
    text-decoration-line: none;
}

.showcase {
    margin: 60px 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.showcase-items {
    margin: 0 auto;
    max-width: 1152px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
}

.showcase-items .VPLink:only-child {
    width: 50% !important;
}

.showcase-items:has(.VPLink:only-child) {
    justify-content: flex-start;
}

.showcase-item {
    color: var(--vp-c-text-1);
    background-color: var(--vp-c-bg-soft);
    border: 1px solid var(--vp-c-bg-soft);
    border-radius: 12px;
    padding: 16px;
    margin: 12px;
    height: v-bind(itemHeight);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.showcase-item:hover {
    border-color: var(--vp-c-brand-3);
    cursor: pointer;
}

.showcase-item h1 {
    font-size: x-large;
    font-weight: bolder;
}

.showcase-item :deep(p) {
    margin: 0 !important;
}

.showcase-item :deep(img) {
    width: -webkit-fill-available;
}

.showcase-item-header {
    display: flex;
    align-items: center;
}

.showcase-item-actions {
    display: flex;
    flex-wrap: wrap;
}

.showcase-item-actions > *:first-child {
    margin-right: 12px !important; 
}

@media (max-width: 690px) {
    .showcase-items {
        flex-wrap: wrap;
    }

    .showcase-item {
        width: 80vw !important;
    }

    .showcase-item :deep(img) {
        max-height: 40%;
        /* aspect-ratio: calc(16 / 9); */
    }
}
</style>
