import type { DefaultTheme } from "vitepress";

import type { BlockType } from "./blocks";

export interface NavItemExpanded extends DefaultTheme.NavItemWithLink {
    expanded: true

    badge?: {
        type?: BlockType
        text: string
    }

    description?: string
    icon?: string

}

export interface NavItemWithExpandedChildren extends DefaultTheme.NavItemWithChildren {
    // text?: string
    items: NavItemExpanded[]

    /**
     * `activeMatch` is expected to be a regex string. We can't use actual
     * RegExp object here because it isn't serializable
     */
    // activeMatch?: string
}

export type NavItem =
    | DefaultTheme.NavItem
    | NavItemWithExpandedChildren
