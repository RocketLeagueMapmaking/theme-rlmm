---
title: List window
outline: deep
---

<script setup lang="ts">
import { ListWindow, NotificationListWindow } from '../../../../lib/'
</script>

This component is not installed globally and must be imported from the theme:

```ts
import { ListWindow } from 'rocketleaguemapmaking/theme-rlmm'
```

## Options

Component: `ListWindow`

| Option name     | Type                               | Default    | Description                                           |
| --------------- | ---------------------------------- | ---------- | ----------------------------------------------------- |
| data            | object[]                           | []         | The raw data to pass to the component                 |
| dataUrl         | string                             | undefined  | Instead of raw data, the url to fetch the data from   |
| idKey           | string                             | 'id'       | The object key that holds the unique id of an object  |
| dataKey         | string                             | undefined  | If the data is an object, the key that holds the list |
| itemStyle       | object                             | {}         | Style to apply to each item                           |
| filter          | [filter function](./search#filter) | () => true | Function to filter items                              |
| sort            | List sort options                  | undefined  | Options to sort items                                 |
| groupByCategory | boolean                            | false      | Whether to group item into categories                 |
| categoryKey     | string                             | undefined  | Required if grouping is enabled                       |

List sort options:

| Option name | Type   | Default | Description                       |
| ----------- | ------ | ------- | --------------------------------- |
| key         | string | -       | The object key to use for sorting |

## Examples

### Simple array

```vue
<ListWindow :data="[{ id: 'one', title: 'One' }, { id: 'two', title: 'Two' }]">
    <template #default="{ item }">
        - {{ item.title }}
    </template>
</ListWindow>
```

<ListWindow :data="[{ id: 'one', title: 'One' }, { id: 'two', title: 'Two' }]">
    <template #default="{ item }">
        - {{ item.title }}
    </template>
</ListWindow>

### Data object

```vue
<ListWindow
    :data="{ data: [{ key: 'one', title: 'One' }, { key: 'two', title: 'Two' }] }"
    idKey="key"
    dataKey="data"
>
    <template #default="{ item }">
        - {{ item.title }}
    </template>
</ListWindow>
```

<ListWindow :data="{ data: [{ id: 'one', title: 'One' }, { id: 'two', title: 'Two' }] }" dataKey="data">
    <template #default="{ item }">
        - {{ item.title }}
    </template>
</ListWindow>

## Notifications

A more advanced list window component is also exported for showing the current notifications: `NotificationListWindow`.

This component is not installed globally and must be imported from the theme:

```ts
import { NotificationListWindow } from 'rocketleaguemapmaking/theme-rlmm'
```

### Options

The data items for this list are the [theme notifications](../configuration#notifications).

The options for this component are the [list options](#options), except for `data`, `dataUrl`, `dataKey`, `categoryKey` and `idKey`.

### Example

```mdx
<NotificationListWindow>
<template #default="{ item }">

### {{ item.title }} <Badge v-for="tag in item.tags ?? []" :text="tag" type="info" />

<p v-html="item.text"></p>

</template>
</NotificationListWindow>
```

<NotificationListWindow>
<template #default="{ item }">

### {{ item.title }} <Badge v-for="tag in item.tags ?? []" :text="tag" type="info" />

<p v-html="item.text"></p>

</template>
</NotificationListWindow>
