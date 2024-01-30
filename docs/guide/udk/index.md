---
blocks:
    - text: Want to read more about {UDK topic}? Learn more about [A](./) or [B](./)
      type: tip
      position: bottom
related:
    - /udk/reference
    - /blender/
    - /faq/
---

# Guide

## Flowchart

<!--@include: ./flowchart/component.md -->

## Folder setup

- your maps folder: <PreferenceSetting :renderValue="true" storeKey="rlmm-path-udk" defaultValue="C:\UDK\RLMM\" type="input" />UDKGame\Content\Maps\
- your mods folder: <PreferenceSetting :renderValue="true" storeKey="rlmm-path-rl" defaultValue="C:\Games\SteamApps\common\rocketleague\" type="input" />TAGame\mods\

:::details List of removed nodes

<script setup>
import { ListWindow } from '../../../lib/'
</script>

<ListWindow
    dataUrl="https://raw.githubusercontent.com/ghostrider-05/RL-dummy-classes2/main/ci/changelog/kismet.json"
    dataKey="deleted"
    :sort="{ key: 1 }"
>
<template #default="{ item }">
    - {{ item[1].replace('.uc', '') }}
</template>
</ListWindow>
:::

## Publishing

Publishing a Rocket League custom map to the Steam workshop works different if you own the game on Steam or not.

<TabsWindow :tabs="['Steam', 'Epic Games']" :storage="{ key: 'rlmm-platform' }">

<template #tab-steam>
Use SteamCMD
</template>

<template #tab-epic_games>
Use the RLMM account
</template>

</TabsWindow>
