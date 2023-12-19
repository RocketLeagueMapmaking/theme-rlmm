<template>
    <div class="search-box vp-doc">
        <slot name="search-input">
            <input :placeholder="text.searchPlaceholder" class="search-filter" v-model="search">
        </slot>

        <slot name="reset-btn" :reset="reset" :value="search">
            <VPButton theme="alt" :text="text.reset" @click="reset" />
        </slot>

        <span class="search-filter-box" v-for="filter, index in filters" :key="filter.itemKey">
            <select v-if="filter.type === 'select'" @change="(event) => {
                // @ts-ignore
                changeFilter(event.target.value, index)
            }" :value="filterValues[index]" class="search-filter">
                <option value="">{{ getEmptySelectOption(filter) }}</option>
                <option v-for="option in filter.options" :key="option">
                    {{ option }}
                </option>
            </select>
            <VPSwitch v-else-if="filter.type === 'switch'" v-model="filterValues[index]"
                :class="{ enabled: filterValues[index] }" />
        </span>

        <slot :filter="filterItem" :search="search">
        </slot>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, withDefaults } from 'vue'
import { useUrlSearchParams } from '@vueuse/core'

import { VPButton, VPSwitch } from '../../theme'

type SearchFilter<Type extends string, Options extends object> = {
    type: Type
    searchParam?: string
    itemKey: string
} & Options

const props = withDefaults(defineProps<{
    searchKey: string
    urlSearchParam?: string
    text?: {
        reset: string
        searchPlaceholder: string
    }
    filters?: (
        | SearchFilter<'select', { options: string[] }>
        | SearchFilter<'switch', {}>
    )[]
}>(), {
    filters: () => [],
    text: () => ({
        reset: 'Reset',
        searchPlaceholder: 'Search...',
    }),
})

const search = ref<string | null>(null)
const filterValues = ref<string[]>(props.filters.map(() => ''))

const params = useUrlSearchParams('history')
const searchParam = props.urlSearchParam ?? 'search'

const empty = (value: string | null) => value == null || value.length === 0

watch(search, (value) => {
    if (params[searchParam] !== value) params[searchParam] = value
    console.debug('New search: ', value)
})

watch(filterValues, (filters) => {
    for (let i = 0; i < filters.length; i++) {
        const key = props.filters[i].searchParam ?? props.filters[i].itemKey
        if (params[key] !== filters[i] && filters[i].length > 0) params[key] = filters[i]
    }
})

onMounted(() => {
    if (!empty(params[searchParam] as string)) search.value = params[searchParam].toString()
})


function changeFilter(value: string, index: number): void {
    console.debug('Changing filter', props.filters[index].itemKey, value)
    filterValues.value = filterValues.value.map((v, i) => i === index ? value : v)
}

function reset() {
    filterValues.value = props.filters.map(() => '')
    search.value = ''
}

function getEmptySelectOption (filter: SearchFilter<'select', { options: string[] }>) {
    return `All ${filter.itemKey}${!filter.itemKey.endsWith('s') ? 's' : ''}`
}

function filterItem(item: object): boolean {
    const matchSearch = search.value == null
        || item[props.searchKey].toLowerCase().includes(search.value.toLowerCase())

    return matchSearch && (props.filters.length === 0 || props.filters.every((filter, i) => {
        if (filter.type === 'select') {
            // Filter is not set
            return empty(filterValues.value[i])
                // Filter is equal to item value
                || filterValues.value[i] === item[filter.itemKey]
        } else if (filter.type === 'switch') {
            return filterValues.value[i] === item[filter.itemKey]
        } else {
            // Ignore invalid filter
            return true
        }
    }))
}
</script>

<style scoped>
.search-filter {
    line-height: 32px;
    border-radius: 6px;
}

.search-box>*:not(:first-child) {
    margin-left: 10px;
}
</style>