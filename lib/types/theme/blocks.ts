import type { PageData } from "vitepress"

import type { ThemeText } from "./text"

export type BlockPosition =
    | 'top'
    | 'bottom'

export interface BlockOptions {
    /**
     * Use a preset for text and background color of the block.
     * @default 'info'
     */
    type?: 'warning' | 'error' | 'tip' | 'info'

    /**
     * Where to place the block
     * @default 'top'
     */
    position?: BlockPosition

    /**
     * Override the default {@link type} color with a custom theme or CSS color
     */
    color?: string

    /**
     * The text to render in the blocks
     */
    text: ThemeText

    /** @deprecated */
    html?: string
}

export type BlockRenderOptions = false | BlockOptions

export type NotFinishedOptions =
    | false
    | (
        Omit<BlockOptions, 'type' | 'color' | 'position' | 'text'>
        & Partial<Pick<BlockOptions, 'text'>>
        & {
            /**
             * The type of warning block to render
             * @default 'warning'
             */
            type?: 'warning' | 'error'
        }
    )

export interface FeedbackAnswerOptions {
    enabled?: boolean
    icon?: string
    text?: ThemeText
    onClick?: () => Promise<void> | void
    style?: object
}

export interface FeedbackOptions {
    text?: ThemeText
    showNotFinished?: boolean
    position?:
        | 'bottom-left'
        | 'bottom-right'
    answers?: {
        yes?: FeedbackAnswerOptions
        no?: FeedbackAnswerOptions
    }
    onClick?: (answer: 'yes' | 'no') => Promise<void> | void
    style?: object
}

export interface RelatedPagesOptions {
    title?: string
}

export interface PageBlockOptions {
    /**
     * Enabled:
     * - false: no custom blocks
     * - true: all custom blocks
     * - 'top': only blocks at the top of the page
     * - 'bottom': only blocks at the bottom of the page
     */
    enabled?: boolean | BlockPosition

    /**
     * Blocks rendered on a page without setting the frontmatter on the page itself
     */
    default?:
        | Exclude<BlockRenderOptions, false>[]
        | ((page: PageData) => false | Exclude<BlockRenderOptions, false>[])

    /**
     * Adds custom blocks for related pages at the bottom
     * Controls whether to enable or not on all pages if configured in the frontmatter.
     */
    relatedPages?: boolean | RelatedPagesOptions

    /**
     * Options to add a feedback / 'Was this page useful?' block to the page
     */
    feedback?: boolean | FeedbackOptions

    /**
     * Mark pages as not finished with a default banner at the top of the page.
     * Can be enabled on a page with the `finished: false` frontmatter.
     * Set to `false` to disable all not finished banners.
     * 
     * @default { type: 'warning', text: 'This page is not finished'}
     */
    notFinished?: NotFinishedOptions
}
