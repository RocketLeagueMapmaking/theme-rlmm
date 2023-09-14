interface ItemListItem {
    title: string
    description: string
    image: string
    actions: ButtonData[]
}

interface SteamRecentMapsProps {
    enabled: boolean
    // Default: Recent Steam maps
    title?: string
    // Default: 3
    amount?: number
    type?: 'gallery' | 'list' | 'expanded'
}

