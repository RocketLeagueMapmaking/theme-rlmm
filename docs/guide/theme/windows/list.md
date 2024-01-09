---
title: List window
---

<script setup lang="ts">
import { ListWindow } from '../../../../lib/'
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
