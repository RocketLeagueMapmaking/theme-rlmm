import { StyleValue } from "vue"
import type { ThemeText } from "../text"

export type NavInboxIcon =
    | string
    | { icon?: string, color?: string, hoverColor?: string }

export type NavStateOption<Value> = Value | Partial<Record<'unread' | 'read', Value>>

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
     * @deprecated use nav.icon instead
     */
    icon?: {
        unread?: NavInboxIcon | false
        read?: NavInboxIcon
    }

    nav?: {
        /**
         * Add text (for unread or read notifications) to the navbar
         */
        text?: NavStateOption<ThemeText>

        /**
         * Overwrite the styles of the navbar inbox.
         * Can be used to add unread icons, etc.
         */
        style?: NavStateOption<StyleValue | ((total: number, unread: number) => StyleValue)>

        /**
         * The (unread) icon to show in the navbar
         * @default { read: 'carbon:notification-filled', unread: 'carbon:notification-new' }
         */
        icon?: {
            unread?: NavInboxIcon | false
            read?: NavInboxIcon
        }
    }

    /**
     * Whether to render the notification action button
     * @default false
     */
    renderAction?: boolean

    /**
     * Whether to render the created time of the notification in the inbox.
     * Can also be a custom render function which takes the notification timestamp and returns the formatted string.
     * @default false
     */
    renderTime?: boolean | ((timestamp: number) => string)

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

    /**
     * Hook that gets called when a notification action button is being clicked
     * @param id the id of the notification being clicked
     */
    onClicked?: (id: string) => void

    /**
     * Hook that gets called when the inbox gets opened
     */
    onOpened?: () => void
}
