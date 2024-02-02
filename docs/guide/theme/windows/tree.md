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
