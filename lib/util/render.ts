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

export const renderText = <ToNode extends boolean = false>(
    text: ThemeText,
    options?: ThemeTextOptions<ToNode>
): ToNode extends true ? VNode : string  => {
    const md = useMarkdown()

    const input = options?.maxLength && typeof text === 'string'
        ? text.length > options.maxLength
            ? text.slice(0, options.maxLength) + (options.ellipsisText ?? '...')
            : text
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
                preserve: false,
                toVNode: false,
            }),
        })
    }
)
