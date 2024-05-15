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

<TabsWindow :activeTabStyle="{ backgroundColor: 'var(--vp-c-bg-soft)' }" :tabs="['general', 'notifications', 'guide', 'advanced']" searchParam="tab">

<template #tab-general>

### Appearance

<PreferenceSetting :isAppearance="true" storeKey="">

Use dark theme
</PreferenceSetting>

<PreferenceSetting storeKey="rlmm-bg-green" documentClassToToggle="green-bg">

Use greener background
</PreferenceSetting>

<PreferenceSetting storeKey="rlmm-bg-legacy" documentClassToToggle="legacy-colors" :defaultValue="true">

Use old colors
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
    @click="NotificationManager.worker.value.showNotification('Test notification', {
        icon: '/icons/logo_rlmm_round_144.png',
        body: 'Your notifications are working'
    })"
/>

<PreferenceSetting storeKey="rlmm-push-inbox">

Inbox push notifications
</PreferenceSetting>

<PreferenceSetting storeKey="rlmm-push-events">

Events & contests notifications
</PreferenceSetting>

### Guide updates <Badge text="experimental" type="warning" />

Get a push notification when the map making guide is updated. You can choose to get a notification when any page is updated or when a selection of pages is updated.

<WatchSubscriptionManager
    :subscription="{
        subscribeUrl: 'https://docs.rocketleaguemapmaking.workers.dev/notifications/subscriptions',
        publicKey: 'BDzwCC5BWRxdvRMOlTg8mYv7EANfO0KHWpFGkfOccKPFRtl30p5xA9vIGfcuTgrDa1OSJeN9DBxzGI-ngk7e3-A',
    }"
    :storageKeys="{
        events: 'rlmm-push-events',
        inbox: 'rlmm-push-inbox',
    }"
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

<ActionBlock>
<slot name="left">
<p>Take new user experience tour</p>
</slot>
<slot name="right"><VPButton text="Start" /></slot>
</ActionBlock>

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

### Developer

<PreferenceSetting
    storeKey="rlmm-urls-editcms"
    :defaultValue="false"
    type="switch"
>

Show `Edit this page` links for the CMS
</PreferenceSetting>

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

### Experimental

<PreferenceSetting storeKey="rlmm-use-editor" defaultValue="UDK" type="select" :options="['UDK']">

Unreal Engine version
</PreferenceSetting>

</template>

</TabsWindow>
