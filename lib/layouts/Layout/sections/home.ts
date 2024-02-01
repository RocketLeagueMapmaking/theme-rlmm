import { h, type VNode } from 'vue'
import { VPHomeSponsors } from 'vitepress/theme'

import { useStorage } from '../../../composables'
import { fetchComponentData, renderIf } from '../../../util'

import EventShowcase from '../../../components/global/ItemGrid.vue'
import SteamMaps from '../../../components/global/SteamMaps.vue'
import { VPFeatures } from '../../../components/export'

import { renderPromotion } from './promotion'

import type {
    HomePageFrontmatter,
} from "../../../types"

function getHomeFrontmatter (fm: Record<string, any>) {
    const isHomeFm = (fm: Record<string, any>): fm is HomePageFrontmatter => fm.layout === 'home'

    if (!isHomeFm(fm)) return undefined
    else return fm
}

// TODO: move to seperate home component later?
export async function renderHomePageSections (
    frontmatter: Record<string, any>,
): Promise<Record<string, (() => VNode) | undefined> | undefined> {
    const data = getHomeFrontmatter(frontmatter ?? {})
    if (!data) return undefined

    const events = data.events ? await fetchComponentData(data.events, []) : []
    const sponsors = data.sponsors ? await fetchComponentData(data.sponsors, []) : []

    const children = [
        renderIf(data.resources, () => {
            return h(
                'div',
                { class: 'home-resources' },
                [h('p', data.resourceTitle ?? 'Resources')]
            )
        }),
        renderIf(data.resources, () => h(VPFeatures, { features: data.resources ?? [] })),
        // @ts-ignore
        renderIf(data.events, () => h(EventShowcase, events)),
        renderIf(data.promotion, () => renderPromotion(data.promotion!)),
        // @ts-ignore
        renderIf(data.sponsors, () => h(VPHomeSponsors, sponsors)),
    ].filter((child): child is NonNullable<typeof child> => child != undefined)

    const storage = useStorage()
    const hideSteamSetting = storage.useKey('rlmm-home-hidesteam', null).value === 'true'
    const steamOptions = data.hero && 'steam' in data.hero ? data.hero.steam : undefined

    return {
        'home-hero-image': !hideSteamSetting && steamOptions && steamOptions.enabled !== false
            ? () => renderIf(steamOptions, () => h(SteamMaps, steamOptions))
            : undefined,
        'home-features-after': () => h('div', children),
    } as Record<string, undefined | (() => VNode)>
}
