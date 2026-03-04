import { renderBlock } from './block'

import type { NotFinishedOptions } from '../../../types'

export function renderNotFinished (options: NotFinishedOptions | undefined = {}) {
    const renderOptions = typeof options === 'object' ? {
        ...options,
        type: options.type ?? 'warning',
        text: options.text ?? 'This page is not finished',
    } : options

    return renderBlock(renderOptions)
}
