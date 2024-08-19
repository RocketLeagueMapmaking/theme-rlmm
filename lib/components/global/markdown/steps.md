- Alias: `StepsWindow`

Make a step by step tutorial in markdown with this component. Note that only length items are shown, if you need more steps change this property to the amount you need!

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
