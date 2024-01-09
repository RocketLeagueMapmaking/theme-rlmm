<template>
    <span>
        <ActionBlock v-if="!renderValue">
            <template #left>
                <slot></slot>
            </template>

            <template #right>
                <VPSwitchAppearance v-if="isAppearance && type === 'switch'" />
                <VPSwitch v-else-if="type === 'switch'" :class="{ enabled: value }" v-model="value" @click="onChange" />
                <input v-else-if="type === 'input'" type="text" v-model="value" @change="onChange">
                <select v-else-if="type === 'select'" class="action" v-model="value" @change="onChange">
                    <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
                </select>
            </template>
        </ActionBlock>
        <span v-else>
            {{ value }}
        </span>
    </span>
</template>

<script setup lang="ts">
import { withDefaults, ref, onMounted } from 'vue'
import { inBrowser } from 'vitepress';

import { useStorage } from '../../data/'

import ActionBlock from './ActionBlock.vue'

const value = ref<boolean | string | number>(false)
const store = ref<ReturnType<typeof useStorage> | null>(null)

const props = withDefaults(defineProps<{
    isAppearance?: boolean
    type?: 'switch' | 'select' | 'input'
    storeKey: string
    options?: string[]
    defaultValue?: any
    renderValue?: boolean
    documentClassToToggle?: string
    onChanged?: ((data: { key: string, value: boolean | string | number }) => void)
}>(), {
    defaultValue: false,
    renderValue: false,
    isAppearance: false,
    type: 'switch',
    onChanged: ({ key, value }) => {
        console.debug("Changing preference:", key, value)
    },
})

function onChange() {
    const oldValue = value.value
    const newValue = typeof oldValue === 'boolean' ? !oldValue : oldValue

    store.value?.set(props.storeKey, newValue.toString())
    value.value = newValue

    if (inBrowser) {
        if (props.documentClassToToggle) {
            document.documentElement.classList.toggle(props.documentClassToToggle)
        }
    }

    props.onChanged({ key: props.storeKey, value: newValue })
}

onMounted(() => {
    const storage = useStorage();

    store.value = storage
    value.value = storage.getAny(props.storeKey, props.defaultValue)

    if (inBrowser) {
        if (props.documentClassToToggle && value.value === true) {
            document.documentElement.classList.add(props.documentClassToToggle)
        }
    }
})
</script>

<style scoped>
.action,
input {
    background-color: var(--vp-c-bg);
}

.action:hover {
    cursor: pointer;
    border: 1px solid var(--vp-c-brand-3);
}
</style>
