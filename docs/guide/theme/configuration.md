# Theme Configuration

See the [official guide](https://vitepress.dev/guide/extending-default-theme#customizing-css) on how to customize css variables for custom colors, etc.

For all configuration options of this theme, use the exported type `ThemeConfig`:

```ts
import { defineConfigWithTheme } from 'vitepress'
import { type ThemeConfig } from 'theme-rlmm'

export default defineConfigWithTheme<ThemeConfig>({
    // Config options with typings and jsdocs
})
```

## Sidebar action

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

> [!WARNING]
> Push notifications will only work in secure contexts!

Push notifications and the Push API are made easier with [`useNotifications`](composables#usenotifications).

### Inbox

Notifications are available to render in the [NotificationListWindow](./windows/list#notifications) component. To display a notification inbox, configure the `themeConfig.notifications.inbox` options and provide data / url for the `ThemeNotification` notifications.

```ts
// config.ts

export default defineConfigWithTheme<ThemeConfig>({
    themeConfig: {
        notifications: {
            dataUrl: '<server.com/notifications>',
            inbox: {
                // the max amount to display in the inbox
                amount: 3,
            }
        }
    }
})

```

Any notification with `inbox` set to `true` will be shown in the inbox, sorted on last created.

## Storage

In combination with the `PreferenceSetting` component, the `themeConfig.storage` option can be used to have customizable pages:

- `keys`: change the local storage keys used by the theme (components)
- `pageClasses`: apply extra classes to the page if a local storage item is `true`
- `colorKeys`: change CSS variable(s) to the value of a local storage item
