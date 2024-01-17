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
