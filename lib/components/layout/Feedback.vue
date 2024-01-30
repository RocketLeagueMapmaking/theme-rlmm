<template>
    <div class="feedback-container" v-if="showFeedback">
        <div class="feedback-question">
            <p v-html="renderHTML(md, text)"></p>
            <div class="feedback-question-actions">
                <div :class="`feedback-question-action-${type}`" v-if="answers[type]?.enabled !== false"
                    v-for="type of types" @click="onClick(type)">
                    <Icon :icon="answers[type]?.icon" v-if="answers[type]?.icon" />
                    <p v-else-if="answers[type]?.text" v-html="renderHTML(md, answers[type]!.text!)"></p>
                </div>
            </div>
        </div>
        <!--- TODO: add form for comments --->
    </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';

import { renderHTML } from '../../util';

import type { FeedbackOptions } from '../../types/';
import { computed } from 'vue';
import { useData } from 'vitepress';

const md = inject<(md: string) => string>('md')!;
const { frontmatter } = useData()

const types: (keyof NonNullable<FeedbackOptions['answers']>)[] = ['yes', 'no']

const props = withDefaults(defineProps<FeedbackOptions>(), {
    text: 'Was this page helpful?',
    position: 'bottom-left',
    answers: () => ({
        yes: {
            enabled: true,
            icon: 'carbon:thumbs-up',
        },
        no: {
            enabled: true,
            icon: 'carbon:thumbs-down',
        },
    })
})

const showFeedback = computed(() => {
    return frontmatter.value.feedback !== false
        && (frontmatter.value.finished !== false ? true : props.showNotFinished ?? false)
})

async function onClick (ctx: typeof types[number]) {
    await props.answers[ctx]?.onClick?.()
    await props.onClick?.(ctx)
}

</script>

<style scoped>
.feedback-question {
    display: flex;
    margin: 20px 0;
    align-items: center;
    color: var(--vp-c-text-2);
}

.feedback-question-actions {
    display: flex;
    margin: 0 10px;
}

.feedback-question-actions div {
    background-color: var(--vp-c-bg-soft);
    border-radius: 6px;
    margin-left: 10px;
    padding: 8px 14px;
}

.feedback-question-actions div:hover {
    cursor: pointer;
    background-color: var(--vp-c-bg-elv);
}

</style>
