interface LinkData {
    text: string
    link: string
}

type NameLinkData = Omit<LinkData, 'text'> & { name: string }

interface IconLinkData extends LinkData {
    icon: string
}

interface ButtonData extends LinkData {
    primary?: boolean
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
    pages?: IconLinkData[]
    options?: []
    page?: {
        sideMenu?: {
            enabled?: boolean
            defaultEnabled?: boolean
            settingsEnabled?: boolean
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
    settings?: SiteSettingsOptions
}

interface ThemeOptions {
    betaMessage: string,
    notFoundSettings?: notFoundSettings
    notFinished?: {
        message?: string
        hidePage?: boolean
    }
    navbar?: NavbarOptions
}