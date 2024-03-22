import { defineConfigWithTheme, type UserConfig } from 'vitepress'
import type { ThemeConfig } from './types'

import { fileURLToPath, URL } from 'url'

export const ThemeDefaultConfig = {
    transformPageData(pageData, ctx) {
        if (pageData.frontmatter.exposePages === true) {
            pageData.frontmatter.pages = ctx.siteConfig.pages
        }
    },
    vite: {
        resolve: {
            alias: [
                {
                    find: /^.*\/VPMenu\.vue$/,
                    replacement: fileURLToPath(
                        new URL('./components/layout/NavMenu.vue', import.meta.url)
                    ),
                },
            ]
        }
    }
} satisfies UserConfig<ThemeConfig>

export function defineConfig(config: UserConfig<ThemeConfig>) {
    return defineConfigWithTheme({
        ...config,
        extends: ThemeDefaultConfig,
    })
}
