import { h, ref } from 'vue'
import { VPButton } from 'vitepress/theme'

import { useStorage } from '../../../data/'
import type { RLMMThemeConfig } from '../../../types'

export function renderSidebarAction(theme: RLMMThemeConfig) {
    const options = theme.sidebarAction
    if (options == undefined) return undefined

    let storedValue = ref(false)

    return h(VPButton, {
        onVnodeMounted: (node) => {
            const storage = useStorage()

            storedValue.value = storage.getAny('rlmm-hide-action', false)
            node.el!.style.display = storedValue.value ? 'none' : 'block'
        },
        text: options.title ?? 'Edit preferences',
        href: options.path,
        class: options.buttonTheme ?? 'alt',
        style: {
            margin: '12px 0',
            display: 'block',
        },
    })
}
