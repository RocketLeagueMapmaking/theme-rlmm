# Theme Configuration

See the [official guide](https://vitepress.dev/guide/extending-default-theme#customizing-css) on how to customize css variables for custom colors, etc.

For all configuration options of this theme, use the exported type `RLMMThemeConfig`:

```ts
import { defineConfigWithTheme } from 'vitepress'
import { type RLMMThemeConfig } from 'vitepress-theme-rlmm'

export default defineConfigWithTheme<RLMMThemeConfig>({
    // Config options with typings and jsdocs
})
```

## Preferences

To enable the `Edit preferences` button in the sidebar, customize `RLMMThemeConfig.sidebarAction`. The path will be the path of the markdown file you have where you show the preferences with [PreferenceSetting](components#preferencesetting) (and if you want to group combine it with the [TabsWindow](components#tabswindow) component) components.

## Notifications

### Banner

You can display a notification banner at the top of the page

```ts
export default defineConfigWithTheme<RLMMThemeConfig>({
    themeConfig: {
        banner: {
            data: {
                id: 'banner-unique',
                html: 'My banner!',
            },
        },
    },
})
```

### Push notifications

:::warning Secure context
Push notifications will only work in secure contexts!
:::

Push notifications and the Push API are made easier with [`useNotifications`](util#usenotifications).
