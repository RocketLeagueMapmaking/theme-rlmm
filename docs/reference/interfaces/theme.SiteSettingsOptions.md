[vuepress-theme-rlmm](../README.md) / [Exports](../modules.md) / [theme](../modules/theme.md) / SiteSettingsOptions

# Interface: SiteSettingsOptions

[theme](../modules/theme.md).SiteSettingsOptions

## Table of contents

### Properties

- [disabledToggles](theme.SiteSettingsOptions.md#disabledtoggles)
- [enabled](theme.SiteSettingsOptions.md#enabled)
- [icon](theme.SiteSettingsOptions.md#icon)
- [overwriteThemeSwitcher](theme.SiteSettingsOptions.md#overwritethemeswitcher)
- [toggles](theme.SiteSettingsOptions.md#toggles)
- [tooltip](theme.SiteSettingsOptions.md#tooltip)

## Properties

### disabledToggles

• `Optional` **disabledToggles**: `boolean` \| `string`[]

The ids of the toggles to hide.
Use 'true' to hide all toggles.
Default toggles:
'sidemenu': Use new layout
'tooltips': Enable tooltips

**`Default`**

```ts
false
```

#### Defined in

theme.d.ts:178

___

### enabled

• `Optional` **enabled**: `boolean`

Whether to show site settings.
When disabled, also hides the options for theme, tooltips and layout.

**`Default`**

```ts
true
```

#### Defined in

theme.d.ts:149

___

### icon

• `Optional` **icon**: `string`

The settings icon name

**`Default`**

```ts
'fa-solid:sliders-h'
```

#### Defined in

theme.d.ts:162

___

### overwriteThemeSwitcher

• `Optional` **overwriteThemeSwitcher**: `boolean`

Overwrite the settings menu to only behave as a light / dark mode switch
Setting this will cause all other settings options to be ignored!

**`Default`**

```ts
false
```

#### Defined in

theme.d.ts:156

___

### toggles

• `Optional` **toggles**: [`SettingsToggle`](theme.SettingsToggle.md)[]

Custom toggles to register

**`Default`**

```ts
[]
```

#### Defined in

theme.d.ts:185

___

### tooltip

• `Optional` **tooltip**: `string`

If enabled, the tooltip to show when hovering the icon

**`Default`**

```ts
'Settings'
```

#### Defined in

theme.d.ts:168
