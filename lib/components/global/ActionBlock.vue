<template>
    <span>
        <div class="action-block" :class="className" :style="style ?? {}">
            <slot name="left" />
            <slot name="right" />
        </div>
    </span>
</template>

<script setup lang="ts">
import { type StyleValue } from 'vue';

defineProps<{
    style?: StyleValue
    className?: string
}>()
</script>

<style scoped>
.action-block {
    margin: 10px 0px;
    display: flex;
    justify-content: space-between;
    background-color: var(--vp-c-bg-soft);
    align-items: center;
    padding: 0px 18px;
    border-radius: 4px;
}

.custom-block .action-block {
    padding: 10px 18px !important;
}

.action-block :deep(p) {
    display: flex;
}

.action-block :deep(img) {
    width: 30px;
}

.action-block :deep(a) {
    text-decoration: none !important;
}
</style>