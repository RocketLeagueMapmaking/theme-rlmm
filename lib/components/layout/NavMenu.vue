<template>
    <BaseMenu :items="items" :expanded="items?.every(i => i.expanded)">
        <template #item="{ item }">
            <div v-if="item">
                <VPLink
                    :class="{ active: isActiveLink(page.relativePath, item.activeMatch || item.link, !!item.activeMatch) }"
                    :href="item.link" :target="item.target" :rel="item.rel">
                    <div class="expanded-item-container" :style="getStyle(item)">
                        <div class="expanded-item">
                            <Icon v-if="item.icon" :icon="item.icon" width="28" />
                            <div class="expanded-item-text">
                                <p>{{ item.text }}</p>
                                <p class="description" v-if="item.description">{{ item.description }}</p>
                            </div>
                        </div>
                        <div class="expanded-badge">
                            <Badge v-if="item.badge?.text" :type="item.badge?.type ?? 'info'" :text="item.badge.text" />
                        </div>
                    </div>
                </VPLink>
            </div>
        </template>
        <template #default>
            <slot />
        </template>
    </BaseMenu>
</template>

<script lang="ts" setup>
import { useData } from 'vitepress';
import { isActive } from 'vitepress/dist/client/shared'

import BaseMenu from './internal/Menu.vue'
import { ThemeConfig } from '../../types';

const props = defineProps<{
    items?: any[]
}>()

const isActiveLink: (currentPath: string, matchPath: string, asRegex?: boolean) => boolean = isActive
const { page } = useData<ThemeConfig>()

function getStyle (item) {
    return { 
        borderBottom: props.items?.findIndex(x => x.text === item.text) !== (props.items?.length ?? - 0) - 1 ? '1px solid var(--vp-c-border)' : undefined }
}
</script>

<style>
.VPMenu:has(.expanded-item) {
    padding: 0;
}
</style>

<style scoped>

.expanded-item {
    /* border-radius: 6px; */
    display: flex;
    flex-wrap: nowrap;
    justify-content: left;
    align-items: center;
    max-width: 100vw;
    width: 400px;
    padding: 2px;
}

.expanded-item-container:hover {
    background-color: var(--vp-c-default-soft);
    cursor: pointer;
}

.expanded-item-text,
.expanded-item-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
}

.expanded-item-container {
    flex-direction: row;
    align-items: center;
    padding: 10px 20px;
}

.expanded-item-container:nth-last-of-type() {
    border-bottom: 1px solid var(--vp-c-border);
}

.expanded-badge span {
    padding-top: 3px;
    padding-bottom: 3px;
}

.expanded-item-text p {
    padding: 0 12px;
    font-weight: bold;
}

.expanded-item-text .description {
    font-size: smaller;
}

/* Link */
.link {
  display: block;
  /* border-radius: 6px; */
  color: var(--vp-c-text-1);
  transition: background-color 0.25s, color 0.25s;
}

.link:hover {
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-default-soft);
}

.link.active {
  color: var(--vp-c-brand-1);
}
</style>