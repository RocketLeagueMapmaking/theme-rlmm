<script setup lang="ts">
import { type StyleValue } from 'vue';
import {
    VPTeamPage,
    VPTeamPageTitle,
    VPTeamPageSection,
    VPTeamMembers,
} from 'vitepress/theme'

withDefaults(defineProps<{
    frontmatterKey?: string
    /**
     * The index of the main team to showcase
     */
    index?: number
    /**
     * Additional styles for the component
     */
    style?: StyleValue
}>(), {
    frontmatterKey: 'teams',
    index: 0,
    style: () => ({ margin: '0px 0px 60px' }),
})
</script>

<template>
    <VPTeamPage :style="style" v-if="$frontmatter[frontmatterKey].length > 0">
        <VPTeamPageTitle>
            <template #title>
                {{ $frontmatter[frontmatterKey][index].title }}
            </template>
            <template #lead>
                {{ $frontmatter[frontmatterKey][index].lead }}
            </template>
        </VPTeamPageTitle>

        <VPTeamMembers
            :size="$frontmatter[frontmatterKey][index].size"
            :members="$frontmatter[frontmatterKey][index].members"
        />

        <VPTeamPageSection v-for="team in (<Record<string, never>[]>$frontmatter[frontmatterKey] || []).filter((_, i) => i !== index)" :key="team.title">
            <template #title>
                {{ team.title }}
            </template>
            <template #lead>
                {{ team.lead }}
            </template>
            <template #members>
                <VPTeamMembers :size="team.size" :members="team.members" />
            </template>
        </VPTeamPageSection>
    </VPTeamPage>
</template>