<template>
    <span>
        <ActionBlock v-if="!renderValue">
            <template #left>
                <slot>{{ text }}</slot>
            </template>

            <template #right>
                <VPSwitchAppearance v-if="isAppearance && type === 'switch'" />
                <VPSwitch v-else-if="type === 'switch'" :class="{ enabled: value }" v-model="value" @click="onChange" />
                <input v-else-if="['input', 'color'].includes(type)" :class="{ 'color-action': type === 'color' }"
                    :type="type === 'input' ? 'text' : type" v-model="value" @change="onChange">
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

import { useStorage } from '../../composables/'

import ActionBlock from './ActionBlock.vue'
import { useCssVar } from '@vueuse/core';

const value = ref<boolean | string | number>(false)
const store = useStorage()

type SettingType =
    | 'switch'
    | 'select'
    | 'input'
    | 'color'

const props = withDefaults(defineProps<{
    isAppearance?: boolean
    type?: SettingType
    text?: string
    storeKey: string
    cssVariable?: string
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

const cssColor = props.cssVariable && props.type === 'color' ? useCssVar(props.cssVariable) : undefined

function onChange() {
    const oldValue = value.value
    const newValue = typeof oldValue === 'boolean' ? !oldValue : oldValue

    store.set(props.storeKey, newValue.toString())
    value.value = newValue

    if (cssColor) {
        cssColor.value = newValue.toString()
    }

    if (inBrowser) {
        if (props.documentClassToToggle) {
            document.documentElement.classList.toggle(props.documentClassToToggle)
        }
    }

    props.onChanged({ key: props.storeKey, value: newValue })
}

onMounted(() => {
    const storage = useStorage();

    // TODO: remove any
    value.value = storage.useKey<any>(props.storeKey, cssColor?.value ?? props.defaultValue).value

    if (typeof value.value === 'string' && cssColor) {
        cssColor.value = value.value.toString()
    } else if (cssColor) {
        value.value = cssColor.value
    }

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

.color-action {
    width: 40px;
    padding: 0;
    background-color: transparent;
}
</style>
