<template>
    <div class="container">
        <div 
            v-for="category in items"
            :key="category.title ?? 'title'"
            class="category"
        >
            <h3 v-if="category.title && category.items.filter(filter).length > 0">{{ category.title }}</h3>
            <div 
                v-for="item in category.items.filter(filter).sort(sort)"
                :key="item[idKey]"
                class="item"
                :style="{ ...itemStyle }"
            >
                <slot :item="<Item>item">
                    <span>{{ item }}</span>
                </slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" generic="Item = Record<string, never>">
import { onMounted, ref } from 'vue';

import { fetchComponentData } from '../../../util';

export interface Props {
    dataUrl?: string
    data?: unknown[]
    itemStyle?: object
    filter?: (item: never) => boolean
    sort?: { 
        key: string | number,
        // descending?: boolean
    }
    idKey?: string
    dataKey?: string
    categoryKey?: string
    groupByCategory?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    groupByCategory: false,
    itemStyle: () => ({}),
    data: () => [],
    filter: () => true,
    idKey: 'id',
})

const items = ref<{ title: string | null, items: never[] }[]>([])

function sort <T = never>(a: T, b: T) {
    if (!props.sort) return 0
    else return a[props.sort.key].localeCompare(b[props.sort.key])
}

function mapToCategories <T = never>(items: T[]): { title: string | null, items: T[] }[] {
    if (!props.groupByCategory || (props.groupByCategory && !props.categoryKey)) return [{ title: null, items }]
    else return [...new Set<string>(items.map(i => i[props.categoryKey!]))]
        .sort((a, b) => a.localeCompare(b))
        .reduce((list, name) => { 
            list.push({ 
                title: name[0].toUpperCase() + name.slice(1), 
                items: <never>items.filter(i => i[props.categoryKey!] === name)
            })

            return list
        }, [] as { title: string | null, items: T[] }[])
}

onMounted(async () => {
    const data = await fetchComponentData(props, [])
    items.value = mapToCategories(props.dataKey ? data.data[props.dataKey] : data.data)
})
</script>