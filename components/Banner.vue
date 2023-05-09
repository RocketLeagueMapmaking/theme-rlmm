<template>
    <div class="banner-box">
        <div 
            v-if="enabled" 
            class="banner" 
            :style="{ 
                'background-color': typeOptions.color, 
                'justify-content': textPlacement === 'left' ? 'flex-start' : 'space-between' 
            }"
        >
            <span 
                v-if="iconEnabled"
                class="iconify"
                :style="{ color: textColor, 'min-width': iconWidth + 'px' }"
                :data-icon="iconName" 
                :data-width="iconWidth"
            ></span>

            <p :style="{ color: textColor }">{{ message }}</p>
        </div>
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
            required: true,
            type: String,
        },
        textPlacement: {
            required: false,
            type: String,
            default: 'left',
            validator (value) {
                return ['left', 'right'].includes(value)
            },
        }
    },

    data() {
        return {
            iconWidth: 24,
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
        textColor () {
            return this.typeOptions.color.replace(')', '-text)')
        },
        iconName () {
            return this.icon.length > 0 ? this.icon : 'fa-solid:' + this.typeOptions.icon
        }
    },
}
</script>

<style scoped>
.banner-box, .banner {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
}

.banner {
    width: var(--content-width);
    padding: 2px 20px;
    margin: 10px 0;
    border-radius: 8px;
}

.banner p {
    padding: 0 12px;
    margin: 6px 0px;
}
</style>