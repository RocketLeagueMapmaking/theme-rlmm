import type { Theme } from "vitepress";

import {
    VPButton,
    VPImage,
} from 'vitepress/theme'

import VPFeatures from 'vitepress/dist/client/theme-default/components/VPFeatures.vue'
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'
import VPSwitch from 'vitepress/dist/client/theme-default/components/VPSwitch.vue'
import VPSwitchAppearance from 'vitepress/dist/client/theme-default/components/VPSwitchAppearance.vue'

import VPIconArrowRight from "vitepress/dist/client/theme-default/components/icons/VPIconArrowRight.vue";
import VPIconArrowLeft from "vitepress/dist/client/theme-default/components/icons/VPIconArrowLeft.vue";
import VPIconChevronDown from "vitepress/dist/client/theme-default/components/icons/VPIconChevronDown.vue";
import VPIconChevronRight from "vitepress/dist/client/theme-default/components/icons/VPIconChevronRight.vue";
import VPIconChevronLeft from "vitepress/dist/client/theme-default/components/icons/VPIconChevronLeft.vue";
import VPIconMinus from "vitepress/dist/client/theme-default/components/icons/VPIconMinus.vue";
import VPIconPlus from "vitepress/dist/client/theme-default/components/icons/VPIconPlus.vue";

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
    // Icons
    VPIconArrowRight,
    VPIconArrowLeft,
    VPIconChevronDown,
    VPIconChevronRight,
    VPIconChevronLeft,
    VPIconMinus,
    VPIconPlus,
}