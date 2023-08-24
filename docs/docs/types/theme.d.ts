interface LinkData {
    text: string
    link: string
}

type NameLinkData = Omit<LinkData, 'text'> & { name: string; tooltip?: string }

interface IconLinkData extends LinkData {
    icon: string
}

interface ButtonData extends LinkData {
    primary?: boolean
}

interface ActionLinkData extends LinkData {
    external?: boolean
    type?: string
    banner?: boolean
}

interface Notification {
    // An unique key for dismisseable notifications
    storageKey: string
    message: string
    // On small pages, show this message instead
    shortMessage?: string
    // Only show the notification after this epoch timestamp
    startDate?: number
    // Only show the notification before this epoch timestamp
    endDate?: number
    // Show it only once, will not reappear after dismissed
    once?: boolean
    // Allow the user to remove the notification. Will not reappear if `once` is set
    dismisseable?: boolean
    // Only show it on a page that is on of these page slugs
    pages?: string[]
    // Assign a priority to this notification when multiple notifications are present. The highest gets shown first
    // Default: 0
    priority?: number
    // The background color for the notification
    color?: string
    // The text color for the notification
    textColor?: string
}

interface notFoundSettings {
    background?: string

    showSuggestedPages?: boolean
    autoSuggestPages?: boolean
    report?: boolean

    suggestedPages?: LinkData[]
    quotes?: string[]
}

interface SiteSettingsOptions {
    enabled?: boolean
    icon?: string
    tooltip?: string
    disabledOptions?: ('sidemenu' | 'tooltips')[]
    page?: {
        sideMenu?: {
            enabled?: boolean
            toc?: {
                title?: string
                /** defaults to $themeConfig.sidebarDepth  */
                depth?: number
            }
        }
    }
}

interface NavbarOptions {
    title?: string
    icons?: NameLinkData[]
    notifications?: Notification[]
    notificationsUrl?: string
    settings?: SiteSettingsOptions
}

interface ThemeOptions {
    notFoundSettings?: notFoundSettings
    notFinished?: {
        message?: string
        hidePage?: boolean
    }
    navbar?: NavbarOptions
    related?: {
        title?: string
        amount?: number
        pages?: {
            prefix: string
            icon?: string
            description?: string
        }[]
    }
}