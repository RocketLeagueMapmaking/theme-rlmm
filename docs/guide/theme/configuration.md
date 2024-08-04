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

To enable a larger navigation dropdown menu (see the `Guide` nav dropdown) use the `ExpandedNavMenu` component.
Note that all children on all items will not be used!

Besides the default `NavItemWithLink` options, the following options can be set for each item:

- `icon`: The [name of the Icon](components#icon) to show at the left side of the item
- `description`: The description of the item
- `badge`: The badge (text and type) to show at the right side of the item

```ts
const expandedNavItems = [
    {
        text: 'UDK',
        link: '/udk/',
        description: 'Learn more about UDK',
        icon: 'carbon:edit',
    },
    {
        text: 'Blender',
        link: '/blender/',
        description: 'Learn more about Blender',
        icon: 'carbon:cube',
    },
    {
        text: 'Kismet',
        link: '/udk/reference',
        description: 'Learn more about kismet',
        icon: 'carbon:branch'
    },
]

export default nav: DefaultTheme.NavItem[] = [
    {
        text: 'Guide',
        items: [
            {
                // Identifier / key text
                text: 'expanded_menu',
                component: 'ExpandedNavMenu',
                props: {
                    items: expandedNavItems,
                }
            }
        ]
    }
]
```

## Notifications

All theme notifications (banner and inbox) have the following options:

- `id`: this is used to identify if this notification has been dismissed in the local storage.
- `time`: this can be used to set custom start and end times for when to show the notification
- `contexts`: this can be used to only show the notification on local development, staging or production.

A notification will be shown if:

- `contexts` is defined: if the current site is present in one of the contexts
- `time` is defined: if the current epoch is after `time.begin`, if specified, and before `time.end`, if specified.

### Banner

You can display a notification banner at the top of the page

```ts
export default defineConfigWithTheme<ThemeConfig>({
    themeConfig: {
        banner: {
            data: {
                id: 'banner-unique',
                text: 'My banner!',
            },
        },
    },
})
```

Banners can also have a cooldown (set on the banner or in the theme options) that allow the banner to appear again after N days from when an user dismissed the banner, if the banner has the option to be dismissed. The default cooldown is to never show banners again.

You can also set the banner data to an array of banner notifications. The first valid banner will be shown from the array. When that banner is dismissed, the next valid banner (if any) will be shown if `showNextBannerAfterDismiss` is set. Otherwise the next valid banner will be shown on the next page mount.

A banner is valid to be shown if general notifications conditions are met and if:

- `$frontmatter.banner` is not `false` on the current page
- `themeConfig.banner` has banner data
- `themeConfig.banner.enabled` does not return `false` for the current page
- `banner.id` is a string
- a banner is not dismissed or the cooldown for the banner has been over

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
