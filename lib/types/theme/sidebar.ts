import type { StyleValue } from "vue"
import type { DefaultTheme } from "vitepress"

export interface SidebarButtonOptions {
    /**
     * The path to open when clicking on the button
     */
    href: string

    /**
     * The style of the button
     * @default 'alt'
     */
    theme?: 'brand' | 'alt' | 'sponsor'

    /**
     * The text on the action button
     */
    text: string

    /**
     * Apply custom styles to the action button
     */
    style?: StyleValue
}

export type SideActionSidebarItem =
    | SidebarButtonOptions
    | (() => ({ name: string, style?: StyleValue, props: object, content?: string }))

export interface SideActionItemOptions {
    /**
     * Where to place the action item on the sidebar 
     * @default 'top'
     */
    position?: 'top' | 'bottom'

    action: 
        | { type: 'button', item: SidebarButtonOptions }
        | { type: 'item', item: Omit<DefaultTheme.SidebarItem, 'items'> & { items: SideActionSidebarItem[] } }
}
