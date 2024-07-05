---
title: Configuration
---

# Theme Configuration

See the [official guide](https://vitepress.dev/guide/extending-default-theme#customizing-css) on how to customize css variables for custom colors, etc.

The theme comes with an `defineConfig` utility function that will add some configurations. These configuration can also be applied manually by using the exported `ThemeDefaultConfig`.

```ts
import { defineConfig } from '@rocketleaguemapmaking/theme-rlmm'

export default defineConfig({
    // Config options with typings and jsdocs
    // Applies the configuration changes listed below
})
```

:::details Configuration changes

- `transformPageData`: adds all pages paths to `$frontmatter.pages` if [the frontmatter `exposePages: true`](frontmatter#exposepages) is on the current page.
- `vite`: replaces built-in nav dropdown to add [an expanded view](#expanded-navbar)

:::

If you don't want to use configuration changes of this theme, use the exported type `ThemeConfig`:

```ts
import { defineConfigWithTheme } from 'vitepress'
import { type ThemeConfig } from '@rocketleaguemapmaking/theme-rlmm'

export default defineConfigWithTheme<ThemeConfig>({
    // Config options with typings and jsdocs
})
```

## Global properties

Besides the default `$frontmatter` and `$params` frontmatter, the following properties are also global:

- `$theme`: information about the current theme.
  - Type: `{ name: string, description: string, version: string }`
  - Value: {{ $theme }}

## Sidebar action

To enable the `Edit preferences` button in the sidebar, customize `ThemeConfig.sidebarAction`. The path will be the path of the markdown file you have where you show the preferences with [PreferenceSetting](components#preferencesetting) (and if you want to group combine it with the [TabsWindow](components#tabswindow) component) components.

## Expanded Navbar

:::danger Theme configuration
To use this expanded view use [the theme configuration](#theme-configuration) in your config
:::

To enable a larger navigation dropdown menu (see the `Guide` nav dropdown) set the `expanded` property on **all items** to `true`.
Note that all children on all items will not be used!

Besides the default `NavItemWithLink` options, the following options can be set for each item:

- `icon`: The [name of the Icon](components#icon) to show at the left side of the item
- `description`: The description of the item
- `badge`: The badge (text and type) to show at the right side of the item

```ts
const expandedNavItems = [
    {
        // Default NavItem options
        text: 'UDK',
        link: '/udk/',
        // Set on all items to `true`
        expanded: true,
        description: 'Learn more about UDK',
        icon: 'carbon:edit',
    },
    {
        text: 'Blender',
        expanded: true,
        link: '/blender/',
        description: 'Learn more about Blender',
        icon: 'carbon:cube',
    },
    {
        text: 'Kismet',
        expanded: true,
        link: '/udk/reference',
        description: 'Learn more about kismet',
        icon: 'carbon:branch'
    },
]
```

## Notifications

### Banner

You can display a notification banner at the top of the page

```ts
export default defineConfigWithTheme<ThemeConfig>({
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
