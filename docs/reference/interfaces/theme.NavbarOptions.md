[vuepress-theme-rlmm](../README.md) / [Exports](../modules.md) / [theme](../modules/theme.md) / NavbarOptions

# Interface: NavbarOptions

[theme](../modules/theme.md).NavbarOptions

## Table of contents

### Properties

- [icons](theme.NavbarOptions.md#icons)
- [notifications](theme.NavbarOptions.md#notifications)
- [notificationsUrl](theme.NavbarOptions.md#notificationsurl)
- [settings](theme.NavbarOptions.md#settings)
- [title](theme.NavbarOptions.md#title)

## Properties

### icons

• `Optional` **icons**: [`NameLinkData`](../modules/theme.md#namelinkdata)[]

Add icon links in the top right of the navbar. The name property is the [iconify](https://iconify.design) icon name.

**`Default`**

```ts
[]
```

#### Defined in

theme.d.ts:257

___

### notifications

• `Optional` **notifications**: [`SiteNotification`](theme.SiteNotification.md)[]

Show banners above the navigation bar. See the type definitions for all options in a notification.

**`Default`**

```ts
[]
```

#### Defined in

theme.d.ts:262

___

### notificationsUrl

• `Optional` **notificationsUrl**: `string`

The url to send a `GET` request to. The request should return `SiteNotification[]` as a JSON body. Only used when `notifications` is empty.

**`Default`**

```ts
undefined
```

#### Defined in

theme.d.ts:267

___

### settings

• `Optional` **settings**: [`SiteSettingsOptions`](theme.SiteSettingsOptions.md)

Options for settings in the navbar

**`Default`**

```ts
undefined
```

#### Defined in

theme.d.ts:272

___

### title

• `Optional` **title**: `string`

Override the title to use in the navbar

**`Default`**

```ts
$siteTitle
```

#### Defined in

theme.d.ts:252
