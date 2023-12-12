<ActionWindow 
    :states="['setup', 'types', 'advanced', 'finish']"
    style="height: 450px;"
>

<!-- Begin screen -->
<template #intro="{ goNext }">

# How do I start?

Don't know where to start? This flowchart should help.\
Each answer contains useful links and relevant information.

<VPButton text="I want to make a custom map" @click="goNext();" />
</template>

<!-- Setup questions -->
<template #state-setup="{ next, reset, index }">
<VPButton text="Yes" @click="next(2);" v-if="index % 2 === 0" />
<VPButton text="Done" @click="next(1);" v-else />

<VPButton text="No" theme="alt" @click="next(1);" v-if="index % 2 === 0" />
<VPButton text="Back" theme="alt" style="visibility: hidden;"/>
<VPButton text="Reset" theme="alt" @click="reset();" />
</template>

<!-- What type of map? questions -->
<template #state-types="{ next, back, reset }">
<VPButton text="back" @click="back(-1, true);" />
<VPButton text="next" @click="next(1, true);" />
<VPButton text="reset" theme="alt" @click="reset();" />
</template>

<!-- Advanced questions -->
<template #state-advanced="{ next, reset, index }">
<VPButton text="Yes" @click="next(1);" v-if="index % 2 === 0" />
<VPButton text="Done" @click="next(1);" v-else />

<VPButton text="No" theme="alt" @click="next(2);" v-if="index % 2 === 0" />
<VPButton text="Back" theme="alt" style="visibility: hidden;"/>
<VPButton text="Reset" theme="alt" @click="reset();" />
</template>

<!-- End of the flowchart screen -->
<template #state-finish="{ reset, goBack }">
<div style="display: block;">

### You are at the end

<VPButton text="Go back" @click="goBack(-2)" />
<VPButton text="Begin again" theme="alt" @click="reset();" />
</div>
</template>

<!-- Include all the question templates -->
<!--@include: ./questions/setup.md -->
<!--@include: ./questions/types.md -->
<!--@include: ./questions/advanced.md -->

</ActionWindow>
