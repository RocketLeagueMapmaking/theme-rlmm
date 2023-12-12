---
aside: false
---

# Preferences

<script setup>
import { useNotifications } from '../../lib/'

const NotificationManager = useNotifications()
</script>

<TabsWindow :tabs="['general', 'notifications', 'guide', 'advanced']">

<template #tab-general>

### Appearance

<PreferenceSetting :isAppearance="true" storeKey="">

Use dark theme
</PreferenceSetting>

### Display

<PreferenceSetting storeKey="rlmm-hide-action">

Hide `Edit preferences` action
</PreferenceSetting>

<PreferenceSetting storeKey="rlmm-show-sidemenu">

Show advanced pages in sidemenu
</PreferenceSetting>
<PreferenceSetting storeKey="rlmm-left-toc">

Move TOC back to left sidemenu
</PreferenceSetting>
</template>

<template #tab-notifications>

### Push notifications

Get push notifications when the guide is updated

:::tip Workshop updates
[See all sources](https://swagbot.pages.dev/feeds) for getting notifications on new and updated workshop items
:::

<VPButton
    text="Enable notifications"
    v-if="!NotificationManager.hasPermission"
    @click="NotificationManager.requestPermissions()"
/>
<div v-else>
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

<PreferenceSetting storeKey="rlmm-push-all">

On any changed file
</PreferenceSetting>

:::details Watch individual pages

Get only a notification when one of the selected pages is updated

<PreferenceSetting
    :storeKey="`rlmm-page-${page.replace(/\//g, '_').replace('.md', '')}`"
    v-for="page in $frontmatter.pages"
    :key="page"
    type="switch"
>

/{{ page.replace('index.md', '').replace('.md', '') }}
</PreferenceSetting>
:::

<VPButton
    text="Update watched pages"
    v-if="NotificationManager.hasPermission"
    @click="console.log(NotificationManager.getWatchedPages())"
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

### Experimental

<PreferenceSetting
    storeKey="rlmm-dev-build"
    defaultValue="stable"
    :options="['stable', 'dev', 'nightly']"
    type="select"
>

Documentation build
</PreferenceSetting>

<PreferenceSetting storeKey="rlmm-use-editor" defaultValue="UDK" type="select" :options="['UDK']">

Unreal Engine version
</PreferenceSetting>

</template>

</TabsWindow>
