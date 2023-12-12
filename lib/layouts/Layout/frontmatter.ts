import type { SponsorData } from "../../types"

export function getHomeFrontmatter (fm: Record<string, any>) {
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
