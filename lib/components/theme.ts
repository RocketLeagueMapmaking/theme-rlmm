import type { Theme } from "vitepress";

import {
    VPButton,
    VPImage,
} from 'vitepress/theme'

import VPFeatures from '../../node_modules/vitepress/dist/client/theme-default/components/VPFeatures.vue'
import VPLink from '../../node_modules/vitepress/dist/client/theme-default/components/VPLink.vue'
import VPSwitch from '../../node_modules/vitepress/dist/client/theme-default/components/VPSwitch.vue'
import VPSwitchAppearance from '../../node_modules/vitepress/dist/client/theme-default/components/VPSwitchAppearance.vue'

export type EnhanceFunction = NonNullable<Theme['enhanceApp']>

export const enhanceAppWithTheme: EnhanceFunction = ({ app }) => {
    app.component('VPButton', VPButton)
    app.component('VPImage', VPImage)
    app.component('VPLink', VPLink)

    app.component('VPSwitch', VPSwitch)
    app.component('VPSwitchAppearance', VPSwitchAppearance)
}

export {
    VPButton,
    VPFeatures,
    VPImage,
    VPLink,
    VPSwitch,
    VPSwitchAppearance,
}