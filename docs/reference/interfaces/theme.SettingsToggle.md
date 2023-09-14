[vuepress-theme-rlmm](../README.md) / [Exports](../modules.md) / [theme](../modules/theme.md) / SettingsToggle

# Interface: SettingsToggle

[theme](../modules/theme.md).SettingsToggle

## Table of contents

### Properties

- [id](theme.SettingsToggle.md#id)
- [invert](theme.SettingsToggle.md#invert)
- [key](theme.SettingsToggle.md#key)
- [minWidth](theme.SettingsToggle.md#minwidth)
- [storageId](theme.SettingsToggle.md#storageid)
- [text](theme.SettingsToggle.md#text)
- [tooltip](theme.SettingsToggle.md#tooltip)

## Properties

### id

• **id**: `string`

The unique id for this toggle
Used for [SiteSettingsOptions.disabledToggles](theme.SiteSettingsOptions.md#disabledtoggles)

#### Defined in

theme.d.ts:107

___

### invert

• `Optional` **invert**: `boolean`

Invert the displayed value.
Used for displayed `Use this`, while in code referencing it as disable..

**`Default`**

```ts
false
```

#### Defined in

theme.d.ts:134

___

### key

• **key**: `string`

The JavaScript

#### Defined in

theme.d.ts:117

___

### minWidth

• `Optional` **minWidth**: `number`

Only enable this toggle when the window is larger than this size

**`Default`**

```ts
-1
```

#### Defined in

theme.d.ts:140

___

### storageId

• **storageId**: `string`

The id for storing this value in local storage

#### Defined in

theme.d.ts:112

___

### text

• **text**: `string`

Text displayed in the menu

#### Defined in

theme.d.ts:122

___

### tooltip

• **tooltip**: `string`

With tooltips enabled, show this text on hover

#### Defined in

theme.d.ts:127
