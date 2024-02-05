<!-- From vitepress issue: https://github.com/faker-js/faker/pull/1487/files -->
<template>
    <div v-if="isMounted" ref="el" class="banner" :style="{ background: bgColor }">
        <div class="text" v-html="html">
        </div>

        <button type="button" :aria-label="dismissLabel" @click="dismiss" v-if="dismissable">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path
                    d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
        </button>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watchEffect } from 'vue';
import { useElementSize, useMounted } from '@vueuse/core';
import { useData } from 'vitepress'

import { useNotifications } from '../../composables';
import { getThemeColor, renderText } from '../../util';
import type { BannerNotification, ThemeConfig } from '../../types'

const banner = defineProps<BannerNotification>();

const { 
    page,
    theme: { value: { banner: themeOptions } },
} = useData<ThemeConfig>()

const className = 'banner-dismissed'
const bgColor = getThemeColor(banner.color ?? themeOptions?.color ?? 'brand')
const dismissLabel = themeOptions?.dismissButtonLabel ?? 'Dismiss banner'

const el = ref<HTMLElement>();
const isMounted = useMounted()

const notifications = useNotifications()
const { height } = useElementSize(el);

watchEffect(() => {
    if (height.value) {
        document.documentElement.style.setProperty(
            '--vp-layout-top-height',
            `${height.value + 16}px`
        );
    }
});

const html = computed(() => renderText(banner.text))

const restore = (key: string | undefined, cls: string) => {
    const saved = key ? localStorage.getItem(key) : undefined;
    const pageEnabled = themeOptions?.enabled?.(page.value) ?? true;

    const show = saved ? saved !== 'false' && saved > new Date().toString() : false && pageEnabled
    if (show || key == undefined || !notifications.isActive(banner)) {
        document.documentElement.classList.add(cls);
    }
};

const dismiss = () => {
    if (!banner.id) return console.error('Cannot dismiss no banner!')

    const cooldown = banner.cooldown ?? themeOptions?.cooldown ?? -1

    localStorage.setItem(
        banner.id,
        cooldown < 0 ? 'false' : (Date.now() + 8.64e7 * cooldown).toString() // current time + n day
    );
    document.documentElement.classList.add(className);

    themeOptions?.onDismissed?.(banner.id)
};

onMounted(() => {
    restore(banner.id, className)
})
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