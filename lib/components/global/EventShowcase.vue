<template>
    <div class="showcase vp-doc">
        <h1>{{ title }}</h1>
        <p style="text-align: center;">{{ description }}</p>
        <div class="showcase-items">
            <VPLink v-for="item in items" :key="item.title" :href="getLink(item)">
                <div class="showcase-item" :style="{ width: `${Math.floor(90 / items.length)}vw`}">
                    <VPImage :image="item.image" />
                    <h1>{{ item.title }}</h1>
                    <p>{{ getDescription(item) }}</p>
                </div>
            </VPLink>
        </div>

        <VPButton size="big" v-if="action.text" :text="action.text" :href="action.link" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, withDefaults } from 'vue'

import { type ComponentData, fetchComponentData } from '../../data/'

export interface ShowcaseEvent {
    title: string
    description?: string
    image: string
    link: string
}

const props = withDefaults(defineProps<{
    title: string
    description: string
    action: {
        link: string
        text?: string
    }
    amount?: number
    descriptionLength?: number
    data?: ShowcaseEvent[]
    dataUrl?: string
}>(), {
    amount: 3,
    data: () => [],
    dataUrl: undefined,
    descriptionLength: 100,
})

const items = ref<ShowcaseEvent[]>([])

function getDescription(event: ShowcaseEvent) {
    const desc = event.description ?? ''

    return desc.length > props.descriptionLength
        ? desc.slice(0, props.descriptionLength) + '...'
        : desc
}

function getLink(event: ShowcaseEvent) {
    return props.action.link + '#' + event.title.replace(/ /g, '').toLowerCase()
}

async function fetchData(options: ComponentData<ShowcaseEvent[], { amount: number }>) {
    return await fetchComponentData<ShowcaseEvent[], ShowcaseEvent[]>(options, [])
        .then(items => items.data.slice(0, options.amount))
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
    max-width: 500px !important;
}

@media (max-width: 960px) {
    .showcase-items {
        flex-direction: column;
    }

    .showcase-item {
        width: 90vw !important;
    }

    .showcase-item :deep(img) {
        max-width: 70vw !important;
        max-height: 40%;
        aspect-ratio: calc(16 / 9);
    }
}
</style>
