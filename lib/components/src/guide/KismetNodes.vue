<template>
    <SearchBlock searchKey="name" :filters="[
        { type: 'select', itemKey: 'type', options: ['actions', 'conditions', 'events'] },
        { type: 'select', itemKey: 'Package', options: ['ProjectX', 'TAGame'] },
    ]">
        <template #default="{ filter }">
            <ListWindow dataUrl="https://kismet-cdn.ghostrider-05.com/assets?version=latest&tag=nodes_automated"
                idKey="Class" categoryKey="type" :groupByCategory="true" :filter="filter">
                <template #default="{ item }">
                    <details class="details custom-block">
                        <summary>{{ item.name }}</summary>
                        <VPImage loading="lazy" :image="`https://kismet-cdn.ghostrider-05.com/images?name=${item.Class}`" />
                        Class: <VPLink
                            :href="`https://github.com/ghostrider-05/RL-dummy-classes2/blob/main/Src/${item.Package}/Classes/${item.Class}.uc`">
                            {{ item.Class }}</VPLink>
                    </details>
                </template>
            </ListWindow>
        </template>
    </SearchBlock>
</template>

<script setup lang="ts">
import ListWindow from '../list/ListView.vue'
import SearchBlock from '../list/SearchBlock.vue'
</script>
