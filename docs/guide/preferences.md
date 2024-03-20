---
exposePages: true
aside: false
footer: false
---

# Preferences

<script setup>
import { useCssVar } from '@vueuse/core'
import { useNotifications, useStorage, ListWindow, WatchSubscriptionManager } from '../../lib/'

const NotificationManager = useNotifications()
const storage = useStorage()

import { __pageData as homePage } from './index.md'
</script>

<TabsWindow :activeTabStyle="{ backgroundColor: 'var(--vp-c-bg-soft)' }" :tabs="['general', 'notifications', 'guide', 'advanced']">

<template #tab-general>

### Appearance

<PreferenceSetting :isAppearance="true" storeKey="">

Use dark theme
</PreferenceSetting>

<PreferenceSetting storeKey="rlmm-bg-green" documentClassToToggle="green-bg">

Use greener background
</PreferenceSetting>

<PreferenceSetting storeKey="rlmm-accent-color" type="color" cssVariable="--vp-c-brand-1">

Accent color
</PreferenceSetting>

### Display

<PreferenceSetting storeKey="rlmm-hide-action">

Hide sidebar action button
</PreferenceSetting>

<PreferenceSetting storeKey="rlmm-home-hidesteam">

{{ homePage.frontmatter.hero.steam.enabled
    ? 'Hide new Steam maps on home page'
    : 'Show new Steam maps on home page'
}}
</PreferenceSetting>
</template>

<template #tab-notifications>

:::tip Workshop updates
[See all sources](https://swagbot.pages.dev/feeds) for getting notifications on new and updated workshop items
:::

### Inbox

<PreferenceSetting storeKey="rlmm-hide-navinbox">

Hide notification inbox
</PreferenceSetting>

### Push notifications

Get push notifications for map making updates

<VPButton
    text="Enable notifications"
    v-if="NotificationManager && !NotificationManager.permissions.granted"
    @click="NotificationManager.requestPermissions()"
/>
<div v-else-if="NotificationManager">
<VPButton
    text="Send test notification"
    theme="alt"
    v-if="NotificationManager.hasPermission"
    @click="NotificationManager.showNotification('Notification', {
        icon: '/icons/logo_rlmm_round_144.png',
        body: 'Your notifications are working'
    })"
/>

### Guide updates

<WatchSubscriptionManager
    :subscription="{}"
    :settings="{
        watchAll: { text: 'On any changed file', key: 'rlmm-push-all' },
        watchPages: {
            title: 'Watch individual pages',
            description: 'Get only a notification when one of the selected pages is updated',
            prefix: 'rlmm-page-',
        }
    }"
/>

</div>
</template>

<template #tab-guide>

### Launcher

<PreferenceSetting
    storeKey="rlmm-platform"
    defaultValue="Steam"
    :options="['Steam', 'Epic Games']"
    type="select"
>

Rocket League launcher
</PreferenceSetting>

### File paths

Change the file paths in the guide to your own setup configuration.

<PreferenceSetting storeKey="rlmm-path-udk" defaultValue="C:\UDK\RLMM\" type="input">

UDK Installation folder
</PreferenceSetting>

<PreferenceSetting storeKey="rlmm-path-rl" defaultValue="C:\Games\SteamApps\common\rocketleague\" type="input">

Rocket League installation folder
</PreferenceSetting>

</template>

<template #tab-advanced>

### Urls

<PreferenceSetting
    storeKey="rlmm-urls-steam"
    :defaultValue="false"
    type="switch"
>

Open Steam urls in the Windows app
</PreferenceSetting>

<PreferenceSetting
    storeKey="rlmm-urls-editcms"
    :defaultValue="false"
    type="switch"
>

Open `Edit this page` links in the CMS
</PreferenceSetting>

### Experimental

:::details Nightly builds
Feeling adventurous? Try out on of these experimental builds:

<ListWindow :groupByCategory="true" categoryKey="environment" dataUrl="https://docs.rocketleaguemapmaking.workers.dev/deployments">
    <template #default="{ item }">
        <VPLink :href="item.url" :noIcon="true">
            <ActionBlock>
                <template #left>
                    {{ item.branch }}@{{ item.id }}
                </template>
            </ActionBlock>
        </VPLink>
    </template>
</ListWindow>
:::

<PreferenceSetting storeKey="rlmm-use-editor" defaultValue="UDK" type="select" :options="['UDK']">

Unreal Engine version
</PreferenceSetting>

</template>

</TabsWindow>
