<script setup lang="ts">
import { VPFeatures, type Feature } from '../theme'

withDefaults(defineProps<{
    frontmatterKey?: string
    features?: Feature[]
}>(), {
    frontmatterKey: 'features',
})
</script>

<template>
    <div class="doc-features">
        <VPFeatures :features="features ?? $frontmatter[frontmatterKey]" />
    </div>
</template>

<style scoped>
:deep(.VPFeatures h2) {
  margin: 0 !important;
  padding: 0 !important;
  border-top: none !important;
}

:deep(.VPFeatures a) {
  text-decoration-line: none;
}

:deep(.VPFeatures p) {
  margin: 0;
}

.VPFeatures {
  padding: 0 !important;
}
</style>

<docs lang="md">

</docs>