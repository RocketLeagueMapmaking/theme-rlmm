import type { ThemeText } from "../text"

export interface BaseNotification {
    /**
     * The unique id of the banner.
     * Used to store dismissed settings in the local storage.
     */
    id: string

    /**
     * The timestamp that this notification was created.
     * To change the time that this notification is active, use the {@link time} property.
     */
    created_at: number

    /** @deprecated use {@link text}.html instead */
    html?: string
    
    /**
     * The text to render inside the notification.
     * If a string is provided, the text will be rendered as markdown.
     * For raw HTML use the `html` property.
     */
    text: ThemeText
    
    /**
     * The color associated with this notification
     * @default 'var(--vp-c-brand-3)'
     */
    color?: string

    /**
     * Change the times this notification should be shown
     */
    time?: {

        /**
         * The epoch of the begin time
         */
        begin?: number

        /**
         * The epoch of the end time
         */
        end?: number
    }
}

export interface ThemeNotification extends BaseNotification {
    /**
     * The display title of the notification
     */
    title: string

    type?: string

    /**
     * Add tags / topics to this notification
     * @default []
     */
    tags?: string[]

    /**
     * Whether to show this notification in the nav inbox
     * @default false
     */
    inbox?: boolean

    /**
     * The text to show in the nav inbox.
     * Replaces {@link text} if used
     */
    inboxText?: ThemeText
}
