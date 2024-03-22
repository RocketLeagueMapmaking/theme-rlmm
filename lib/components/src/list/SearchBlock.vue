<template>
    <div class="search-box vp-doc">
        <div class="search-controls">
            <slot name="search-input" :search="search">
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
                <div v-else-if="filter.type === 'switch'" class="search-filter switch">
                    <p>{{ filter.label }}</p>
                    <VPSwitch
                        v-model="filterValues[index]"
                        :class="{ enabled: filterValues[index] }"
                        @click="() => changeFilter(!filterValues[index], index)"
                    />
                </div>
            </span>
        </div>

        <slot :filter="filterItem" :search="search">
        </slot>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, withDefaults } from 'vue'
import { useUrlSearchParams } from '@vueuse/core'

import { VPButton, VPSwitch } from '../../theme'

type BaseSearchFilter<Type extends string, Options extends object> = {
    type: Type
    searchParam?: string
    itemKey: string
} & Options

export type SearchFilter =
    | BaseSearchFilter<'select', { options: string[] }>
    | BaseSearchFilter<'switch', { label: string, invert?: boolean }>

const props = withDefaults(defineProps<{
    searchKey: string
    urlSearchParam?: string
    text?: {
        reset: string
        searchPlaceholder: string
    }
    filters?: SearchFilter[]
}>(), {
    filters: () => [],
    text: () => ({
        reset: 'Reset',
        searchPlaceholder: 'Search...',
    }),
})

const invert = (filter: { invert?: boolean }, value: boolean) => filter.invert ? !value : value

const search = ref<string | null>(null)
const filterValues = ref<(string | boolean)[]>(props.filters.map((i) => i.type === 'select' ? '' : invert(i, false)))

const params = useUrlSearchParams('history')
const searchParam = props.urlSearchParam ?? 'search'

const empty = (value: string | boolean | null) => value == null || (typeof value === 'string' ? value.length === 0 : !value)

watch(search, (value) => {
    if (params[searchParam] !== value && !empty(value)) params[searchParam] = value!
    console.debug('New search: ', value)
})

watch(filterValues, (filters) => {
    for (let i = 0; i < filters.length; i++) {
        const filter = filters[i]
        const key = props.filters[i].searchParam ?? props.filters[i].itemKey

        if (params[key] !== filter && (typeof filter === 'string' ? filter.length > 0 : true)) params[key] = filters[i].toString()
    }
})

onMounted(() => {
    if (!empty(params[searchParam] as string)) search.value = params[searchParam].toString()
})


function changeFilter(value: string | boolean, index: number): void {
    console.debug('Changing filter', props.filters[index].itemKey, value)
    filterValues.value = filterValues.value.map((v, i) => i === index ? value : v)
}

function reset() {
    filterValues.value = props.filters.map(() => '')
    search.value = ''
    params[searchParam] = <never>null
}

function getEmptySelectOption (filter: SearchFilter) {
    return `All ${filter.itemKey}${!filter.itemKey.endsWith('s') ? 's' : ''}`
}

function filterItem(item: object): boolean {
    const matchSearch = search.value == null
        || search.value.length === 0
        || item[props.searchKey].toLowerCase().includes(search.value.toLowerCase())

    return matchSearch && (props.filters.length === 0 || props.filters.every((filter, i) => {
        if (filter.type === 'select') {
            // Filter is not set
            return empty(filterValues.value[i])
                // Filter is equal to item value
                || filterValues.value[i] === item[filter.itemKey]
        } else if (filter.type === 'switch') {
            return empty(invert(filter, <boolean>filterValues.value[i])) || filterValues.value[i] === item[filter.itemKey]
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

.search-filter.switch {
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
}

.search-filter.switch p {
    padding-right: 8px;
}

.search-controls {
    display: flex;
    height: inherit;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
}

.search-controls > *:not(:first-child) {
    margin-left: 10px;
    margin-top: 5px;
}
</style>
