import { renderBlock } from './block'

import type { NotFinishedOptions } from '../../../types'

export function renderNotFinished (md: markdownit, options: NotFinishedOptions | undefined = {}) {
    if (options === false) return renderBlock(md, false)
    else return renderBlock(md, {
        ...options,
        type: options.type ?? 'warning',
        text: options.text ?? 'This page is not finished',
    })
}
