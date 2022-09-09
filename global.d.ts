interface LinkData {
    name: string
    link: string
}

declare global {
    interface ThemeOptions {
        betaMessage: string,
        notFound?: string[],
        notFoundSettings?: {
            background?: string

            suggestedPages?: { text: string, link: string }[]
        }

        navbar?: {
            title?: string
            icons?: LinkData[]
        }
    }

    interface Frontmatter {
        beta?: boolean
        items?: {
            title: string
            description: string
            preset: 'details' | 'danger' | 'warning' | 'tip'
        }[]
        actions?: LinkData[]
    }
}