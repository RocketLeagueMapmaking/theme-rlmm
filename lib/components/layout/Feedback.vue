<template>
    <div class="feedback-container" v-if="showFeedback">
        <div class="feedback-question">
            <p v-html="renderText(text)"></p>
            <div class="feedback-question-actions">
                <div :class="{ [`feedback-question-action-${ctx}`]: true, active: ctx === answer }" @click="onClick(ctx)"
                    :title="options[ctx]?.title" :aria-label="options[ctx]?.label" :key="ctx" v-for="ctx in types">
                    <span v-if="options[ctx]?.enabled !== false">
                        <Icon :icon="options[ctx]?.icon" v-if="options[ctx]?.icon" />
                        <p v-else-if="options[ctx]?.text" v-html="renderText(options[ctx]!.text!)">
                        </p>
                    </span>
                </div>
            </div>
        </div>
        <!-- Form to show when clicking on an answer -->
        <div class="feedback-form" v-if="form?.enabled && answer && !submitted && getFields(answer).length > 0">
            <div class="feedback-form-fields">
                <div class="feedback-form-field" v-for="field, i in getFields(answer)">
                    <p>
                        {{ field.text }}
                    </p>
                    <input v-if="field.type === 'input'" :placeholder="field.placeholder" v-model="fieldAnswers[i]">
                    <textarea v-else-if="field.type === 'textarea'" :placeholder="field.placeholder" v-model="fieldAnswers[i].value"></textarea>
                </div>
            </div>
            <div class="feedback-form-actions">
                <VPButton theme="alt" :text="form.cancelText ?? 'Cancel'" @click="answer = undefined" />
                <VPButton :text="form.submitText ?? 'Submit'" @click="onClick(answer!, true)" />
            </div>
        </div>
        <div v-if="submitted">
            <component v-if="renderAfterSubmitted" :is="renderAfterSubmitted?.(answer!)" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, h, mergeProps, ref } from 'vue';
import { onContentUpdated, useData } from 'vitepress';

import { renderText } from '../../util';

import type { FeedbackOptions } from '../../types/';

const { frontmatter, page } = useData()

type FeedbackType = keyof NonNullable<FeedbackOptions['answers']>
const types: FeedbackType[] = ['yes', 'no']
const answer = ref<FeedbackType>(), submitted = ref(false)

const defaultAnswers: Required<FeedbackOptions['answers']> = {
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
}

const props = withDefaults(defineProps<FeedbackOptions>(), {
    text: 'Was this page helpful?',
    position: 'bottom-left',
    form: () => ({
        enabled: true,
    }),
    answers: () => ({}),
    renderAfterSubmitted: (answer: 'yes' | 'no') => h('p', `Thanks for submitting: ${answer}!`),
})

const options: Required<NonNullable<FeedbackOptions['answers']>> = {
    // @ts-expect-error
    yes: mergeProps(props.answers.yes ?? defaultAnswers.yes, defaultAnswers.yes),
    // @ts-expect-error
    no: mergeProps(props.answers.no ?? defaultAnswers.no, defaultAnswers.no),
}

const fieldAnswers = Array.from({ length: Math.max(options.no.form?.fields.length ?? 0, options.yes.form?.fields.length ?? 0) }, () => ref<string>(''))

const pageData = computed(() => page.value)
const showFeedback = computed(() => {
    return frontmatter.value.feedback !== false
        && (frontmatter.value.finished !== false ? true : props.showNotFinished ?? false)
})

function reset () {
    submitted.value = false
    answer.value = undefined
}

// Switched page, reset options
onContentUpdated(() => reset())

function getFields(ctx: FeedbackType) {
    return options[ctx]?.form?.fields ?? []
}

async function onClick(ctx: FeedbackType, isForm = false) {
    const isChanging = answer.value !== ctx

    if (submitted.value && isChanging) {
        return
    }

    answer.value = ctx
    if (!isForm && props.form?.enabled && getFields(ctx).length > 0) {
        if (isChanging) fieldAnswers.forEach(a => a.value = '')
        return
    }
    const fields = fieldAnswers.map(a => a.value)

    await options[ctx]?.onClick?.(pageData.value, fields)
    await props.onClick?.(ctx, pageData.value, fields)

    if (options[ctx]?.onClick == undefined && props.onClick == undefined) {
        console.log(`New feedback collected: ${ctx}\nFields:\n${fields.join('\n')}`)
    }

    submitted.value = true
    fieldAnswers.forEach(a => a.value = '')
    setTimeout(() => reset(), 5000)
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
