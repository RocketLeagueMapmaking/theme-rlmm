import type { HeadConfig, DefaultTheme } from "vitepress"
import type { ThemeText } from "./text"

type Frontmatter = Record<string, any>

// TODO: import types from default theme
// https://vitepress.dev/reference/frontmatter-config
export interface DefaultNormalPageFrontmatter extends Frontmatter {
    title?: string
    titleTemplate?: string
    description?: string
    head?: HeadConfig[]
    layout?: 'doc' | 'home' | 'page'
    sidebar?: boolean
    aside?: boolean | 'left'
    outline?: number | [number, number] | 'deep' | false
    lastUpdated?: boolean | Date
    editLink?: boolean
    footer?: boolean
    pageClass?: string
}

// https://vitepress.dev/reference/default-theme-home-page
export interface Hero {
    name?: string
    text?: string
    tagline?: string
    image?: DefaultTheme.ThemeableImage
    actions?: HeroAction[]
}

interface HeroAction {
    theme?: 'brand' | 'alt'
    text: string
    link: string
}

export interface Feature {
    icon?: DefaultTheme.FeatureIcon
    title: string
    details: string
    link?: string
    linkText?: string
    rel?: string
}

export interface DefaultHomePageFrontmatter extends DefaultNormalPageFrontmatter {
    layout: 'home'
    hero?: Hero
    features?: Feature[]
}

export interface HomeOptions {
    /**
     * The text to show when offline on the home page
     * Also configurable by $frontmatter.offlineText
     */
    offlineText?: ThemeText
}
