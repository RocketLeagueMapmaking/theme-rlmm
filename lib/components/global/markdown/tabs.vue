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
            <slot :name="`tab-${toSlug(name)}`" v-if="index === active" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, withDefaults } from 'vue'
import { useStorage } from '../../../composables/';

const active = ref(0);
const props = withDefaults(defineProps<{
    tabs: string[],
    startTab?: string,
    storage?: {
        key: string
        hideSelectorOnSet?: boolean
    },
    hideSelector?: boolean,
    tabStyle?: object,
    activeTabStyle?: object,
    alignLeft?: boolean
}>(), {
    hideSelector: false,
    alignLeft: false,
    tabStyle: () => ({}),
    activeTabStyle: () => ({}),
})

const hideSelectorActions = ref(false)
const justifyTabContent = props.alignLeft ? 'space-start' : 'space-between'
const textMargin = props.alignLeft ? '10px 0 0 0 !important' : '10px auto 0 auto !important'

function toSlug(name: string): string {
    return name.replace(/ /g, '_').toLowerCase()
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
}

onMounted(() => {
    const { hideSelector, startTab, storage } = props

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