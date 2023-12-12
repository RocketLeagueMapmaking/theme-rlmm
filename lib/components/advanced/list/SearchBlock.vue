<template>
    <div class="search-box vp-doc">
        <slot name="search-input">
            <input placeholder="Search..." class="search-filter" v-model="search">
        </slot>
        <slot name="reset-btn" :reset="reset" :value="search">
            <VPButton theme="alt" text="Reset" @click="reset" />
        </slot>
        <!-- <slot name="search-btn" :value="search">
            <VPButton theme="alt" text="🔍" />
        </slot> -->
        <select 
            v-for="filter, index in filters"
            :key="filter.itemKey"
            @change="(event) => {
                // @ts-ignore
                changeFilter(event.target.value, index)
            }"
            :value="filterValues[index]"
            class="search-filter"
        >
            <option value="">All {{ filter.itemKey }}{{ filter.itemKey.at(-1) !== 's' ? 's' : '' }}</option>
            <option v-for="option in filter.options" :key="option">
                {{ option }}
            </option>
        </select>
        <slot :filter="filterItem">
        </slot>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, watchEffect, withDefaults } from 'vue';

const props = withDefaults(defineProps<{
    searchKey: string
    filters?: {
        type: 'select'
        options: string[]
        itemKey: string
    }[]
}>(), {
    filters: () => []
})

const search = ref<string | null>(null)
const filterValues = ref<string[]>(props.filters.map(() => ''))
    watch([search, filterValues], ([value, filters]) => {
    console.debug('New search config: ', value, filters)
})


function changeFilter (value: string, index: number): void {
    console.debug('Changing filter', props.filters[index].itemKey, value)
    filterValues.value = filterValues.value.map((v, i) => i === index ? value : v)
}

function reset () {
    filterValues.value = props.filters.map(() => null)
    search.value = ""
}

function filterItem (item: object): boolean {
    const matchSearch = search.value == null 
        || item[props.searchKey].toLowerCase().includes(search.value.toLowerCase())

    return matchSearch && (props.filters.length === 0 || props.filters.every((filter, i) => {
        if (filter.type === 'select') {
            // Filter is not set
            return filterValues.value[i] == null || filterValues.value[i].length === 0 
            // Filter is equal to item value
                || filterValues.value[i] === item[filter.itemKey]
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

.search-box > *:not(:first-child) {
    margin-left: 10px;
}
</style>