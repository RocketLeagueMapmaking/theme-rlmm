interface NormalPageFrontmatter {
    finished?: boolean
    items?: {
        title: string
        description: string
        color?: string
    }[]
    actions?: LinkData[]
}

interface HomePageFrontmatter {
    layout: 'Home'
    hero: {
        title: string
        description: string
        background?: string
        actions: ButtonData[]
    }
    items: ItemListItem[]
    steamRecentMaps?: SteamRecentMapsProps
}