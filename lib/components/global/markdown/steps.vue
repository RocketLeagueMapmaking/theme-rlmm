<template>
    <div>
        <div v-for="num in numbers" :key="num" class="step-container">
            <span v-if="hasSlot(num)" :style="{ backgroundColor: getColor() }" class="step-num">{{ num }}</span>
            <div class="step-content">
                <slot :name="getSlotName(num)" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useSlots } from 'vue'

import { getThemeColor } from '../../../util'

const { color, length } = withDefaults(defineProps<{
    /**
     * The maximum amount of steps that are rendered
     */
    length?: number
    /**
     * The color of the step numbers
     * Can be one of the theme colors or a CSS color value
     */
    color?: string
}>(), {
    length: 20,
    color: 'brand',
})

const numbers = Array.from({ length }, (_, i) => i + 1)

function getSlotName(num: number): string {
    return `step-${num}`
}

function hasSlot(num: number): boolean {
    return useSlots()[getSlotName(num)] != undefined
}

function getColor() {
    return getThemeColor(color)
}
</script>

<style scoped>
.step-container {
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
}

.step-num {
    font-weight: bolder;
    padding: 6px 12px;
    border-radius: 10px;
    margin-right: 8px;
}
</style>