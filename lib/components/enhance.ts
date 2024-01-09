import {
    type EnhanceFunction,
    enhanceAppWithTheme,
} from './theme'

// Components

import ActionBlock from './global/ActionBlock.vue'
import EventShowcase from './global/EventShowcase.vue'
import PreferenceSetting from './global/PreferenceSetting.vue'
import SteamMaps from './global/SteamMaps.vue'

import ActionView from './global/markdown/action.vue'
import StepsView from './global/markdown/steps.vue'
import TabsView from './global/markdown/tabs.vue'

export const enhanceApp: EnhanceFunction = async (ctx) => {
    const { app } = ctx
    enhanceAppWithTheme(ctx)

    app.component('ActionWindow', ActionView)
    app.component('StepsWindow', StepsView)
    app.component('TabsWindow', TabsView)

    app.component('Actions', ActionView)
    app.component('Steps', StepsView)
    app.component('Tabs', TabsView)

    app.component('ActionBlock', ActionBlock)
    app.component('EventShowcase', EventShowcase)
    app.component('PreferenceSetting', PreferenceSetting)
    app.component('SteamMaps', SteamMaps)
}
