import type { ThemeText } from "../text"

export interface BaseNotificationAction {
    /**
     * The text of the action button
     */
    text: string

    /**
     * The default theme of the action button
     * @default 'brand'
     */
    theme?: 'brand' | 'alt' | 'sponsor'

    /**
     * Add custom styles to the action button
     * @default {}
     */
    style?: object

    /**
     * The destination of the button.
     * For more complex handlers, use the onClicked in the theme configuration (available for some type of notifications).
     */
    href?: string

    /**
     * Whether to add an external link icon to the action button
     * @default false
     */
    externalLinkIcon?: boolean
}

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

    /**
     * Adds an action button to show more or activate outside of the notification
     */
    action?: BaseNotificationAction
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
