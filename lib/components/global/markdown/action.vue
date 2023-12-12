<template>
    <div class="action-screen">
        <div class="intro" v-if="state === 'intro'">
            <slot name="intro" :goNext="goNext" />
        </div>
        <div class="state" id="state-container" v-else>
            <slotComponent :elem="getSecondaryState()" :data="slotData" />
            <div class="state-container-actions">
                <slot :name="`state-${state}`" :goNext="goNext" :goBack="goBack" :next="goNextSecondary"
                    :back="goBackSecondary" :reset="reset" :index="secondaryIndex" :data="getSecondaryState()" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'

const slotComponent = defineComponent({
    props: ['elem', 'data'],
    render() {
        return h('div', {
            style: {
                minHeight: 'fit-content',
            }
        }, this.$props.elem?.(this.$props.data) ?? [])
    }
})

export default defineComponent({
    components: {
        slotComponent,
    },

    props: {
        states: {
            type: Array<string>,
            required: true,
            validator: function (value: string[]) {
                return value.length > 0
            },
        },
    },

    computed: {
        slotData: function () {
            return {
                index: this.secondaryIndex,
                goBack: this.goBack,
                goNext: this.goNext,
                reset: this.reset,
                next: this.goNextSecondary,
                back: this.goBackSecondary,
                data: this.getSecondaryState(),
            }
        }
    },

    data() {
        return {
            state: 'intro',
            secondaryState: null as string | null,
            index: 0,
            secondaryIndex: 0,
        }
    },

    methods: {
        goToNextState(states: string, index: string, state: string, d: number) {
            if (this[states].length === 0) return
            if (this[states].length === this[index] && d >= 0) {
                throw new Error('No state found')
            }

            if (this[index] < 0) {
                this[state] = 'intro'
                this[index] = 0
                this.secondaryIndex = 0
            } else {
                this[state] = this[states][this[index]]
                this[index] += d
                this.secondaryIndex = 0
            }

            this.secondaryState = null
            if (this[state] == undefined) {
                this[state] = this[states][this[index] - 1]
            }

            console.debug('Going to state ', this[state], this[index])
        },

        changeSecondaryState: function (d: number) {
            const value = this.secondaryIndex + d

            if (value < 0) return false
            if (this.getSecondaryState(value) == undefined) return false
            this.secondaryIndex += d
            return true
        },

        getSecondaryState: function (index?: number) {
            const name = `${this.state}-${this.secondaryState ? `${this.secondaryState}-` : ''}${index ?? this.secondaryIndex}`

            return this.$slots[name]
        },

        reset: function () {
            this.state = 'intro'
            this.index = 0
            this.secondaryIndex = 0
        },

        goNext: function (step?: number, secondary?: { step?: number, state?: string }) {
            this.goToNextState('states', 'index', 'state', step ?? 1)

            if (secondary?.step) {
                this.goNextSecondary(secondary.step, true)
            }

            if (secondary?.state) {
                this.secondaryState = secondary.state
            }
        },

        goBack: function (step?: number) {
            this.goToNextState('states', 'index', 'state', step ?? -1)
        },

        goNextSecondary: function (step?: number, stayState?: boolean) {
            const changed = this.changeSecondaryState(step ?? 1)
            if (!changed && !stayState) {
                this.goNext()
            }
        },

        goBackSecondary: function (step?: number, stayState?: boolean) {
            const changed = this.changeSecondaryState(step ?? -1)
            if (!changed && !stayState) {
                this.goBack()
            }
        },
    }
})
</script>

<style scoped>
.action-screen {
    background-color: var(--vp-c-bg-soft);
    min-height: fit-content;
    border-radius: 10px;
}

.action-screen .intro,
.action-screen .state {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.action-screen .state {
    align-items: flex-start;
    padding: 10vw 5vw;
}

.state-container-actions {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
}

.state-container-actions:deep(.VPButton) {
    margin-right: 20px;
}
</style>
