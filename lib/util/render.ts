import { h, type VNode } from "vue";

import type { ThemeText } from "../types";

export const renderIf = (
    condition: boolean | (unknown | undefined),
    node: VNode | (() => VNode)
) => condition && condition != undefined ? (typeof node === 'function' ? node() : node) : undefined

export const renderHTML = (
    md: (md: string) => string,
    text: ThemeText,
) => (typeof text === 'string' ? md(text) : text.html)

export const renderText = (text: string, options?: { maxLength?: number }) => {
    return options?.maxLength 
        ? text.length > options.maxLength ? text.slice(0, options.maxLength) + '...' : text
        : text
}

export const renderTitle = (
    options: { md: markdownit, enabled?: boolean, tag?: string },
    text: string,
) => h(options.tag ?? 'h2', {
    id: options.enabled
        ? text
            .toLowerCase()
            .replace(/ /g,'-')
            .replace(/[-]+/g, '-')
            .replace(/[^\w-]+/g,'')
        : undefined,
}, [text])
