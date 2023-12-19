<!-- From vitepress issue: https://github.com/faker-js/faker/pull/1487/files -->
<template>
    <div ref="el" class="banner" :style="{ background: bgColor }">
        <div class="text" v-html="html">
        </div>

        <button type="button" @click="dismiss" v-if="dismissable">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path
                    d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
        </button>
    </div>
</template>

<script setup lang="ts">
import { useElementSize } from '@vueuse/core';
import { onMounted, ref, watchEffect } from 'vue';
import { useData } from 'vitepress'

import { getThemeColor } from '../../data';
import type { RLMMNotification, RLMMThemeConfig } from '../../types'

const banner = defineProps<Partial<RLMMNotification>>();

const { page, theme } = useData<RLMMThemeConfig>()
const className = 'banner-dismissed'
const bgColor = getThemeColor(banner.color ?? theme.value.banner?.color ?? 'brand')

const el = ref<HTMLElement>();
const { height } = useElementSize(el);
watchEffect(() => {
    if (height.value) {
        document.documentElement.style.setProperty(
            '--vp-layout-top-height',
            `${height.value + 16}px`
        );
    }
});

const restore = (key: string, cls: string, def = false) => {
    const saved = localStorage.getItem(key);
    const pageEnabled = theme.value.banner?.enabled?.(page.value) ?? true;

    const show = saved ? saved !== 'false' && saved > new Date().toString() : def && pageEnabled
    if (show || banner.id == undefined) {
        document.documentElement.classList.add(cls);
    }
};

const dismiss = () => {
    const cooldown = banner.cooldown ?? theme.value.banner.cooldown ?? -1

    localStorage.setItem(
        banner.id,
        cooldown < 0 ? 'false' : (Date.now() + 8.64e7 * cooldown).toString() // current time + n day
    );
    document.documentElement.classList.add(className);
    theme.value.banner?.onDismissed?.(banner.id)
};

onMounted(() => restore(banner.id, className))
// restore(id, className);
</script>

<style>
.banner-dismissed {
    --vp-layout-top-height: 0px !important;
}

html {
    --vp-layout-top-height: 88px;
}

@media (min-width: 375px) {
    html {
        --vp-layout-top-height: 64px;
    }
}

@media (min-width: 768px) {
    html {
        --vp-layout-top-height: 40px;
    }
}
</style>

<style scoped>
.banner-dismissed .banner {
    display: none;
}

.banner {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: var(--vp-z-index-layout-top);
    padding: 8px;
    text-align: center;
    color: var(--vp-c-white);
    display: flex;
    justify-content: space-between;
}

.text {
    flex: 1;
}

.text:deep(a) {
    text-decoration: underline;
}

svg {
    width: 20px;
    height: 20px;
    margin-left: 8px;
}
</style>