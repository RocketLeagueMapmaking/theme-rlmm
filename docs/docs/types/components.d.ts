interface ItemListItem {
    title: string
    description: string
    image: string
    actions: ButtonData[]
}

interface SteamRecentMapsProps {
    enabled: boolean
    title?: string
    amount?: number
    type?: 'gallery' | 'list' | 'expanded'
}

