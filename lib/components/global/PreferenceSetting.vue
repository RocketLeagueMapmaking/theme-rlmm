<template>
    <span>
        <div class="setting" v-if="!renderValue">
            <slot></slot>
            <VPSwitchAppearance v-if="isAppearance && type === 'switch'" />
            <VPSwitch v-else-if="type === 'switch'" :class="{ enabled: value }" v-model="value" @click="onChange" />
            <input v-else-if="type === 'input'" type="text" v-model="value" @change="onChange">
            <select v-else-if="type === 'select'" class="action" v-model="value" @change="onChange">
                <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
            </select>
        </div>
        <span v-else>{{ value }}</span>
    </span>
</template>

<script setup lang="ts">
import { withDefaults, ref, onMounted } from 'vue'
import { useStorage } from '../../data/'

const value = ref<boolean | string | number>(false)
const store = ref<ReturnType<typeof useStorage> | null>(null)

const props = withDefaults(defineProps<{
    isAppearance?: boolean
    type?: 'switch' | 'select' | 'input'
    storeKey: `rlmm-${string}`
    options?: string[]
    defaultValue?: any
    renderValue?: boolean
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

    store.value.set(props.storeKey, newValue.toString())
    value.value = newValue

    props.onChanged({ key: props.storeKey, value: newValue })
}

onMounted(() => {
    const storage = useStorage();

    store.value = storage
    value.value = storage.getAny(props.storeKey, props.defaultValue)
})
</script>

<style scoped>
.setting {
    margin: 10px 0px;
    display: flex;
    justify-content: space-between;
    background-color: var(--vp-c-bg-soft);
    align-items: center;
    padding: 0px 18px;
    border-radius: 4px;
}

.action,
input {
    background-color: var(--vp-c-bg);
}

.action:hover {
    cursor: pointer;
    border: 1px solid var(--vp-c-brand-3);
}

.VPSwitch.enabled:deep(.check) {
    background-color: var(--vp-c-brand-3);
    transform: translateX(18px);
}

.custom-block .setting {
    padding: 10px 18px !important;
}
</style>
