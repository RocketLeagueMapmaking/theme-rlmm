import { defineAsyncComponent, h } from 'vue'
import { useData } from 'vitepress'

import { fetchComponentData } from '../../data/'
import type { RLMMNotification, RLMMThemeConfig } from '../../types'

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

            const notification = theme.banner && await fetchComponentData(theme.banner, undefined)
                .then(res => res.data as false | RLMMNotification | undefined)

            const homepageSlots = await renderHomePageSections(fm.value)

            return h(MainLayout, {
                homepageSlots,
                notification,
            })
        }
    })
}