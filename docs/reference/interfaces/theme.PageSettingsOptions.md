[vuepress-theme-rlmm](../README.md) / [Exports](../modules.md) / [theme](../modules/theme.md) / PageSettingsOptions

# Interface: PageSettingsOptions

[theme](../modules/theme.md).PageSettingsOptions

## Table of contents

### Properties

- [sideMenu](theme.PageSettingsOptions.md#sidemenu)
- [watching](theme.PageSettingsOptions.md#watching)

## Properties

### sideMenu

• `Optional` **sideMenu**: `Object`

Settings for the right side menu

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `enabled?` | `boolean` | For all pages control whether the sidemenu is shown **`Default`** ```ts true ``` |
| `toc?` | { `depth?`: `number` ; `title?`: `string`  } | Settings for headers in the TOC |
| `toc.depth?` | `number` | The maximum header depth for the TOC **`Default`** ```ts $themeConfig.sidebarDepth ``` |
| `toc.title?` | `string` | The title of the TOC **`Default`** ```ts 'On this page' ``` |

#### Defined in

theme.d.ts:222

___

### watching

• `Optional` **watching**: `Object`

Settings for page watching

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `enabled?` | `boolean` | For all pages, control whether watching is shown **`Default`** ```ts true ``` |
| `hidden?` | `boolean` | For all pages, control whether the banner is shown by default. This setting can be configured by the user in the `PageWatchOverview` component **`Default`** ```ts true ``` |
| `managePath?` | `string` | The page where to manage all notifications |
| `publicKey` | `string` | The public key for registering subscriptions |
| `url` | `string` | The url to post the subscriptions to |

#### Defined in

theme.d.ts:192
