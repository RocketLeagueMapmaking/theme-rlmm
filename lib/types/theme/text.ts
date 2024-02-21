export interface ThemeTextOptions<ToNode extends boolean> {
    /**
     * Truncate the text to this length.
     * 
     * Only applies when the input text is markdown.
     */
    maxLength?: number

    /**
     * Preserve output as markdown if the text is markdown
     * @default false
     */
    preserve?: boolean

    /**
     * Converts the output to a VNode instead of string
     */
    toVNode?: ToNode
}

export interface ThemeTextComponentOptions {
    text: ThemeText
    tag?: string
    options?: Omit<ThemeTextOptions<true>, 'toVNode'>
    props?: Record<string, any>
}

export type ThemeText = 
    | string
    | { html: string }
