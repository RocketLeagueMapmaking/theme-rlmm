export default ({ Vue }) => {
    const themeComponents = [
        'Banner',
        'ExternalLink',
        'ItemList',
        'SteamRecentMaps',
    ]

    for (const name of themeComponents) {
        Vue.component(name, () => import(`./components/${name}.vue`))
    }
}