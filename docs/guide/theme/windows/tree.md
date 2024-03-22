---
title: Tree window
---

<script setup lang="ts">
import { TreeWindow } from '../../../../lib/'
</script>

This component is not installed globally and must be imported from the theme:

```ts
import { TreeWindow } from 'rocketleaguemapmaking/theme-rlmm'
```

## Options

This component expects `Item` to be extending `Record<string, any>`:

| Option name         | Type                | Default   | Description                                                   |
| ------------------- | ------------------- | --------- | ------------------------------------------------------------- |
| data                | `TreeData`          | -         | The raw data to pass to the component                         |
| dataUrl             | string              | undefined | Instead of raw data, the url to fetch the data from           |
| search              | string \| null      | null      | [A search value](#search-value) to filter the tree            |
| transformLoadedItem | (item: any) => Item | undefined | Transform items on load. Used to add references to the parent |
| dataKey             | string              | undefined | The key of the data object which holds the items              |
| isParentKey         | string              | -         | The key of `Item` children that indicates they are a parent   |

> [!INFO]
> One of `data` and `dataUrl` is required

```ts
type TreeData =
    | Item
    | Item[]
    | { [dataKey]: Item[], [idKey]?: string, ...data: MetaData }
```

The first item of the tree is:

- if `TreeData` is `Item`: `Item`
- if `TreeData` is `Item[]`: the first item in the array
- if `dataKey` is defined: the item that has an `idKey` value equal to the one in the object

To define your custom object and have the tree search for the correct properties, the following optional options are also available:

| Option name   | Type   | Default      | Description                                                                                   |
| ------------- | ------ | ------------ | --------------------------------------------------------------------------------------------- |
| idKey         | string | 'id'         | The key of `Item` that is the identifier                                                      |
| childrenKey   | string | 'children'   | The key of `Item` that has the children items                                                 |
| idChildKey    | string | `idKey`      | The key of `Item` children, if different from `idKey`                                         |
| nameChildKey  | string | `idChildKey` | The key of `Item` children to use for `v-bind:key`. Use this if children can have the same id |
| parentListKey | string | undefined    | The key of `Item` that has a list (`string[]`) of ids it is extending from                    |
| parentKey     | string | undefined    | The key of `Item` that has a parent id                                                        |

### Search value

Searching the tree is done by concatenating the parents of an item with a dot and looking for items that match the prefix from the search.

| Search input        | Item matched          |
| ------------------- | --------------------- |
| Controller.bPressed | Controller > bPressed |
| Controller          | Controller            |
| Controller.pressed  | ❌                     |

## Slots

The following slots are exposed:

- `header`: (property: `{ metadata: Metadata }`) placed above the first tree item.
- `item-name`: (property: `{ item: Item }`) to render the (always visible) name of each item
- `item-details`: (property: `{ item: Item, parents: string[] }`) to render the (when opened) properties of each item

## CSS variables

The following CSS variables are registered for this component:

- `--tree-animation-len` (default to `0.1s` and `0s` for reduced motion). Controls the transition duration for toggles.
- `--tree-bg`: (default to `var(--vp-custom-block-details-bg)`). Controls the first child background.
- `--tree-bg-alt`: (default to `var(--vp-custom-block-details-code-bg)`). Controls the next child background.

## Simple array

```mdx
<TreeWindow isParentKey="parent" :data="[
    { id: 'tree', children: [{ id: 'child', parent: true, }] },
    { id: 'child', children: [
        { id: 'child_2', parent: false },
        { id: 'hidden', parent: true }
    ] },
    { id: 'hidden', children: [{ id: 'child', parent: true }] },
]">
<template #item-name="{ item }">
    {{ item.id }}
</template>
<template #item-details="{ item }">
    Is parent: {{ item.parent }}
</template>
</TreeWindow>
```

<TreeWindow isParentKey="parent" :data="[
    { id: 'tree', children: [{ id: 'child', parent: true, }] },
    { id: 'child', children: [{ id: 'child_2', parent: false }, { id: 'hidden', parent: true }] },
    { id: 'hidden', children: [{ id: 'child', parent: true }] },
]">
<template #item-name="{ item }">
    {{ item.id }}
</template>
<template #item-details="{ item }">
    Is parent: {{ item.parent }}
</template>
</TreeWindow>
