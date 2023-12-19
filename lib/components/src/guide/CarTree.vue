<template>
    <SearchBlock searchKey="name">
        <template #default="{ search }">
            <TreeWindow :search="search"
                dataUrl="https://kismet-cdn.ghostrider-05.com/assets?tag=compact_tree&version=latest" dataKey="classes"
                idKey="name" childrenKey="variables" idChildKey="type" parentListKey="parents" nameChildKey="name"
                isParentKey="is_parent" :transformLoadedItem="transformItem">
                <template #header="{ metadata }">
                    <p>This reference list is using the game version:
                    <Badge :text="'Version v' + getVersion(metadata)" type="warning" />
                    </p>
                </template>
                <template #item-name="{ item }">
                    {{ item.name }}
                    <Badge text="Replicated" v-if="item.replicated" />
                </template>
                <template #item-details="{ item, parents }">
                    <span style="font-style: italic;" v-if="item.description">{{ item.description }}<br></span>
                    <!-- Item type -->
                    Type: <code v-if="!item.is_parent">{{ item.type }}</code>
                    <VPLink v-else
                        :href="`https://github.com/ghostrider-05/rl-dummy-classes2/tree/main/Src/${item.parent.pkg}/Classes/${item.type}.uc`">
                        <code>{{ item.type }}</code>
                    </VPLink>
                    <!-- Item default value -->
                    <span v-if="item.defaultValue"><br>Default value: <code>{{ item.defaultValue }}</code></span>
                    <!-- Item parent -->
                    <br>Property of: <VPLink
                        :href="`https://github.com/ghostrider-05/rl-dummy-classes2/tree/main/Src/${item.parent.pkg}/Classes/${item.parent.id}.uc`">
                        <code>{{ item.parent.pkg }}.{{ item.parent.id }}</code>
                    </VPLink>
                    <!-- Category -->
                    <span v-if="item.category">Editor:
                        <code>{{ item.category.length === 0 ? 'true' : `(${item.category})` }}</code></span>

                    <div class="item-actions" v-if="isSupported">
                        <VPButton text="Copy kismet" theme="alt" @click="copyKismet(item, parents)" />
                        <VPButton text="Copy path" theme="alt" @click="copyPath(item, parents)" />
                    </div>
                    <div v-else>
                        <p>Your browser does not support the clipboard API</p>
                    </div>
                </template>
            </TreeWindow>
        </template>
    </SearchBlock>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

import TreeWindow from '../tree/TreeView.vue'
import SearchBlock from '../list/SearchBlock.vue'

interface Data {
    metadata: {
        version: string
        depth: number
    }
    item: Record<string, any>
}

function transformItem(item: Data['item']) {
    return {
        ...item,
        variables: item.variables.map(child => ({
            ...child,
            pkg: item.Package,
            parent: { id: item.name, pkg: item.Package },
        }))
    }
}

const getVersion = (data: unknown) => (data as Data['metadata']).version


const { isSupported, copy } = useClipboard()

async function copyPath(item: Record<string, string>, parents: string[]) {
    const path = ['player'].concat(parents.concat(item.name)).join('.')
    await copy(path)
}

async function copyKismet(item: Record<string, string>, parents: string[]) {
    const path = ['player'].concat(parents.concat(item.name)).join('.')

    const url = `https://kismet.ghostrider.workers.dev/?type=${item.type || 'object'}&path=${path}`

    await fetch(url)
        .then(res => res.text())
        .then(kismet => copy(kismet))
}
</script>

<style scoped>
.item-actions {
    padding-top: 20px;
}

.item-actions>*:not(:first-child) {
    margin-left: 10px;
}
</style>