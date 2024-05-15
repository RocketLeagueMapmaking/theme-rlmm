<template>
    <div class="tabs">
        <div class="tabs-actions" v-if="!hideSelectorActions">
            <p v-for="name, index in getNames()" :key="name" @click="changeActive(index)"
                :class="{ active: index === active }" :style="{ ...tabStyle, ...(index === active ? activeTabStyle : {}) }">
                {{ name }}
            </p>
        </div>
        <hr class="tabs-divider">
        <div v-for="name, index in getNames()" :key="name">
            <slot :name="toSlug(name)" v-if="index === active" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, withDefaults } from 'vue'
import { useStorage } from '../../../composables/';
import { useUrlSearchParams } from '@vueuse/core';

const active = ref(0);
const props = withDefaults(defineProps<{
    tabs: string[],
    startTab?: string,
    storage?: {
        key: string
        hideSelectorOnSet?: boolean
    },
    hideSelector?: boolean,
    searchParam?: string | null,
    updateSearchParam?: boolean,
    tabStyle?: object,
    activeTabStyle?: object,
    alignLeft?: boolean
}>(), {
    hideSelector: false,
    alignLeft: false,
    searchParam: null,
    updateSearchParam: true,
    tabStyle: () => ({}),
    activeTabStyle: () => ({}),
})

const params = useUrlSearchParams()
const hideSelectorActions = ref(false)
const justifyTabContent = props.alignLeft ? 'space-start' : 'space-between'
const textMargin = props.alignLeft ? '10px 0 0 0 !important' : '10px auto 0 auto !important'

function toSlug(name: string): string {
    return 'tab-' + name.replace(/ /g, '_').toLowerCase()
}

function getNames(): string[] {
    return props.tabs.map(name => {
        return name[0].toUpperCase() + name.slice(1).replace(/_/g, ' ')
    })
}

function changeActive(tabName: string): void;
function changeActive(index: number): void;
function changeActive(index: number | string): void {
    const value = typeof index === 'string'
        ? Math.max(props.tabs.indexOf(index), 0)
        : index

    active.value = value

    if (props.searchParam != null && props.updateSearchParam) {
        params[props.searchParam] = toSlug(props.tabs[value]).slice(4)
    }
}

onMounted(() => {
    const { hideSelector, searchParam, startTab, storage } = props

    hideSelectorActions.value = hideSelector
    if (startTab != undefined) changeActive(startTab)

    if (storage != undefined) {
        const stored = useStorage().get(<never>props.storage?.key)
        if (stored != null) {
            changeActive(stored)
            if (storage.hideSelectorOnSet != undefined) {
                hideSelectorActions.value = storage.hideSelectorOnSet
            }
        }
    }

    if (searchParam != null) {
        const tabParam = params[searchParam]?.toString()
        if (tabParam && tabParam.length && props.tabs.map(toSlug).includes(toSlug(tabParam))) {
            changeActive(tabParam)
        }
    }
})
</script>

<style scoped>
.tabs-actions {
    display: flex;
    flex-direction: row;
    justify-content: v-bind(justifyTabContent);
    flex-wrap: nowrap;
    align-items: center;
    overflow-x: auto;
}

.tabs-actions p {
    padding: 10px 50px;
    /* Important because custom blocks apply a different margin to the first text */
    margin: v-bind(textMargin);
}

.tabs-actions p.active {
    color: var(--vp-c-brand-1);
}

.tabs-actions p:hover {
    cursor: pointer;
}

.tabs-divider {
    margin-top: 0;
}
</style>