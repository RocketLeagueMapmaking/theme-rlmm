import type { ThemeText } from "../text"

export type NavInboxIcon =
    | string
    | { icon?: string, color?: string, hoverColor?: string }

export interface NavInboxOptions {
    /**
     * The amount of notifications to show in the inbox
     */
    amount: number

    /**
     * Where, relative to the nav links, to place the inbox
     * @default 'after'
     */
    position?: 'before' | 'after'

    /**
     * The (unread) icon to show in the navbar
     * @default { read: 'carbon:notification-filled', unread: 'carbon:notification-new' }
     */
    icon?: {
        unread?: NavInboxIcon | false
        read?: NavInboxIcon
    }

    /**
     * Have a text at the bottom of the inbox
     * @default undefined
     */
    bottomText?: ThemeText

    /**
     * The text to show when no notifications are present
     * @default 'No notifications to read...'
     */
    emptyText?: ThemeText
}
