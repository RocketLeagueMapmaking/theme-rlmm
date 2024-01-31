import { defineAsyncComponent, h } from 'vue'
import { useData } from 'vitepress'

import { fetchComponent } from '../../util/'
import type {
    BannerNotification,
    ThemeConfig,
} from '../../types'

import { renderHomePageSections } from './sections/home'

import MainLayout from './components/main.vue'
import LoadingLayout from './components/loading.vue'

export default function defineDefaultLayout() {
    return defineAsyncComponent({
        loadingComponent: () => {
            const {
                theme: { value: theme },
            } = useData<ThemeConfig>()

            return h(LoadingLayout, {
                text: theme.home?.offlineText,
            })
        },
        errorComponent: () => {
            return h(LoadingLayout, {
                text: 'Failed to load...',
            })
        },
        onError: console.error,
        loader: async () => {
            const {
                theme: { value: theme },
                frontmatter: fm,
            } = useData<ThemeConfig>()

            console.log('Loading layout...')

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