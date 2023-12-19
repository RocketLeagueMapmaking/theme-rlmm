# Components

There a few types of components installed globally:

- `general`: useful components that don't fit any other category
- `markdown`: component wrappers that you can use in markdown
- `RL`: components that display something with Rocket League

:::warning Markdown in templates

When a component has a slot / template, an empty line is needed between the template tag and the markdown

This will render as normal text:

```md
<template #name>
## Markdown
</template>
```

This will render as markdown text:

```md
<template #name>

## Markdown
</template>
```

In a markdown editor, you will also see the second example highlighted indicating that it will be rendered as markdown.
:::

## PreferenceSetting <Badge type="info" text="general component" />

Component to show or allow to set a value that gets stored in the local storage of the current browser.

The default slot is the text associated with the action. Use the `storeKey` property to decide which local storage key the value will get and `defaultValue` to set the current value if nothing has been set yet.

| Option name  | Type                                            | Default     | Description                                               |
| ------------ | ----------------------------------------------- | ----------- | --------------------------------------------------------- |
| storeKey     | `'rlmm-${string}'`                              | -           | The key to store in the local storage                     |
| type         | [setting type](#setting-types)                  | `'switch'`  | The type of option                                        |
| renderValue  | `boolean`                                       | `false`     | Set to only show the setting value                        |
| defaultValue | `any`                                           | `false`     | The value when unset. Must be the same type as the option |
| isAppearance | `boolean`                                       | `false`     | For switch option, use the theme switcher                 |
| options      | `string[]`                                      | `[]`        | For select option, the available choices                  |
| onChanged    | `(option: { key: string, value: any }) => void` | `undefined` | Hook that is called when the option is changed            |

### Setting types

The allowed `type`s are:

- `'switch'`: toggle for boolean values
- `'input'`: input field for string values
- `'select'`: select field for string array values

```ts
<PreferenceSetting storeKey="rlmm-path-udk" defaultValue="C:\UDK\RLMM\" type="input">
    UDK Installation folder
</PreferenceSetting>
```

:::tip Get settings value
To get a setting value in a component, use the [`getSettings`](util#getsettings) function
:::

### Show value

Showing a value is handled with `renderValue` property set to `true`. You don't need to set the default slot when showing the value.

:::details Example

```ts
<PreferenceSetting :renderValue="true" storeKey="rlmm-path-udk" defaultValue="C:\UDK\RLMM\" type="input" />
```

<PreferenceSetting :renderValue="true" storeKey="rlmm-path-udk" defaultValue="C:\UDK\RLMM\" type="input" />

:::

## ActionWindow <Badge type="info" text="markdown component" />

A component that allows you to easily make advanced windows with actions at the bottom of the window to switch between different states or templates within states. Can be combined with [markdown file inclusion](https://vitepress.dev/guide/markdown#markdown-file-inclusion) to separate the actions and views. If you only have templates in the question files, exclude them from the build files using `srcExclude`.

:::details Example

See [the flowchart](../udk/index.md#flowchart)

:::

## StepsWindow <Badge type="info" text="markdown component" />

Make a step by step tutorial in markdown with this component.

| Option name | Type                         | Default   | Description                                                                                                       |
| ----------- | ---------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------- |
| length      | `number`                     | `20`      | The maximum amount of steps that are rendered. If you need more steps change this property to the amount you need |
| color       | [theme color](#theme-colors) | `'brand'` | The color of the step numbers                                                                                     |

:::details Example

```md
<StepsWindow color="indigo">
<template #step-1>

### Install the installer

do some trick

do another trick

- list item
- another one

</template>
<template #step-2>

### Run the installer

press start

</template>
</StepsWindow>
```

<StepsWindow color="indigo">
<template #step-1>

### Install the installer

do some trick

do another trick

- list item
- another one

</template>
<template #step-2>

### Run the installer

press start

</template>
</StepsWindow>

:::

## TabsWindow <Badge type="info" text="markdown component" />

Splits a window with tabs

| Option name    | Type       | Required | Description                                                                                     |
| -------------- | ---------- | -------- | ----------------------------------------------------------------------------------------------- |
| tabs           | `string[]` | `true`   | The array of tab names in the order to display the tabs                                         |
| activeTab      | `string`   | `false`  | The name of the tab to open when mounted. Defaults to the first tab                             |
| activeTabKey   | `string`   | `false`  | The local storage key that will be the default tab on opening. Not used when `activeTab` is set |
| tabStyle       | `object`   | `false`  | Optional style for every tab name                                                               |
| activeTabStyle | `object`   | `false`  | Optional style for the active tab name                                                          |

Each tab is a separate `<template>` with the name `tab-${name_in_snake_case}`

```md
<TabsWindow :tabs="['Snake case']">

<template #tab-snake_case>
This is a tab
</template>
</TabsWindow>
```

<TabsWindow :tabs="['Snake case']">

<template #tab-snake_case>
This is a tab
</template>
</TabsWindow>

To add more tabs, add the name in the array with the title and add the tab with the corresponding snake case name by adding a new template. Then you can write in markdown what to display when the tab is active.

:::details Example

```md
<TabsWindow :tabs="['a', 'c', 'b']">

<template #tab-a>
This is Tab A
</template>
<template #tab-b>
This is Tab B
</template>
<template #tab-c>
This is Tab C
</template>

</TabsWindow>

```

<TabsWindow :tabs="['a', 'c', 'b']">

<template #tab-a>
This is Tab A
</template>
<template #tab-b>
This is Tab B
</template>
<template #tab-c>
This is Tab C
</template>

</TabsWindow>

:::

## SteamMaps <Badge type="info" text="RL component" />

Shows the most recent published / updated maps on the Rocket League Steam workshop.

| Option name     | Type                          | Default               | Description                                                                                           |
| --------------- | ----------------------------- | --------------------- | ----------------------------------------------------------------------------------------------------- |
| amount          | `number`                      | `3`                   | The amount of maps to display                                                                         |
| sortBy          | `'created' \| 'updated'`      | `'created'`           | Whether to show recent published or updated maps                                                      |
| title           | `string`                      | `'New workshop maps'` | The title above the map(s)                                                                            |
| enabled         | `boolean`                     | `true`                | Option to disable the component                                                                       |
| displayTime     | `number`                      | `10_000`              | The amount of ms before the next map is shown. Set to a negative number to disable this               |
| handleException | `Function`                    | `console.error`       | Method to handle errors / empty responses                                                             |
| disableClick    | `boolean`                     | `false`               | Option to disable going to the next map by clicking on the current map. Will open the map on clicking |
| urlProtocol     | [url protocol](#url-protocol) | `setting-windows`     | Where to open Steam urls                                                                              |

:::tip Colored title
The `title` option renders as HTML making it customisable to style.
By default any `span` element in the title will be the brand color.
:::

### Url protocol

The local storage key `rlmm-urls-steam` is used to read the user settings

Available options:

- `'setting-windows'`: if on Windows and the setting is enabled, open urls in the Steam app
- `'setting'`: if the setting is enabled, always open urls in the Steam app
- `'app-windows'`: if on Windows, open urls in the Steam app
- `'app'`: always open urls in the Steam app
- `'browser'`: always open urls in the internet browser

:::details Example

```md
<SteamMaps :amount="1" :displayTime="-1" :disableClick="true"/>
```

<SteamMaps :amount="1" :displayTime="-1" :disableClick="true"/>

:::

## Misc

### Theme colors

- `'brand'`
- `'default'`
- `'gray'`
- `'green'`
- `'indigo'`
- `'red'`
- `'yellow'`
