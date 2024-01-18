import type { PageData, DefaultTheme } from 'vitepress'

import type {
    BannerNotification,
    BlockPosition,
    BlockRenderOptions,
    NavInboxOptions,
    NotFinishedOptions,
    ThemeNotification,
} from './theme/'

export interface RLMMThemeConfig extends DefaultTheme.Config {
    /**
     * Customize how the action button are displayed
     */
	sidebarAction?: {
        /**
         * The path to open when clicking on the button
         */
		path: string

		/**
         * The style of the button
		 * @default 'alt'
		 */
		buttonTheme?: 'brand' | 'alt'

        /**
         * The text on the action button
         */
		title: string

        /**
         * Where to place the action button on the sidebar 
         * @default 'top'
         */
        position?: 'top' | 'bottom'
	}

    /**
     * Options for displaying a banner at the top of the layout
     */
    banner?: {
        /**
         * Whether to show the banner on the current page
         * @param page The current page data
         */
        enabled?: (page: PageData) => boolean

        /**
         * The (default) banner background color
         * @default 'brand'
         */
        color?: string

        /**
         * The amount of days to wait before showing the notification again.
         * Set to negative number to never show banners again.
         * @default -1
         */
        cooldown?: number

        /**
         * 
         * @param id the id of the banner that is being dismissed
         */
        onDismissed?: (id: string) => void

        /**
         * The data of the notification banner to display
         */
        data?: BannerNotification

        /**
         * The url to fetch the notification.
         * When making a GET request a `BannerNotification` JSON response is expected.
         */
        dataUrl?: string
    }

    /**
     * Enhance a page with custom blocks placed at the top and/or bottom
     */
    blocks?: {
        /**
         * Enabled:
         * - false: no custom blocks
         * - true: all custom blocks
         * - 'top': only blocks at the top of the page
         * - 'bottom': only blocks at the bottom of the page
         */
        enabled?: boolean | BlockPosition

        /**
         * Blocks rendered on a page without setting the frontmatter on the page itself
         */
        default?:
            | Exclude<BlockRenderOptions, false>[]
            | ((page: PageData) => false | Exclude<BlockRenderOptions, false>[])

        /**
         * Adds custom blocks for related pages at the bottom
         * Controls whether to enable or not on all pages if configured in the frontmatter.
         */
        relatedPages?: boolean

        /**
         * Mark pages as not finished with a default banner at the top of the page.
         * Can be enabled on a page with the `finished: false` frontmatter.
         * Set to `false` to disable all not finished banners.
         * 
         * @default { type: 'warning', text: 'This page is not finished'}
         */
        notFinished?: NotFinishedOptions
    }

    notifications?: {
        /**
         * Show notifications in an inbox style
         */
        inbox?: NavInboxOptions

        data?: ThemeNotification[]
        dataUrl?: string
    }

    /**
     * Options for storing additional (theme) settings in local storage.
     */
    storage?: {
        /**
         * The local storage keys that is used by components and the theme
         * 
         * @default 
         * { 
         *     hideNotificationInbox: 'rlmm-hide-navinbox',
         *     hideSidebarAction: 'rlmm-hide-action',
         *     notificationInboxLastOpened: 'rlmm-navinbox-lastopened',
         *     useSteamProtocolUrl: 'rlmm-urls-steam',
         *     watchAllPages: 'rlmm-push-all'
         * }
         */
        keys?: Partial<
            Record<
                | 'useSteamProtocolUrl'
                | 'hideNotificationInbox'
                | 'hideSidebarAction'
                | 'notificationInboxLastOpened'
                | 'watchAllPages'
                , string
            >
        >

        // TODO: allow difference between themes
        /**
         * A set of CSS colors to apply on loading the page
         * @example { '--vp-c-bg': 'localstore-key' }
         */
        colorKeys?: Record<string, string>

        /**
         * Apply classes to the page based on local storage items
         * @example { 'green-bg': 'use-green-bg-setting' }
         */
        pageClasses?: Record<string, string>
    }
}

export type ThemeConfig = RLMMThemeConfig
