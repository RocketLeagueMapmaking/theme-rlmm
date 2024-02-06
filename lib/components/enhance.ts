import { Icon } from '@iconify/vue'

import {
    type EnhanceFunction,
    enhanceAppWithTheme,
} from './theme'

import * as pkg from '../../package.json'

// Components

import ActionBlock from './global/ActionBlock.vue'
import ItemGrid from './global/ItemGrid.vue'
import PreferenceSetting from './global/PreferenceSetting.vue'
import SteamMaps from './global/SteamMaps.vue'

import ActionView from './global/markdown/action.vue'
import StepsView from './global/markdown/steps.vue'
import TabsView from './global/markdown/tabs.vue'

export const registerGlobalProperties: EnhanceFunction = (ctx) => {
    ctx.app.config.globalProperties.$theme = {
        name: pkg.name,
        version: pkg.version,
        description: pkg.description,
    }
}

export const enhanceApp: EnhanceFunction = async (ctx) => {
    const { app } = ctx

    enhanceAppWithTheme(ctx)
    registerGlobalProperties(ctx);

    app.component('Icon', Icon)

    app.component('ActionWindow', ActionView)
    app.component('StepsWindow', StepsView)
    app.component('TabsWindow', TabsView)

    app.component('Actions', ActionView)
    app.component('Steps', StepsView)
    app.component('Tabs', TabsView)

    app.component('ActionBlock', ActionBlock)
    app.component('ItemGrid', ItemGrid)
    /** @deprecated */
    app.component('EventShowcase', ItemGrid)
    app.component('PreferenceSetting', PreferenceSetting)
    app.component('SteamMaps', SteamMaps)
}
