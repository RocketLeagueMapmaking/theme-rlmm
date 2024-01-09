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
    text: string | { html: string }

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
