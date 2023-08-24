<template>
    <div>
        <v-banner
            :style="{ '--color': bgColorValue, '--color-hover': getString(backgroundHoverColor, bgColorValue) }"
            class="d-flex align-center justify-center flex-wrap flex-row my-4"
            rounded
            shaped
            single-line
            v-if="enabled"
        >
            <div class="d-flex align-center flex-row" :style="{ justifyContent: textPlacement === 'right' ? 'space-between' : undefined }">
                <Icon :icon="iconName" v-if="iconEnabled" :style="{ width: iconWidth + 'px' }" />
                <p class="banner-message px-md-5" :style="{ color: textColorValue }">
                    <slot :style="{ color: textColorValue }">{{ message }}</slot>
                </p>
            </div>
        </v-banner>
    </div>
</template>

<script>
export default {
    props: {
        enabled: {
            required: false,
            type: Boolean,
            default: true
        },
        iconEnabled: {
            required: false,
            type: Boolean,
            default: true
        },
        type: {
            required: false,
            type: String,
            default: 'tip',
            validator: (value) => {
                const allowedTypes = ['info', 'warning', 'danger', 'tip']

                return allowedTypes.some(item => item === value)
            },
        },
        icon: {
            required: false,
            type: String,
            default: ''
        },
        message: {
            required: false,
            type: String,
        },
        textPlacement: {
            required: false,
            type: String,
            default: 'left',
            validator (value) {
                return ['left', 'right'].includes(value)
            },
        },
        textColor: {
            required: false,
            type: String,
            default: '',
        },
        backgroundColor: {
            required: false,
            type: String,
            default: '',
        },
        backgroundHoverColor: {
            required: false,
            type: String,
            default: '',
        },
    },

    data() {
        return {
            iconWidth: 40,
            defaultTypes: [
                { type: 'tip', icon: 'check-circle', color: 'var(--c-tip)' },
                { type: 'warning', icon: 'bullhorn', color: 'var(--c-warning)' },
                { type: 'danger', icon: 'exclamation-triangle', color: 'var(--c-danger)' },
                { type: 'info', icon: 'edit', color: 'var(--c-info)' },
            ]
        }
    },

    computed: {
        typeOptions () {
            return this.defaultTypes.find(t => t.type === this.type)
        },
        textColorValue () {
            return this.getString(this.textColor, this.typeOptions.color.replace(')', '-text)'))
        },
        iconName () {
            return this.getString(this.icon, 'fa-solid:' + this.typeOptions.icon)
        },
        bgColorValue () {
            return this.getString(this.backgroundColor, this.typeOptions.color)
        },
    },

    methods: {
        getString (value, valueIfEmpty) {
            return value.length > 0 ? value : valueIfEmpty
        },
    },
}
</script>

<style scoped>
.v-banner {
    background-color: var(--color) !important;
}

.v-banner:hover {
    background-color: var(--color-hover) !important;
    /* cursor: pointer; */
}

.banner-message {
    line-height: 1.5em;
    max-width: 70vw; 
    white-space: break-spaces;
    display: contents;
}

@media screen and (max-width: 768px) {
    .banner-message {
        height: 3em; 
    }
}
</style>