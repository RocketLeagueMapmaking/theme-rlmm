<template>
    <div class="tree-item" :class="{ 'main-item': mainBgColor }" v-if="showItem(item)">
        <div class="child-items">
            <div class="name-box">
                <VPIconChevronRight class="icon" @click="toggle" v-if="!open && parent" />
                <VPIconChevronDown class="icon" @click="toggle" v-if="open && parent" />
                <slot name="name" :item="item" />
            </div>

            <VPIconPlus class="icon" v-if="!showDetails" @click="toggleDetails" />
            <VPIconMinus class="icon" v-if="showDetails" @click="toggleDetails" />
        </div>

        <div class="item-details" :class="{ 'main-item': mainBgColor }" v-if="showDetails">
            <slot name="details" :item="item" :parents="parents" />
        </div>

        <div class="item-children" v-if="parent && open">
            <TreeItem v-for="child in getItem(item[idKey], items)" :main-bg-color="!mainBgColor"
                :parent="child[isParentKey]" :is-parent-key="isParentKey" :key="child[nameKey ?? idKey]" :item="<any>child" :get-item="getItem"
                :name-key="nameKey" :search="search" :id-key="idKey" :parents="newParents">
                <template #name="slotProps">
                    <slot name="name" v-bind="slotProps" />
                </template>
                <template #details="slotProps">
                    <slot name="details" v-bind="slotProps" />
                </template>
            </TreeItem>
        </div>
    </div>
</template>

<script setup lang="ts" generic="Item extends Record<string, any>">
import { type Ref, computed, inject, ref } from 'vue';

import {
    VPIconChevronDown,
    VPIconChevronRight,
    VPIconMinus,
    VPIconPlus,
} from '../../theme';

const open = ref(false), showDetails = ref(false)

const props = defineProps<{
    getItem: (id: string, items: any[]) => Item[]
    search?: string
    isParentKey: string
    parent: boolean
    parents: string[]
    mainBgColor: boolean
    idKey: string
    nameKey?: string
    item: Item
}>()

const items = inject<Ref<Item[]>>('treeItems')
const newParents = computed(() => props.parents.concat(props.item[props.nameKey ?? props.idKey]))

function showItem (item): boolean {
    const { search } = props

    if (!item) return false
    if (!search || search.length === 0) return true

    const searchValue = search.replace(/\./g, '').toLowerCase()
    const path = newParents.value.join('').toLowerCase()

    return path.length <= searchValue.length ? searchValue.startsWith(path) : path.startsWith(searchValue) 
}

function toggle () {
    if (!props.parent) return
    open.value = !open.value
}

function toggleDetails () {
    showDetails.value = !showDetails.value
}
</script>

<style scoped>
.icon {
    fill: var(--vp-c-neutral);
    min-width: 20px;
    max-width: 21px;
}

:deep(.VPBadge) {
    transform: none;
}

.icon:hover {
    cursor: pointer;
}

.tree-item {
    /* height: 60px; */
    border-radius: 6px;
    background-color: var(--vp-custom-block-details-bg);
    margin: 10px 0;
    padding: 16px 6px 16px 10px;
}

.main-item {
    background-color: var(--vp-c-bg);
}

.child-items, .name-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.name-box {
    max-width: 80vw;
    overflow-x: auto;
}
</style>

