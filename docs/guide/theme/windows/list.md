---
title: List window
---

<script setup lang="ts">
import { ListWindow, NotificationListWindow } from '../../../../lib/'
</script>

Component: `ListWindow`

Options:

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

This component is not installed globally and must be imported from the theme:

```ts
import { ListWindow } from 'rocketleaguemapmaking/theme-rlmm'
```

## Simple array

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

## Data object

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

```mdx
<NotificationListWindow>
<template #default="{ item }">

### {{ item.title }} <Badge text="tag" type="info" />

<p v-html="item.text"></p>

</template>
</NotificationListWindow>
```

<NotificationListWindow>
<template #default="{ item }">

### {{ item.title }} <Badge text="tag" type="info" />

<p v-html="item.text"></p>

</template>
</NotificationListWindow>
