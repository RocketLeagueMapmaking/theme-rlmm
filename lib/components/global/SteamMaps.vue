<template>
    <Suspense v-if="enabled">
        <div class="container">
            <div class="steam-maps">
                <p class="steam-maps-title" v-if="title.length > 0" v-html="title">
                </p>
                <div class="steam-map" v-for="map, index in maps" :key="map.id">
                    <VPIconChevronLeft class="steam-maps-icon" v-if="showIcon(index, 'left')"
                        @click="goToNextMap(true, -1)" />
                    <div class="steam-map-active" v-if="index === active" @click="goToNextMap(true)">
                        <p :style="{ fontWeight: 'bold' }">
                            {{ map.title }}
                        </p>
                        <!-- Only show creator name on large screens -->
                        <span class="only-large">
                            By {{ map.creator.name }}
                        </span>
                        <VPLink :href="itemPageUrl(map)" :noIcon="true">
                            <!-- TODO: Try to prevent the flash on image loading -->
                            <div v-if="!loadedImgs[map.id]" class="steam-map-img" :style="{
                                backgroundColor: 'var(--vp-c-bg)',
                                height: '225px'
                            }">
                            </div>
                            <VPImage v-on:load="() => loadedImgs[map.id] = true" class="steam-map-img"
                                :image="map.preview.url" :title="map.title" :alt="map.title" />
                        </VPLink>
                        <!-- Only show actions on large screens -->
                        <div class="steam-map-active-actions only-large">
                            <VPButton theme="alt" text="View" :href="itemPageUrl(map)" />
                            <VPButton theme="alt" text="Download" :href="itemDownloadUrl(map)" />
                        </div>
                    </div>
                    <VPIconChevronRight class="steam-maps-icon" v-if="showIcon(index, 'right')"
                        @click="goToNextMap(true)" />
                </div>
            </div>
        </div>

        <template #fallback>
            <slot name="fallback">Loading...</slot>
        </template>
    </Suspense>
</template>

<script setup lang="ts">
import { onMounted, ref, withDefaults } from 'vue'

import { VPIconChevronLeft, VPIconChevronRight } from '../theme'

import { getPlatform, useStorage } from '../../data/'
import type { SteamMap } from '../../types'

type SteamMapIconType =
    | 'left'
    | 'right'

interface Props {
    amount?: number
    title?: string
    sortBy?: 'created' | 'updated'
    urlProtocol?:
    | 'setting'
    | 'setting-windows'
    | 'app'
    | 'app-windows'
    | 'browser'
    displayTime?: number
    disableClick?: boolean
    enabled?: boolean
    iconsEnabled?:
    | boolean
    | Record<SteamMapIconType, boolean>
    handleException?: (err: unknown) => void
}

const active = ref(0), isWindows = ref(false), hasSetting = ref(false);
const maps = ref<SteamMap[]>([]);
const loadedImgs = ref<Record<string, true>>({})

const props = withDefaults(defineProps<Props>(), {
    amount: 3,
    title: 'New workshop maps',
    sortBy: 'created',
    urlProtocol: 'setting-windows',
    enabled: true,
    iconsEnabled: true,
    disableClick: false,
    displayTime: 10_000,
    handleException: console.error,
})

function itemPageUrl(map: SteamMap) {
    const { id } = map
    const url = `https://steamcommunity.com/sharedfiles/filedetails/?id=${id}`
    const appUrl = `steam://url/CommunityFilePage/${id}`

    switch (props.urlProtocol) {
        case 'setting-windows':
            return hasSetting.value && isWindows.value ? appUrl : url
        case 'setting':
            return hasSetting.value ? appUrl : url
        case 'app-windows':
            return isWindows.value ? appUrl : url
        case 'app':
            return appUrl
        case 'browser':
        // Handle invalid options
        default:
            return url
    }
}

function itemDownloadUrl(map: SteamMap) {
    return ''
}

async function fetchSteamMaps(options: Required<Props>) {
    const { amount, handleException, sortBy } = options
    const url = `https://ghostrider-05.com/workshop/raw/recent?amount=${amount}&time_key=${sortBy}`

    const response = await fetch(url)
        .then(res => res.json() as Promise<SteamMap[]>)
        .catch(err => {
            handleException(err)
            return null
        })

    if (!response || response.length === 0) {
        handleException('No steam maps found')
        return [];
    } else {
        return response
    }
}

function showIcon(index: number, type: SteamMapIconType) {
    const enabled = typeof props.iconsEnabled === 'boolean'
        ? props.iconsEnabled
        : props.iconsEnabled[type]

    return index === active.value
        && enabled
        && maps.value.length > 1
}

/**
 * Change the active index to move to a new map
 * @param isClick Whether the change is caused by clicking (can also be the timer)
 * @param [dIndex=1] Control the step size. Use a negative value to go back
 */
function goToNextMap(isClick?: boolean, dIndex = 1) {
    if (maps.value.length < 2) return
    if (isClick && props.disableClick) return

    if (dIndex > 0)
        active.value = (active.value + dIndex >= maps.value.length) ? 0 : (active.value + dIndex)
    else if (dIndex < 0)
        active.value = ((active.value + dIndex) < 0) ? (maps.value.length + dIndex) : active.value + dIndex
}

onMounted(async () => {
    const storage = useStorage();
    const key = storage.getThemeKeys().value.useSteamProtocolUrl

    isWindows.value = getPlatform() === 'Windows'
    hasSetting.value = storage.getAny(key, false)

    maps.value = await fetchSteamMaps(props)

    if (props.displayTime < 0) return
    setInterval(goToNextMap, props.displayTime)
})
</script>

<style>
/* If the component is added on the home page, hide the container that blocks interactions */
.image-bg {
    display: none;
}
</style>

<style scoped>
.steam-maps-title {
    font-weight: bold;
    font-size: larger;
    margin: 30px 30px 10px 30px;
}

.steam-maps-title :deep(span) {
    color: var(--vp-c-brand-1);
}

.steam-maps-icon {
    fill: var(--vp-c-neutral);
    min-width: 30px;
}

.steam-map {
    display: flex;
    justify-content: center;
}

.steam-map-active:hover,
.steam-maps-icon:hover,
.VPImage:hover {
    cursor: pointer;
}

/* Use :deep selector on VPImage to target the img child in the component */
:deep(.steam-map-img) {
    border-radius: 8px;
    width: 400px !important;
    max-height: 225px;
    max-width: 75vw !important;
    margin: 10px 0px;
}

.steam-map-active {
    background-color: var(--vp-c-bg-soft);
    border-radius: 8px;
    padding: 20px;
    min-width: fit-content;
    width: fit-content;
    text-align: left;
    display: flex;
    flex-direction: column;
}

.steam-map-active-actions {
    flex-direction: row;
}

.steam-map-active-actions>* {
    width: 'fit-content'
}

.steam-map-active-actions> :not(:last-child) {
    margin-right: 10px;
}

@media screen and (max-width: 960px) {
    .only-large {
        display: none;
    }

    .steam-map-active {
        padding: 6px !important;
        text-align: center !important;
    }

    :deep(.steam-map-img) {
        margin: 0px !important;
    }
}
</style>
