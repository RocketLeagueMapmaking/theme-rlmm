import type { DefaultTheme } from 'vitepress'

import type {
    BannerOptions,
    NavItem,
    PageBlockOptions,
    SidebarActionOptions,
    StorageOptions,
    ThemeNotificationOptions,
} from './theme/'
import type { HomeOptions } from './theme/home'

import type { AnalyticsOptions } from '../util'

export type {
    AnalyticsOptions,
    HomeOptions,
}

export interface ThemeConfig extends DefaultTheme.Config {
    nav?: NavItem[]

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

    /**
     * Define options for the home page
     * @expiremental
     */
    home?: HomeOptions

    /**
     * Add notifications to display in an inbox or where you want with the notification list window.
     */
    notifications?: ThemeNotificationOptions

    /**
     * Options for storing additional (theme) settings in local storage.
     */
    storage?: StorageOptions
}

/** @deprecated */
export type RLMMThemeConfig = ThemeConfig
