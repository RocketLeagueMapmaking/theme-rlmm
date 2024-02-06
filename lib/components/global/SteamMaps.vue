<template>
    <Suspense v-if="enabled">
        <div class="container" ref="containerRef">
            <div class="steam-maps">
                <p class="steam-maps-title" v-if="title.length > 0" v-html="title">
                </p>
                <div class="steam-map" v-for="map, index in maps" :key="map.id">
                    <VPIconChevronLeft class="steam-maps-icon" v-if="showIcon(index, 'left')"
                        @click="goToNextMap(true, -1)" />
                    <div class="steam-map-active" v-if="index === active" @click="goToNextMap(true)">
                        <p class="steam-map-title">
                            {{ renderText(map.title, { maxLength: maxLengthTitle }) }}
                        </p>
                        <!-- Only show creator name on large screens -->
                        <span class="only-large">
                            By {{ renderText(map.creator.name, { maxLength: maxLengthUsername }) }}
                        </span>
                        <VPLink :href="itemPageUrl(map)" :noIcon="true">
                            <ImgWithPlaceholder :image="map.preview.url" />
                        </VPLink>
                        <!-- Only show actions on large screens -->
                        <div class="steam-map-active-actions only-large">
                            <VPButton theme="alt" text="View" :href="itemPageUrl(map)" />
                            <VPButton theme="alt" text="Download" v-if="downloadUrlTemplate" :href="itemDownloadUrl(map)" />
                            <VPButton theme="alt" v-for="action in addActions?.(map) ?? []" :key="action.link"
                                :text="action.text" :href="action.link" />
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
import { computed, defineComponent, h, onMounted, ref, withDefaults } from 'vue'
import { useImage } from '@vueuse/core'

import { VPIconChevronLeft, VPIconChevronRight, VPImage } from '../theme'

import { usePlatform, useStorage } from '../../composables/'
import { renderText } from '../../util'
import type { SteamMap } from '../../types'

type SteamMapIconType =
    | 'left'
    | 'right'

export interface Props {
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
    downloadUrlTemplate?: string | ((id: string) => string) | null
    maxLengthTitle?: number
    maxLengthUsername?: number
    handleException?: (err: unknown) => void
    addActions?: (map: SteamMap) => { text: string, link: string }[]
}

const active = ref(0), hasSetting = ref(false), containerRef = ref();
const maps = ref<SteamMap[]>([]);

const platform = usePlatform(), isWindows = computed(() => platform.value === 'Windows');
const storage = useStorage();

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
    addActions: () => [],
    downloadUrlTemplate: null,
    maxLengthTitle: 30,
    maxLengthUsername: 24,
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
    return typeof props.downloadUrlTemplate === 'string'
        ? props.downloadUrlTemplate.replace(':id', map.id)
        : props.downloadUrlTemplate?.(map.id)
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

const ImgWithPlaceholder = defineComponent<{ image: string }>({
    setup(props, ctx) {
        const use = useImage({ src: props.image })

        return () => use.isLoading.value ? h('div', {
            class: 'steam-map-img', style: {
                backgroundColor: 'var(--vp-c-bg)',
                height: '225px'
            }
        }) : h(VPImage, {
            class: 'steam-map-img',
            image: props.image,
        })
    },
})

onMounted(async () => {
    const key = storage.themeKeys.value.useSteamProtocolUrl
    hasSetting.value = storage.getAny(key, false)

    maps.value = await fetchSteamMaps(props)

    if (props.displayTime < 0) return
    setInterval(goToNextMap, props.displayTime)
})
</script>

<style>
/* If the component is added on the home page, hide the container that blocks interactions */
.VPHero:has(.steam-maps) .image-bg {
    display: none;
}

.VPHero .image:has(.steam-maps) {
    z-index: 5;
}

@media screen and (min-width: 960px) {
    .image-container:has(.steam-maps) {
        scale: 0.8;
        width: 200px;
    }
}

@media screen and (min-width: 1100px) {
    .image-container:has(.steam-maps) {
        scale: 1;
        width: initial;
    }
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

.steam-map-title {
    font-weight: bold;
    text-overflow: ellipsis;
    text-size-adjust: auto;
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
    height: 225px;
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
}

@media screen and (max-width: 640px) {
    :deep(.steam-map-img) {
        margin: 0px !important;
        height: 175px;
    }
}
</style>
