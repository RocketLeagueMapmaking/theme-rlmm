import type { ThemeNotification } from './base'
import type { NavInboxOptions } from './inbox'

export * from './banner'
export * from './base'
export * from './inbox'

export interface ThemeNotificationOptions {
    /**
     * Show notifications in an inbox style
     */
    inbox?: NavInboxOptions

    data?: ThemeNotification[]
    dataUrl?: string
}
