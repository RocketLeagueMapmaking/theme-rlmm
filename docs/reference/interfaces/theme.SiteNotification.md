[vuepress-theme-rlmm](../README.md) / [Exports](../modules.md) / [theme](../modules/theme.md) / SiteNotification

# Interface: SiteNotification

[theme](../modules/theme.md).SiteNotification

## Table of contents

### Properties

- [color](theme.SiteNotification.md#color)
- [dismisseable](theme.SiteNotification.md#dismisseable)
- [endDate](theme.SiteNotification.md#enddate)
- [inbox](theme.SiteNotification.md#inbox)
- [message](theme.SiteNotification.md#message)
- [once](theme.SiteNotification.md#once)
- [pages](theme.SiteNotification.md#pages)
- [priority](theme.SiteNotification.md#priority)
- [shortMessage](theme.SiteNotification.md#shortmessage)
- [startDate](theme.SiteNotification.md#startdate)
- [storageKey](theme.SiteNotification.md#storagekey)
- [textColor](theme.SiteNotification.md#textcolor)

## Properties

### color

• `Optional` **color**: `string`

#### Defined in

theme.d.ts:64

___

### dismisseable

• `Optional` **dismisseable**: `boolean`

Allow the user to remove the notification. Will not reappear if `once` is set

#### Defined in

theme.d.ts:50

___

### endDate

• `Optional` **endDate**: `number`

Only show the notification before this epoch timestamp

**`Default`**

```ts
-1
```

#### Defined in

theme.d.ts:42

___

### inbox

• `Optional` **inbox**: `boolean`

Show the notification in an inbox type component

**`Default`**

```ts
false
```

#### Defined in

theme.d.ts:73

___

### message

• **message**: `string`

#### Defined in

theme.d.ts:27

___

### once

• `Optional` **once**: `boolean`

Show it only once, will not reappear after dismissed

#### Defined in

theme.d.ts:46

___

### pages

• `Optional` **pages**: `string`[]

Only show it on a page that is on of these page slugs

**`Default`**

```ts
[]
```

#### Defined in

theme.d.ts:55

___

### priority

• `Optional` **priority**: `number`

Assign a priority to this notification when multiple notifications are present. The highest gets shown first

**`Default`**

```ts
0
```

#### Defined in

theme.d.ts:60

___

### shortMessage

• `Optional` **shortMessage**: `string`

On small pages, show this message instead

**`Default`**

```ts
the message of this notification
```

#### Defined in

theme.d.ts:32

___

### startDate

• `Optional` **startDate**: `number`

Only show the notification after this epoch timestamp

**`Default`**

```ts
-1
```

#### Defined in

theme.d.ts:37

___

### storageKey

• **storageKey**: `string`

An unique key for dismisseable notifications

#### Defined in

theme.d.ts:26

___

### textColor

• `Optional` **textColor**: `string`

The text color for the notification

#### Defined in

theme.d.ts:68
