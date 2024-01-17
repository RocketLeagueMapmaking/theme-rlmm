import { h, ref } from 'vue'
import { VPButton } from 'vitepress/theme'

import { useStorage } from '../../../composables/'
import type { RLMMThemeConfig } from '../../../types'

export function renderSidebarAction(options: RLMMThemeConfig['sidebarAction']) {
    if (options == undefined) return undefined

    let storedValue = ref(false)

    return h(VPButton, {
        onVnodeMounted: (node) => {
            const storage = useStorage()
            const key = storage.themeKeys.value.hideSidebarAction

            storedValue.value = storage.getAny(key, false)
            node.el!.style.display = storedValue.value ? 'none' : 'block'
        },
        text: options.title,
        href: options.path,
        class: options.buttonTheme ?? 'alt',
        style: {
            margin: '12px 0',
            display: 'block',
        },
    })
}
