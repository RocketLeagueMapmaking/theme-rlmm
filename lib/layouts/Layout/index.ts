import { defineAsyncComponent, h, type DefineComponent } from 'vue'
import { useData } from 'vitepress'

import { VPHomeSponsors } from 'vitepress/theme'

import { getHomeFrontmatter } from './frontmatter'
import { fetchComponentData } from '../../data/'
import type { RLMMNotification, RLMMThemeConfig } from '../../types'

import Banner from '../../components/layout/Banner.vue'
import EventShowcase from '../../components/global/EventShowcase.vue'
import SteamMaps from '../../components/global/SteamMaps.vue'
import { VPFeatures } from '../../components/export'

import { renderPromotion } from './sections/promotion'
import { renderSidebarAction } from './sections/sidebarAction'

export default function defineDefaultLayout(Layout: DefineComponent) {
    return defineAsyncComponent({
        loadingComponent: h(Layout, {}, { 
            'home-features-after': () => {
                return h('p', { 
                    class: 'home-resources' 
                }, 'Loading...') 
            }
        }),
        loader: async () => {
            const { frontmatter, theme: { value: theme } } = useData<RLMMThemeConfig>()
            const data = getHomeFrontmatter(frontmatter.value ?? {})
            const notification = theme.banner && await fetchComponentData(theme.banner, undefined)
                .then(res => res.data as false | RLMMNotification | undefined)

            const children = [
                (data?.resources.enabled ? h('div', { class: 'home-resources' }, [h('p', data.resources.title)]) : undefined),
                (data?.resources.enabled ? h(VPFeatures, { features: data.resources.resources }) : undefined),
                (data?.events.enabled ? h(EventShowcase, await fetchComponentData(data.events, [])) : undefined),
                renderPromotion(frontmatter.value.promotion),
                // @ts-ignore
                (data?.sponsors.enabled ? h(VPHomeSponsors, await fetchComponentData(data.sponsors, [])) : undefined),
            ].filter((child): child is NonNullable<typeof child> => child != undefined)

            const sidebarActionPos = `sidebar-nav-${theme.sidebarAction?.position === 'bottom' ? 'after' : 'before'}`

            return h(Layout, {}, {
                'layout-top': () => h(Banner, notification || {}),
                [sidebarActionPos]: () => renderSidebarAction(theme),
                'home-hero-image': () => data?.steam.enabled ? h(SteamMaps, data.steam) : undefined,
                'home-features-after': () => h('div', children),
            })
        }
    })
}