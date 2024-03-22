<template>
    <VPButton
        v-if="action"
        :text="renderText(action.text, { preserve: true })"
        :theme="action.theme ?? 'brand'"
        :href="action.href"
        :style="action.style ?? {}"
        :class="{ 'vp-external-link-icon': action.externalLinkIcon }"
    />
</template>

<script setup lang="ts">
import { renderText } from '../../../util';

import type { BaseNotificationAction } from '../../../types';

defineProps<{
    action: BaseNotificationAction | undefined
}>()
</script>
