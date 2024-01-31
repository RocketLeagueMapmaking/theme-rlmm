import type { Props as SteamMapOptions } from '../components/global/SteamMaps.vue'
import type { Props as EventsOptions } from '../components/global/EventShowcase.vue'

import type { PromotionOptions } from '../layouts/Layout/sections/promotion'

import type {
    BlockRenderOptions,
    SponsorData,
} from './theme/'

import type {
    DefaultHomePageFrontmatter,
    DefaultNormalPageFrontmatter,
    Feature,
    Hero,
} from './theme/home'

export interface NormalPageFrontmatter extends DefaultNormalPageFrontmatter {
    /**
     * Mark the page as not finished with a banner at the top of the page
     * @default true
     */
    finished?: boolean

    /**
     * Add highlighted containers to the current page
     * @default []
     */
    blocks?: BlockRenderOptions
}

export interface HomePageFrontmatter extends DefaultHomePageFrontmatter {
    hero?: 
        | Hero
        | (Omit<Hero, 'image'> & { steam: SteamMapOptions }),
    
    resourceTitle?: string
    resources?: Feature[]
    sponsors?: {
        message?: string
        action?: string
        link: string
        data?: SponsorData
        dataUrl?: string
    }

    promotion?: PromotionOptions
    events?: EventsOptions
}
