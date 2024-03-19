---
title: Search block
---

<script setup lang="ts">
import { SearchBlock } from '../../../../lib/'

const someDataArray = [
    { name: 'test', type: 'test', test_value: true },
    { name: 'other', type: 'rest' },
]
</script>

This component is not installed globally and must be imported from the theme:

```ts
import { SearchBlock } from 'rocketleaguemapmaking/theme-rlmm'
```

## Options

This component expects `Item` to be extending `Record<string, any>`:

| Option name    | Type             | Default    | Description                                     |
| -------------- | ---------------- | ---------- | ----------------------------------------------- |
| searchKey      | string           | -          | The key of `Item` to use for input search       |
| urlSearchParam | string           | `'search'` | The url parameter to use for the current search |
| text           | `SearchText`     | undefined  | The text to show in the search UI               |
| filters        | `SearchFilter[]` | `[]`       | Additional filters to have more search options  |

| Search text       | Default     |
| ----------------- | ----------- |
| searchPlaceholder | `Search...` |
| reset             | `Reset`     |

```ts
type BaseSearchFilter<Type extends string, Options extends object> = {
    type: Type
    searchParam?: string
    itemKey: string
} & Options

type SearchFilter =
    | BaseSearchFilter<'select', { options: string[] }>
    | BaseSearchFilter<'switch', { label: string, invert?: boolean }>
```

The component will render:

- one input field. This is using the `searchKey` and `urlSearchParam` to filter items based on text
- filters (if configured):
  - dropdown (`select`): the value in the dropdown must be equal to the value of the item to be shown
  - toggle (`switch`): the value of the toggle must be equal to the boolean value of the item to be shown

## Slots

The following slots are exposed:

- `default`: (property: { filter: (item: Item): boolean, search: string | null }) used for connecting the search filter with data
- `search-input`: (property: `{ search: string | null }`) used to replace the search input
- `reset-btn`: (property: `{ search: string | null, reset: (): void }`) used to replace the reset button

## filter

```ts
function filter(item: Item): boolean
```

The filter function will combine all options in the search component and return if it matches all filters.
Then in your code, pass the `filter` function to another component (if supported) or filter items yourself:

```vue
<SearchBlock>
<template #default="searchOptions">
    <ListWindow v-bind="{ ...searchOptions, ...otherOptions }">
        ...slots
    </ListWindow>
</template>
</SearchBlock>
```

```vue
<SearchBlock>
<template #default="{ filter, search }">
    Currently searching: {{ search }}
    Matching items: {{ someDataArray.filter(filter) }}
</template>
</SearchBlock>
```

## Example

<SearchBlock searchKey="name" :filters="[{ type: 'select', itemKey: 'type', options: ['test', 'rest' ] }, { type: 'switch', itemKey: 'test_value', label: 'Is testing' }]">
<template #default="{ filter, search }">

Currently searching: {{ [search] }}

Matching items: {{ someDataArray.filter(filter).map(n => n.name) }}
</template>
</SearchBlock>
