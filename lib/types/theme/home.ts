import type { HeadConfig } from "vitepress"

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
    text: string
    tagline?: string
    image?: ThemeableImage
    actions?: HeroAction[]
}

type ThemeableImage =
    | string
    | { src: string; alt?: string }
    | { light: string; dark: string; alt?: string }

interface HeroAction {
    theme?: 'brand' | 'alt'
    text: string
    link: string
}

export interface Feature {
    icon?: FeatureIcon
    title: string
    details: string
    link?: string
    linkText?: string
    rel?: string
}

type FeatureIcon =
    | string
    | { src: string; alt?: string; width?: string; height: string }
    | {
        light: string
        dark: string
        alt?: string
        width?: string
        height: string
    }

export interface DefaultHomePageFrontmatter extends DefaultNormalPageFrontmatter {
    layout: 'home'
    hero?: Hero
    features?: Feature[]
}
