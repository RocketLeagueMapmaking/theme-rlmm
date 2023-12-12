import type { PageData, DefaultTheme } from 'vitepress'
import type { RLMMNotification } from './notification'

export type SponsorData = {
    tier: string
    items: {
        name: string
        img: string
        url: string
    }[]
}[]

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
         * @default 'Edit preferences'
         */
		title?: string

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
        data?: RLMMNotification

        /**
         * The url to fetch the notification.
         * When making a GET request a `RLMMNotification` JSON response is expected.
         */
        dataUrl?: string
    }
}
