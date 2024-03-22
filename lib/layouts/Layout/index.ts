import { defineAsyncComponent, h } from 'vue'
import { useData } from 'vitepress'

import { fetchComponent } from '../../util/'
import type {
    BannerNotification,
    ThemeConfig,
} from '../../types'

import MainLayout from './components/main.vue'
import LoadingLayout from './components/loading.vue'

export default defineAsyncComponent({
    loadingComponent: () => {
        const {
            theme: { value: theme },
        } = useData<ThemeConfig>()

        return h(LoadingLayout, {
            text: theme.home?.offlineText,
        })
    },
    errorComponent: () => {
        const {
            theme: { value: theme },
        } = useData<ThemeConfig>()

        return h(LoadingLayout, {
            text: theme.home?.errorText ?? 'Failed to load...',
        })
    },
    onError: console.error,
    delay: 0,
    loader: async () => {
        const {
            theme: { value: theme },
        } = useData<ThemeConfig>()

        const banner = await fetchComponent<false | BannerNotification>(theme.banner)
        const notifications = await fetchComponent(theme.notifications) ?? []

        return h(MainLayout, {
            banner,
            notifications,
        })
    }
})