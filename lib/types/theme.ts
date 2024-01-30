import type { DefaultTheme } from 'vitepress'

import type {
    BannerOptions,
    PageBlockOptions,
    SidebarActionOptions,
    StorageOptions,
    ThemeNotificationOptions,
    ThemeText,
} from './theme/'

import type { AnalyticsOptions } from '../util'

export interface ThemeConfig extends DefaultTheme.Config {
    /**
     * Send metric requests to your server after the path has been updated
     */
    analytics?: AnalyticsOptions

    /**
     * Customize how the action button are displayed
     */
	sidebarAction?: SidebarActionOptions

    /**
     * Options for displaying a banner at the top of the layout
     */
    banner?: BannerOptions

    /**
     * Enhance a page with custom blocks placed at the top and/or bottom
     */
    blocks?: PageBlockOptions

    home?: {
        offlineText?: ThemeText
    }

    /**
     * 
     */
    notifications?: ThemeNotificationOptions

    /**
     * Options for storing additional (theme) settings in local storage.
     */
    storage?: StorageOptions
}

/** @deprecated */
export type RLMMThemeConfig = ThemeConfig
