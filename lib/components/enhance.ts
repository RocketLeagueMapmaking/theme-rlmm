
import { type EnhanceFunction, enhanceAppWithTheme, } from './theme'

// Components

import EventShowcase from './global/EventShowcase.vue'
import PreferenceSetting from './global/PreferenceSetting.vue'
import SteamMaps from './global/SteamMaps.vue'

import ActionView from './global/markdown/action.vue'
import StepsView from './global/markdown/steps.vue'
import TabsView from './global/markdown/tabs.vue'

import ListView from './advanced/list/ListView.vue'
import SearchBlock from './advanced/list/SearchBlock.vue'

export const enhanceApp: EnhanceFunction = async (ctx) => {
    const { app } = ctx
    enhanceAppWithTheme(ctx)

    app.component('ActionWindow', ActionView)
    app.component('StepsWindow', StepsView)
    app.component('TabsWindow', TabsView)

    app.component('EventShowcase', EventShowcase)
    app.component('PreferenceSetting', PreferenceSetting)
    app.component('SteamMaps', SteamMaps)

    app.component('ListWindow', ListView)
    app.component('SearchBlock', SearchBlock)
}