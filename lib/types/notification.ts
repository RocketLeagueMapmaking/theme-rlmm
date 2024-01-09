/**
 * Data for the notification banner at the top of the page
 */
export interface RLMMNotification {
    /**
     * The unique id of the banner.
     * Used to store dismissed settings in the local storage.
     */
    id: string

    /** @deprecated use {@link text}.html instead */
    html?: string

    /**
     * The text to render inside the banner.
     * If a string is provided, the text will be rendered as markdown.
     * For raw HTML use the `html` property.
     */
    text: string | { html: string }

    /**
     * The background color of the banner
     * @default 'var(--vp-c-brand-3)'
     */
    color?: string

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
