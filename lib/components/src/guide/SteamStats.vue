<template>
    <div v-if="stats" class="steam-stats-container vp-doc">
        <div class="title">
            <p style="font-size: large;" v-html="title">
            </p>
            <img style="width: 200px" :src="image">
        </div>
        <div class="steam-stats">
            <div class="steam-stat" v-for="stat in Object.keys(stats)">
                <div class="text">
                    <Icon style="margin-right: 10px;" :icon="icons[stat]" v-if="icons?.[stat]" />
                    <p class="text">{{ stat[0].toUpperCase() + stat.slice(1) }}</p>
                </div>
                <p class="num">{{ formatNumber(stats[stat]) }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const stats = ref()

const props = withDefaults(defineProps<{
    title?: string
    joinChar?: string
    icons?: Record<string, string>
    image?: string
    background?: string
}>(), {
    joinChar: '.',
    title: 'By the numbers: <span style="color: var(--vp-c-brand-1);">Steam workshop</span>',
    image: 'https://community.cloudflare.steamstatic.com/public/shared/images/apphubs/bg_workshop_piston.png',
    background: 'https://community.cloudflare.steamstatic.com/public/shared/images/apphubs/bg_workshop_header.png?v=3',
})

onMounted(async () => {
    const dataUrl = 'https://docs.rocketleaguemapmaking.workers.dev/steam/statistics'

    stats.value = await fetch(dataUrl)
        .then(res => res.json())
        .catch(() => null)
})

function formatNumber (num: number) {
    const items = num.toString().split('')
    const output: string[] = []

    for (let i = items.length - 1; i >= 0; i -= 3) {
        output.push([
            items[i - 2],
            items[i - 1],
            items[i],
        ].join(''))
    }

    return output.reverse().join(props.joinChar)
}

function toUrl (url?: string) {
    return url ? `url(${url})` : undefined
}
</script>

<style scoped>
.steam-stats-container {
    background-color: var(--vp-c-bg-soft);
    border-radius: 6px;
    margin: 100px auto;
    margin-bottom: -100px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: space-around;
    max-width: 1152px;
    padding: 16px 40px;
    background-image: v-bind(toUrl(background));
    background-repeat: no-repeat;
    background-size: cover;
    background-blend-mode: screen;
    background-position: top;
}

html:not(.dark) .steam-stats-container {
    background-color: var(--vp-c-black);
}

html:not(.dark) .steam-stats-container p {
    color: var(--vp-c-gray-1) !important;
}

.steam-stats-container .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
}

.steam-stats {
    max-width: 90vw !important;
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
}

.text {
    color: var(--vp-c-text-2);
    margin: 0;
    display: flex;
    align-items: center;
}

.num {
    margin: 0;
    font-size: larger;
    font-weight: bolder;
}

@media screen and (max-width: 640px) {
    .steam-stats-container {
        background-blend-mode: soft-light;
        margin: 100px 20px -100px 20px;
    }

    .steam-stats {
        flex-direction: column;
        align-items: flex-start;
    }

    .title img {
        display: none;
    }
}
</style>