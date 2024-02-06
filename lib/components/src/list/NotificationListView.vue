<template>
    <ListView :data="notifications" id-key="id" category-key="type" v-bind="props">
        <template #default="{ item }">
            <slot :item="(item as unknown as ThemeNotification)">
            </slot>
        </template>
    </ListView>
</template>

<script setup lang="ts">
import { inject } from 'vue';

import ListView, { Props as ListOptions } from './ListView.vue';

import { useNotification } from '../../../composables';
import { renderText } from '../../../util';

import type { ThemeNotification } from '../../../types';

const props = defineProps<Omit<ListOptions, 'data' | 'dataUrl' | 'dataKey' | 'idKey' | 'categoryKey'>>()

const notifications = (inject<ThemeNotification[]>('notifications') ?? [])
    .sort((a, b) => useNotification(b).startTime - useNotification(a).startTime)
    .map(n => ({ ...n, text: renderText(n.text) }))
</script>
