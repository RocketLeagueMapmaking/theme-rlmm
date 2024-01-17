import { type VNode } from "vue";

export const renderIf = (
    condition: boolean | (unknown | undefined),
    node: VNode | (() => VNode)
) => condition && condition != undefined ? (typeof node === 'function' ? node() : node) : undefined

export const renderHTML = (
    md: markdownit,
    text: string | { html: string }
) => (typeof text === 'string' ? md.render(text) : text.html)
