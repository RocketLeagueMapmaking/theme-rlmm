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

import { useNotifications } from '../../../composables';
import { renderText } from '../../../util';

import type { ThemeNotification } from '../../../types';

const props = defineProps<Omit<ListOptions, 'data' | 'dataUrl' | 'dataKey' | 'idKey' | 'categoryKey'>>()

const notifications = useNotifications()
    .filter((inject<ThemeNotification[]>('notifications') ?? []), { sort: true })
    .map(n => ({ ...n, text: renderText(n.text) }))
</script>
