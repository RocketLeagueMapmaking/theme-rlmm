<template>
    <div class="tree-container" v-if="baseItem">
        <slot name="header" :metadata="metadata"></slot>

        <TreeItem :item="child" :search="search" :get-item="getItem" :is-parent-key="isParentKey"
            :id-key="idChildKey ?? idKey" :parent="child[isParentKey]" :main-bg-color="false" v-for="child in baseItem"
            :key="child[nameChildKey ?? idChildKey ?? idKey]" :parents="[]" :name-key="nameChildKey">
            <template #name="slotProps">
                <slot name="item-name" v-bind="slotProps" />
            </template>

            <template #details="slotProps">
                <slot name="item-details" v-bind="slotProps" />
            </template>
        </TreeItem>
    </div>
</template>

<script setup lang="ts" generic="Item extends Record<string, any>, Metadata extends object | null = null, BeforeLoadedItem extends object = Item">
import { type UnwrapRef, onMounted, ref, provide } from 'vue';

import { fetchComponentData } from '../../../util';

import TreeItem from './TreeItem.vue'

const treeItems = ref<Item[]>([])
const metadata = ref<Metadata | null>(null)
const baseItem = ref<Item[] | null>(null)

const props = withDefaults(defineProps<{
    data?: Item | Item[]
    dataUrl?: string
    dataKey?: string
    parentKey?: string
    parentListKey?: string
    isParentKey: string
    childrenKey?: string
    idChildKey?: string
    nameChildKey?: string
    idKey?: string
    search?: string | null
    // filter?: (item: Item) => boolean
    transformLoadedItem?: (item: BeforeLoadedItem) => Item
}>(), {
    idKey: 'id',
    childrenKey: 'children'
})

provide('treeItems', treeItems)

function getItem(id: string, items: any[]) {
    const get = (id: string) => {
        return items.find(item => item[props.idKey] === id) as UnwrapRef<Item>
    }

    if (props.parentKey) {
        const base = get(id), parentId = base[props.parentKey]
        if (id !== parentId) {
            console.debug('Adding parent: ' + parentId)
            base[props.childrenKey].push(...getItem(parentId, items)[props.childrenKey])
        }
    } else if (props.parentListKey) {
        return [id, ...new Set<string>(get(id)[props.parentListKey].filter(p => p && p.length > 0 && id !== p))]
            .flatMap(parent => get(parent)[props.childrenKey])
    } else {
        return get(id)[props.childrenKey]
    }
}

onMounted(async () => {
    let baseId: string | null = null

    treeItems.value = await fetchComponentData(props, [])
        .then(data => {
            if (props.dataKey) {
                const { [props.dataKey]: output, ...meta } = data.data as Record<string, string>
                if (meta[props.idKey]) baseId = meta[props.idKey].toString()
                metadata.value = meta as unknown as UnwrapRef<Metadata>

                return data.data[props.dataKey]
            } else if (Array.isArray(data.data)) {
                baseId = data.data[0]?.[props.idKey]
                return data.data
            }
        });

    if (props.transformLoadedItem != undefined) {
        (treeItems.value as Item[]) = treeItems.value.map(item => {
            return props.transformLoadedItem!(<BeforeLoadedItem>item)
        })
    }

    // Only compute after tree items has been set
    baseItem.value = getItem(baseId!, treeItems.value)

    // Throw errors on invalid configuration or no items found
    if (!baseItem.value) throw new Error('No base item found! Configure the idKey and/or dataKey correctly')
    if (!treeItems.value.length || treeItems.value.length === 0) throw new Error('No items found for this tree!')
})
</script>