- Alias: `TabsWindow`

Splits a window with tabs.

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

The `tabs` property is defining the order, so you can change the order of the templates without changing the view.

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

Set `alignLeft` to disable the headers from using the full width:

<TabsWindow :tabs="['a', 'c', 'b']" :alignLeft="true">

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
