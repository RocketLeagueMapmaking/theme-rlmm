<template>
    <div class="showcase vp-doc">
        <h1>{{ title }}</h1>
        <p style="text-align: center;" v-if="description">{{ description }}</p>
        <div class="showcase-items" v-for="group in chunk(items.slice(0, showAmount), rowSize)">
            <VPLink v-for="{ item, text, url } in group.map(applyOptions)" :key="item.title" :href="url">
                <div class="showcase-item" :style="{ }">
                    <VPImage :image="item.image" />
                    <h1>{{ item.title }}</h1>
                    <p>{{ text }}</p>
                </div>
            </VPLink>
        </div>

        <VPButton size="big" :theme="action.theme ?? 'brand'" v-if="'link' in action" :text="action.text"
            :href="action.link" />
        <VPButton size="big" :theme="action.theme ?? 'brand'" v-else-if="!expanded" :text="action.text"
            @click="loadMore(action.totalItems)" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, withDefaults } from 'vue'

import {
    type ComponentData,
    chunk,
    fetchComponentData,
    renderText,
} from '../../util'

export interface ShowcaseEvent {
    title: string
    description?: string
    image: string
    link: string
}

export interface Props {
    title: string
    description: string
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
    amount?: number
    rowSize?: number
    descriptionLength?: number
    createUrl?: (event: ShowcaseEvent) => string
    data?: ShowcaseEvent[]
    dataUrl?: string
}

const props = withDefaults(defineProps<Props>(), {
    amount: 3,
    rowSize: 3,
    data: () => [],
    dataUrl: undefined,
    descriptionLength: 100,
})

const items = ref<ShowcaseEvent[]>([])
const showAmount = ref<number>(props.amount)
const expanded = ref<boolean>(false)

function applyOptions(event: ShowcaseEvent) {
    const { action, descriptionLength } = props

    return {
        item: event,
        text: renderText(event.description ?? '', {
            maxLength: descriptionLength,
        }),
        url: props.createUrl?.(event)
            ?? ('link' in action
                ? (action.link + '#' + event.title.replace(/ /g, '').toLowerCase())
                : undefined)
            ?? event.link,
    }
}

function loadMore(amount: number) {
    if (expanded.value) return
    expanded.value = true

    showAmount.value = (amount < 0 ? items.value.length : amount)
}

async function fetchData(options: ComponentData<ShowcaseEvent[], { amount: number }>) {
    return await fetchComponentData<ShowcaseEvent[], ShowcaseEvent[]>(options, [])
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

.showcase-item {
    color: var(--vp-c-text-1);
    background-color: var(--vp-c-bg-soft);
    border: 1px solid var(--vp-c-bg-soft);
    border-radius: 12px;
    padding: 20px 30px;
    margin: 12px;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

.showcase-item:hover {
    border-color: var(--vp-c-brand-3);
    cursor: pointer;
}

.showcase-item h1 {
    font-size: larger;
    font-weight: bolder;
}

.showcase-item :deep(img) {
    width: -webkit-fill-available;
}

@media (max-width: 960px) {
    .showcase-items {
        flex-wrap: wrap;
    }

    .showcase-item {
        width: 90vw !important;
    }

    .showcase-item :deep(img) {
        max-height: 40%;
        aspect-ratio: calc(16 / 9);
    }
}
</style>
