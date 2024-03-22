import type { PageData } from "vitepress"

import type { BaseNotification } from "./base"

/**
 * Data for the notification banner at the top of the page
 */
export interface BannerNotification extends BaseNotification {
    /**
     * Whether this banner can be dismissed by the user
     * @default true
     */
    dismissable?: boolean

    /**
     * The amount of days to wait before showing this banner again.
     * Set to a negative number to disable forever once dismissed.
     * @default -1
     */
    cooldown?: number
}

export interface BannerOptions {
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
     * Hook that gets called when a user presses the banner action button
     * @param id the id of the banner that is being clicked
     */
    onClicked?: (id: string) => void

    /**
     * Hook that gets called when a user dismisses a banner
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

    /**
     * The label for the dismiss / close button
     * @default 'Dismiss banner'
     */
    dismissButtonLabel?: string
}
