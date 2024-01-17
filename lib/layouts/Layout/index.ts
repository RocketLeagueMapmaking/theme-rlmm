import { defineAsyncComponent, h } from 'vue'
import { useData } from 'vitepress'

import { fetchComponent } from '../../util/'
import type {
    BannerNotification,
    RLMMThemeConfig,
} from '../../types'

import { renderHomePageSections } from './sections/home'

import MainLayout from './components/main.vue'
import LoadingLayout from './components/loading.vue'

export default function defineDefaultLayout() {
    return defineAsyncComponent({
        loadingComponent: () => h(LoadingLayout),
        loader: async () => {
            const {
                theme: { value: theme },
                frontmatter: fm,
            } = useData<RLMMThemeConfig>()

            const banner = await fetchComponent<false | BannerNotification>(theme.banner)
            const notifications = await fetchComponent(theme.notifications) ?? []

            const homepageSlots = await renderHomePageSections(fm.value)

            return h(MainLayout, {
                homepageSlots,
                banner,
                notifications, 
            })
        }
    })
}