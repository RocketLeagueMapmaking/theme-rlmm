import { renderBlock } from './block'

import type { NotFinishedOptions } from '../../../types'

export function renderNotFinished (options: NotFinishedOptions | undefined = {}) {
    if (options === false) return renderBlock(false)
    else return renderBlock({
        ...options,
        type: options.type ?? 'warning',
        text: options.text ?? 'This page is not finished',
    })
}
