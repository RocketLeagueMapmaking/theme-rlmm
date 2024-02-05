<template>
    <div class="feedback-container" v-if="showFeedback">
        <div class="feedback-question">
            <p v-html="renderHTML(md, text)"></p>
            <div class="feedback-question-actions">
                <div :class="{ [`feedback-question-action-${ctx}`]: true, active: ctx === answer }" @click="onClick(ctx)"
                    :title="answers[ctx]?.title" :aria-label="answers[ctx]?.label" :key="ctx" v-for="ctx in types">
                    <span v-if="answers[ctx]?.enabled !== false">
                        <Icon :icon="answers[ctx]?.icon" v-if="answers[ctx]?.icon" />
                        <p v-else-if="answers[ctx]?.text" v-html="renderHTML(md, answers[ctx]!.text!)">
                        </p>
                    </span>
                </div>
            </div>
        </div>
        <!-- Form to show when clicking on an answer -->
        <div class="feedback-form" v-if="form?.enabled && answer && getFields(answer).length > 0">
            <div class="feedback-form-fields">
                <div class="feedback-form-field" v-for="field in getFields(answer)">
                    <p>
                        {{ field.text }}
                    </p>
                    <input v-if="field.type === 'input'" :placeholder="field.placeholder">
                    <textarea v-else-if="field.type === 'textarea'" :placeholder="field.placeholder"></textarea>
                </div>
            </div>
            <div class="feedback-form-actions">
                <VPButton theme="alt" :text="form.cancelText ?? 'Cancel'" @click="answer = undefined" />
                <VPButton :text="form.submitText ?? 'Submit'" @click="onClick(answer, true)" />
            </div>
        </div>
        <div v-if="submitted">
            <component v-if="renderAfterSubmitted" :is="renderAfterSubmitted?.()" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, h, inject, ref } from 'vue';
import { onContentUpdated, useData } from 'vitepress';

import { renderHTML } from '../../util';

import type { FeedbackOptions } from '../../types/';

const md = inject<(md: string) => string>('md')!;
const { frontmatter, page } = useData()

type FeedbackType = keyof NonNullable<FeedbackOptions['answers']>
const types: FeedbackType[] = ['yes', 'no']
const answer = ref<FeedbackType>(), submitted = ref(false)

const props = withDefaults(defineProps<FeedbackOptions>(), {
    text: 'Was this page helpful?',
    position: 'bottom-left',
    form: () => ({
        enabled: true,
    }),
    answers: () => ({
        yes: {
            enabled: true,
            title: 'This page was useful',
            label: 'This page was useful',
            icon: 'carbon:thumbs-up',
        },
        no: {
            enabled: true,
            title: 'This page was not useful',
            label: 'This page was not useful',
            icon: 'carbon:thumbs-down',
        },
    }),
    renderAfterSubmitted: () => h('p', 'Thanks for submitting!')
})

const pageData = computed(() => page.value)
const showFeedback = computed(() => {
    return frontmatter.value.feedback !== false
        && (frontmatter.value.finished !== false ? true : props.showNotFinished ?? false)
})

// Switched page, reset options
onContentUpdated(() => {
    submitted.value = false
    answer.value = undefined
})

function getFields(ctx: FeedbackType) {
    return props.answers[ctx]?.form?.fields ?? []
}

async function onClick(ctx: FeedbackType, isForm = false) {
    answer.value = ctx
    if (!isForm && props.form?.enabled && getFields(ctx).length > 0) return

    await props.answers[ctx]?.onClick?.(pageData.value)
    await props.onClick?.(ctx, pageData.value)

    if (props.answers[ctx]?.onClick == undefined && props.onClick == undefined) {
        console.log(`New feedback collected: ${ctx}`)
    }

    submitted.value = true
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
    border: 1px solid var(--vp-c-border);
    border-radius: 6px;
    margin-left: 10px;
    padding: 8px 14px;
}

.feedback-question-actions div.active {
    /* cursor: pointer; */
    border: 1px solid var(--vp-c-brand-3) !important;
}

.feedback-question-actions div:hover {
    cursor: pointer;
    background-color: var(--vp-c-bg-elv);
}

.feedback-form {
    border: 1px solid var(--vp-c-border);
    border-radius: 6px;
    padding: 20px;
    margin-bottom: 20px;
    color: var(--vp-c-text-1);
    background-color: var(--vp-c-bg-alt);
}

.feedback-form-field {
    border-radius: 6px;
    margin: 12px 0;
}

.feedback-form-field p {
    margin-bottom: 6px;
}

.feedback-form-field input, .feedback-form-field textarea {
    background-color: var(--vp-c-bg);
    width: 100%;
}

.feedback-form-field textarea {
    height: 100px;
}

.feedback-form-fields {
    margin-bottom: 10px;
}

.feedback-form-actions :first-child {
    margin-right: 10px;
}
</style>
