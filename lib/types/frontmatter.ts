import type { Props as SteamMapOptions } from '../components/global/SteamMaps.vue'
import type { Props as EventsOptions } from '../components/global/ItemGrid.vue'

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
     * Control whether to show the ask for feedback block is enabled.
     * Only shown when enabled in the theme configuration.
     * @default true
     */
    feedback?: boolean

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

    /**
     * Adds related pages to the current page
     * @default []
     */
    related?: string[]
}

export interface HomePageFrontmatter extends DefaultHomePageFrontmatter {
    hero?: 
        | Hero
        | (Omit<Hero, 'image'> & { steam: SteamMapOptions }),
    
    resourceTitle?: string
    resources?: Feature[]
    sponsors?: {
        message?: string
        actionText?: string
        actionLink: string
        data?: SponsorData
        dataUrl?: string
    }

    promotion?: PromotionOptions
    events?: EventsOptions
}
