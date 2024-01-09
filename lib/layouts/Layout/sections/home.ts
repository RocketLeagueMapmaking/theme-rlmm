import { h, type VNode } from 'vue'

import { VPHomeSponsors } from 'vitepress/theme'

import { fetchComponentData } from '../../../data'

import EventShowcase from '../../../components/global/EventShowcase.vue'
import SteamMaps from '../../../components/global/SteamMaps.vue'
import { VPFeatures } from '../../../components/export'

import { renderPromotion } from './promotion'

import type { SponsorData } from "../../../types"

function getHomeFrontmatter (fm: Record<string, any>) {
    if (fm.layout !== 'home') return undefined
	return {
		sponsors: {
            enabled: fm.sponsors != undefined,
			message: fm.sponsors?.title ?? 'Patreons',
			actionText: fm.sponsors?.action ?? 'Become a supporter',
			actionLink: fm.sponsors?.link,
			data: fm.sponsors?.data ?? [] as SponsorData,
            dataUrl: fm.sponsors?.dataUrl,
		},
        events: {
            enabled: fm.events?.title && fm.events?.description,
            ...(fm.events ?? {}),
        },
		resources: {
            enabled: fm.resources != undefined,
			title: fm.resourceTitle ?? 'Resources',
			resources: fm.resources,
		},
		steam: {
			enabled: fm.hero?.steam != undefined && (fm.hero?.steam?.enabled === false ? false : true),
			...(fm.hero?.steam ?? {}),
		},
	}
}

const renderIf = (
    condition: boolean | undefined,
    node: VNode | (() => VNode)
) => condition ? (typeof node === 'function' ? node() : node) : undefined

// TODO: move to seperate home component later?
export async function renderHomePageSections (
    frontmatter: Record<string, any>,
): Promise<Record<string, () => VNode> | undefined> {
    const data = getHomeFrontmatter(frontmatter ?? {})
    if (!data) return undefined

    const events = data.events.enabled ? await fetchComponentData(data.events, []) : []
    const sponsors = data.sponsors.enabled ? await fetchComponentData(data.sponsors, []) : []

    const children = [
        renderIf(data?.resources.enabled, () => h('div', { class: 'home-resources' }, [h('p', data.resources.title)])),
        renderIf(data?.resources.enabled, () => h(VPFeatures, { features: data.resources.resources })),
        renderIf(data?.events.enabled, () => h(EventShowcase, events)),
        renderIf(frontmatter?.promotion != undefined, () => renderPromotion(frontmatter.promotion)),
        // @ts-ignore
        renderIf(data?.sponsors.enabled, () => h(VPHomeSponsors, sponsors)),
    ].filter((child): child is NonNullable<typeof child> => child != undefined)
    
    return {
        'home-hero-image': () => renderIf(data?.steam.enabled, () => h(SteamMaps, data.steam)),
        'home-features-after': () => h('div', children),
    } as Record<string, () => VNode>
}
