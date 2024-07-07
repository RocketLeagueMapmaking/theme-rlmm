import { defineConfigWithTheme, type UserConfig } from 'vitepress'
import type { ThemeConfig } from './types'

export const ThemeDefaultConfig = {
    transformPageData(pageData, ctx) {
        if (pageData.frontmatter.exposePages === true) {
            pageData.frontmatter.pages = ctx.siteConfig.pages
        }
    },
} satisfies UserConfig<ThemeConfig>

export function defineConfig(config: UserConfig<ThemeConfig>) {
    return defineConfigWithTheme({
        ...config,
        extends: ThemeDefaultConfig,
    })
}
