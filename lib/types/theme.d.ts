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

interface SiteNotification {
    /**
     * An unique key for dismisseable notifications
     */
    storageKey: string
    message: string
    /**
     * On small pages, show this message instead
     * @default the message of this notification
     */
    shortMessage?: string
    /**
     * Only show the notification after this epoch timestamp
     * @default -1
     */
    startDate?: number
    /**
     * Only show the notification before this epoch timestamp
     * @default -1
     */
    endDate?: number
    /**
     * Show it only once, will not reappear after dismissed
     */
    once?: boolean
    /**
     * Allow the user to remove the notification. Will not reappear if `once` is set
     */
    dismisseable?: boolean
    /**
     * Only show it on a page that is on of these page slugs
     * @default []
     */
    pages?: string[]
    /**
     * Assign a priority to this notification when multiple notifications are present. The highest gets shown first
     * @default 0
     */
    priority?: number
    /*
     * The background color for the notification
     */
    color?: string
    /**
     * The text color for the notification
     */
    textColor?: string
    /**
     * Show the notification in an inbox type component
     * @default false
     */
    inbox?: boolean
}

interface notFinishedSettings {

    /**
     * The message to display in the banner
     * default 'This page is not finished yet, check back later or contribute to this page!'
     */
    message?: string

    /**
     * Whether to hide pages in the navbar and sidebar that are marked as not finished.
     * @default false
     */
    hidePage?: boolean
}

interface notFoundSettings {
    background?: string

    showSuggestedPages?: boolean
    autoSuggestPages?: boolean
    report?: boolean

    suggestedPages?: LinkData[]
    quotes?: string[]
}

interface SettingsToggle {
    /**
     * The unique id for this toggle
     * Used for {@link SiteSettingsOptions.disabledToggles}
     */
    id: string

    /**
     * The id for storing this value in local storage
     */
    storageId: string

    /**
     * The JavaScript 
     */
    key: string

    /**
     * Text displayed in the menu
     */
    text: string

    /**
     * With tooltips enabled, show this text on hover
     */
    tooltip: string

    /**
     * Invert the displayed value.
     * Used for displayed `Use this`, while in code referencing it as disable..
     * @default false
     */
    invert?: boolean

    /**
     * Only enable this toggle when the window is larger than this size
     * @default -1
     */
    minWidth?: number
}

interface SiteSettingsOptions {
    /**
     * Whether to show site settings.
     * When disabled, also hides the options for theme, tooltips and layout.
     * @default true
     */
    enabled?: boolean

    /**
     * Overwrite the settings menu to only behave as a light / dark mode switch
     * Setting this will cause all other settings options to be ignored!
     * @default false
     */
    overwriteThemeSwitcher?: boolean

    /**
     * The settings icon name
     * @default 'fa-solid:sliders-h'
     */
    icon?: string

    /**
     * If enabled, the tooltip to show when hovering the icon
     * @default 'Settings'
     */
    tooltip?: string

    /**
     * The ids of the toggles to hide.
     * Use 'true' to hide all toggles.
     * Default toggles:
     * 'sidemenu': Use new layout
     * 'tooltips': Enable tooltips
     * @default false
     */
    disabledToggles?: boolean | string[]

    /**
     * Custom toggles to register
     * 
     * @default []
     */
    toggles?: SettingsToggle[]
}

interface PageSettingsOptions {
    /**
     * Settings for page watching
     */
    watching?: {
        /**
         * For all pages, control whether watching is shown
         * @default true
         */
        enabled?: boolean
        /**
         * For all pages, control whether the banner is shown by default.
         * This setting can be configured by the user in the `PageWatchOverview` component
         * 
         * @default true
         */
        hidden?: boolean
        /**
         * The public key for registering subscriptions
         */
        publicKey: string
        /**
         * The url to post the subscriptions to
         */
        url: string
        /**
         * The page where to manage all notifications
         */
        managePath?: string 
    }

    /**
     * Settings for the right side menu
     */
    sideMenu?: {
        /**
         * For all pages control whether the sidemenu is shown
         * 
         * @default true
         */
        enabled?: boolean
        /**
         * Settings for headers in the TOC 
         */
        toc?: {
            /**
             * The title of the TOC
             * @default 'On this page'
             */
            title?: string
            /** 
             * The maximum header depth for the TOC
             * @default $themeConfig.sidebarDepth  
             */
            depth?: number
        }
    }
}

interface NavbarOptions {
    /**
     * Override the title to use in the navbar
     * @default $siteTitle
     */
    title?: string
    /**
     * Add icon links in the top right of the navbar. The name property is the [iconify](https://iconify.design) icon name.
     * @default []
     */
    icons?: NameLinkData[]
    /**
     * Show banners above the navigation bar. See the type definitions for all options in a notification.
     * @default []
     */
    notifications?: SiteNotification[]
    /**
     * The url to send a `GET` request to. The request should return `SiteNotification[]` as a JSON body. Only used when `notifications` is empty.
     * @default undefined
     */
    notificationsUrl?: string
    /**
     * Options for settings in the navbar
     * @default undefined
     */
    settings?: SiteSettingsOptions
}

interface RelatedPagesOptions {
    title?: string
    amount?: number
    pages?: {
        prefix: string
        icon?: string
        description?: string
    }[]
}

interface ThemeOptions {
    // useLegacyColors?: boolean
    notFoundSettings?: notFoundSettings
    notFinished?: notFinishedSettings
    navbar?: NavbarOptions
    page?: PageSettingsOptions
    related?: RelatedPagesOptions
}