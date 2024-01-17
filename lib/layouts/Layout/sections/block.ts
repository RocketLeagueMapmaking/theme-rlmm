import { h } from 'vue'

import type { BlockRenderOptions } from '../../../types/'
import { getThemeColor, renderHTML } from '../../../util'

export function renderBlock (md: markdownit, options: BlockRenderOptions) {
    if (options === false) return h('div')
    const containerClass = `${options.type ?? 'info'} custom-block vp-raw`

    const innerHTML = options.html ?? renderHTML(md, options.text)
    const backgroundColor = options.color
        ? getThemeColor(options.color)
        : undefined

    return h('div', 
        { 
            class: containerClass,
            style: {
                paddingTop: '8px',
                marginBottom: '8px',
                backgroundColor,
            },
        },
        h('p', { innerHTML })
    )
}

export function renderBlocks (
    md: markdownit,
    blocks: BlockRenderOptions[],
    position: NonNullable<Exclude<BlockRenderOptions, false>['position']>,
) {
    const children = blocks
        .filter(bl => typeof bl === 'boolean' ? true : (bl.position ?? 'top') === position)
        .map(block => renderBlock(md, block))

    return h('div', children)
}