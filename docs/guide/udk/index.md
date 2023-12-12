# Guide

## Flowchart

<!--@include: ./flowchart/component.md -->

## Folder setup

- your maps folder: <PreferenceSetting :renderValue="true" storeKey="rlmm-path-udk" defaultValue="C:\UDK\RLMM\" type="input" />UDKGame\Content\Maps\
- your mods folder: <PreferenceSetting :renderValue="true" storeKey="rlmm-path-rl" defaultValue="C:\Games\SteamApps\common\rocketleague\" type="input" />TAGame\mods\

:::details List of removed nodes

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

## Search

<SearchBlock
    searchKey="name"
    :filters="[
        { type: 'select', itemKey: 'type', options: ['actions', 'conditions', 'events'] },
        { type: 'select', itemKey: 'Package', options: ['ProjectX', 'TAGame'] },
    ]"
>
<template #default="{ filter }">
<ListWindow
    dataUrl="https://kismet-cdn.ghostrider-05.com/assets?version=latest&tag=nodes_automated"
    idKey="Class"
    categoryKey="type"
    :groupByCategory="true"
    :filter="filter"
>
<template #default="{ item }">

:::details {{ item.name }}
<VPImage loading="lazy" :image="`https://kismet-cdn.ghostrider-05.com/images?name=${item.Class}`" />
Class: <VPLink :href="`https://github.com/ghostrider-05/RL-dummy-classes2/blob/main/Src/${item.Package}/Classes/${item.Class}.uc`">{{ item.Class }}</VPLink>
:::
</template>
</ListWindow>
</template>
</SearchBlock>

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
