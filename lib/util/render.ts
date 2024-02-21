import { defineComponent, h, type VNode } from "vue";

import { useMarkdown } from "../composables";
import type {
    ThemeText,
    ThemeTextComponentOptions,
    ThemeTextOptions,
} from "../types";

export const renderIf = (
    condition: boolean | (unknown | undefined),
    node: VNode | (() => VNode)
) => condition && condition != undefined ? (typeof node === 'function' ? node() : node) : undefined

/** @deprecated use {@link renderText} instead */
export const renderHTML = (
    md: (md: string) => string,
    text: ThemeText,
): string => renderText(text)

export const renderText = <ToNode extends boolean = false>(
    text: ThemeText,
    options?: ThemeTextOptions<ToNode>
): ToNode extends true ? VNode : string  => {
    const md = useMarkdown()

    const input = options?.maxLength && typeof text === 'string'
        ? text.length > options.maxLength ? text.slice(0, options.maxLength) + '...' : text
        : text

    const html = typeof input === 'string'
        ? options?.preserve ? input : md(input)
        : input.html

    return (options?.toVNode
        ? h('p', { innerHTML: html })
        : html) as never
}

export const ThemeTextComponent = defineComponent<ThemeTextComponentOptions>(
    (props) => {
        return () => h(props.tag ?? 'p', {
            ...(props.props ?? {}),
            innerHTML: renderText(props.text, {
                ...(props.options ?? {}),
                toVNode: false,
            }),
        })
    }
)

/** @deprecated */
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
