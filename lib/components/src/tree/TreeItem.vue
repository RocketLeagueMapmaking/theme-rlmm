<template>
    <div class="tree-item" :class="{ 'main-item': mainBgColor, open: parent && open }" v-if="showItem(item)">
        <div class="child-items">
            <div class="name-box">
                <Transition name="fade-icon" mode="out-in">
                    <span v-if="parent && open" class="icon vpi-chevron-down" @click="toggle" />
                    <span v-else-if="parent" class="icon vpi-chevron-right" @click="toggle" />
                </Transition>
                <slot name="name" :item="item" />
            </div>

            <Transition name="fade-icon" mode="out-in">
                <span v-if="!showDetails" class="icon vpi-plus" @click="toggleDetails" />
                <span v-else class="icon vpi-minus" @click="toggleDetails" />
            </Transition>
        </div>

        <Transition name="section">
            <div class="item-details" v-if="showDetails">
                <slot name="details" :item="item" :parents="parents" />
            </div>
        </Transition>

        <Transition name="section">
        <div class="item-children" v-if="parent && open">
            <TreeItem v-for="child in getItem(item[idKey], items ?? [])" :main-bg-color="!mainBgColor"
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
    </Transition>
    </div>
</template>

<script setup lang="ts" generic="Item extends Record<string, any>">
import { type Ref, computed, inject, ref } from 'vue';

const open = ref(false), showDetails = ref(false)

const props = defineProps<{
    getItem: (id: string, items: any[]) => Item[]
    search?: string | null
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

<style>
:root {
    --tree-animation-len: 0.1s;
    --tree-bg: var(--vp-custom-block-details-bg);
    --tree-bg-alt: var(--vp-custom-block-details-code-bg);
}

/* Tone down the animation to avoid vestibular motion triggers. */
@media (prefers-reduced-motion) {
    :root {
        --tree-animation-len: 0s;
    }
}
</style>

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
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    background-color: var(--tree-bg);
    margin: 6px 0;
    padding: 10px 0px 10px 20px;
    word-wrap: break-word;
}

.tree-item .open {
    padding-bottom: 1px !important;
}

.main-item {
    background-color: var(--tree-bg-alt);
}

.child-items, .name-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.name-box {
    max-width: 80vw;
    overflow-x: auto;
    word-wrap: break-word;
    flex-wrap: wrap;
}

/* transitions */
.fade-icon-enter-active,
.fade-icon-leave-active {
  transition: opacity var(--tree-animation-len) ease;
}

.fade-icon-enter-from,
.fade-icon-leave-to {
  opacity: 0;
}

.section-enter-active {
  transition: all var(--tree-animation-len) ease-in;
}

.section-leave-active {
    transition: all var(--tree-animation-len) ease-out;
}

.section-enter-from,
.section-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}
</style>

