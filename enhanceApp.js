import Vuetify from "vuetify"
import "vuetify/dist/vuetify.min.css";
import * as themes from './util/colors.js'
import { Icon } from '@iconify/vue2'

export default ({ Vue, options }) => {
    const themeComponents = [
        'Banner',
        'ExternalLink',
        'ItemList',
        'PatreonBanner',
        'SteamRecentMaps',
        'TooltipText',
    ]

    Vue.use(Vuetify)
    options.vuetify = new Vuetify({
        icons: {
        },
        theme: {
            options: {
                variations: false,
            },
            default: 'dark',
            dark: true,
            disable: false,
            themes,
        },
    })

    Vue.component('Icon', Icon)

    for (const name of themeComponents) {
        Vue.component(name, () => import(`./components/${name}.vue`))
    }
}