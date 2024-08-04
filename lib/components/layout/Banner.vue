<!-- From vitepress issue: https://github.com/faker-js/faker/pull/1487/files -->
<template>
    <div v-if="isMounted && banner" ref="el" class="banner" :style="{ background: bgColor }">
        <div class="text">
            <div v-html="html"></div>
            <NotificationAction :action="banner.action" @clicked="() => themeOptions?.onClicked?.(banner!.id)" />
        </div>

        <button type="button" :aria-label="dismissLabel" @click="dismiss" v-if="banner.dismissable ?? true">
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

import NotificationAction from './internal/NotificationAction.vue';

import { useNotifications } from '../../composables';
import { getThemeColor, renderText } from '../../util';
import type { BannerNotification, ThemeConfig } from '../../types'

const props = defineProps<{ banners: BannerNotification[] }>();
const banner = ref<BannerNotification>()

const { 
    page,
    theme: { value: { banner: themeOptions } },
} = useData<ThemeConfig>()

const className = 'banner-dismissed'
const MS_IN_DAY = 8.64e7
const DEFAULT_COOLDOWN = -1

function parseTime (ms: string) {
    try {
        return parseInt(ms)
    } catch {
        return 0
    }
}

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

const html = computed(() => renderText(banner.value?.text ?? ''))
const bgColor = computed(() => getThemeColor(banner.value?.color ?? themeOptions?.color ?? 'brand'))

const restore = (key: string | undefined, cls: string) => {
    if (!key) return false
    let isRestored = false

    const saved = localStorage.getItem(key);
    const pageEnabled = themeOptions?.enabled?.(page.value, key) ?? true;

    const isDismissed = saved ? (saved === 'false' || (Date.now() < parseTime(saved))) : false
    if (!isDismissed && pageEnabled && key != undefined) {
        document.documentElement.classList.remove(cls);
        isRestored = true
    }

    return isRestored
};

function setActiveBanner (setBanner = true) {
    document.documentElement.classList.add(className);
    if (!setBanner) return

    for (const notification of props.banners.filter(b => notifications.isActive(b))) {
        if (banner.value == undefined) {
            if (restore(notification.id, className)) banner.value = notification
        }
    }
}

const dismiss = () => {
    if (!banner.value?.id) return console.error('Cannot dismiss no banner!')

    const cooldown = banner.value.cooldown ?? themeOptions?.cooldown ?? DEFAULT_COOLDOWN

    localStorage.setItem(
        banner.value.id,
        cooldown < 0 ? 'false' : (Date.now() + MS_IN_DAY * cooldown).toString() // current time + n day
    );

    themeOptions?.onDismissed?.(banner.value.id)
    setActiveBanner(themeOptions?.showNextBannerAfterDismiss ?? false)
};

onMounted(() => {
    setActiveBanner()
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
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.text .VPButton {
    margin-left: 20px;
    border-radius: 20px !important;
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