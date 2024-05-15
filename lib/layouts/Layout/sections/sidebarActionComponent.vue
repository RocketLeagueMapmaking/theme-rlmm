<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { DefaultTheme } from 'vitepress';

import SidebarItem from 'vitepress/dist/client/theme-default/components/VPSidebarItem.vue'

import { useStorage } from '../../../composables';
import type { SideActionItemOptions, SidebarButtonOptions } from '../../../types';

defineProps<{
    options: SideActionItemOptions | undefined
}>()

let storedValue = ref(false)
const displayItem = ref('none')

type SidebarItemOptions = Exclude<SideActionItemOptions['action']['item'], SidebarButtonOptions>

function getSidebarOptions(options: SidebarItemOptions) {
    const { items, ...item } = options

    // Have one item to enable the carrot icon in the sidebar
    return {
        items: [
            { text: '', }
        ],
        ...item,
    } satisfies DefaultTheme.SidebarItem
}

onMounted(() => {
    const storage = useStorage()
    const key = storage.themeKeys.value.hideSidebarAction

    storedValue.value = storage.getAny(key, false)
    displayItem.value = storedValue.value ? 'none' : 'block'
})
</script>

<template>
    <div class="sidebar-action" :class="options?.position ?? 'top'">
        <VPButton v-if="options != undefined && options.action.type === 'button'" v-bind="options.action.item" />

        <div v-else-if="options != undefined && options.action.type === 'item'">
            <SidebarItem :depth="4" :item="getSidebarOptions(options.action.item)" />

            <div class="sidebar-action-items">
                <div class="sidebar-action-item" :style="typeof item === 'function' ? item().style : item.style"
                    v-for="item, i in options.action.item.items" :key="i">
                    <component :is="item().name" v-bind="item().props" v-if="typeof item === 'function'">
                        {{ item().content }}
                    </component>
                    <VPButton v-else v-bind="item" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.sidebar-action {
    display: v-bind(displayItem);
}

.sidebar-action.top {
    margin-top: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--vp-c-divider);
}

.sidebar-action.bottom {
    border-top: 1px solid var(--vp-c-divider);
    padding-top: 8px;
}

.sidebar-action .VPButton {
    display: block;
}

.sidebar-action:has(.VPSidebarItem.collapsed) .sidebar-action-items {
    display: none;
}

.sidebar-action-items {
    margin-top: -10px;
}
</style>