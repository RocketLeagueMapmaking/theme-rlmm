<template>
    <div class="beta-header-box">
        <div v-if="enabled" class="beta-header">
            <span 
                class="iconify" 
                :data-icon="iconName" 
                :data-width="iconWidth"
            ></span>

            <p>{{ message }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        enabled: {
            required: true,
            type: Boolean
        },
        message: {
            required: true,
            type: String
        }
    },
    data() {
        return {
            iconWidth: 24,
            iconName: 'ant-design:warning-outlined'
        }
    }
}
</script>

<style scoped>
.iconify {
    color: var(--c-warning-text);
}
.beta-header-box, .beta-header {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
}
.beta-header {
    justify-content: space-between;
    background-color: var(--c-warning);
    /* margin: 2rem 2rem;  */
    margin-top: calc(var(--navbar-height) + var(--navbar-padding-h));
    margin-bottom: -3rem;
    max-width: 500px;
    padding: 2px;
    border: 6px solid var(--c-warning-title);
    border-radius: 8px;
}

.beta-header p {
    color: var(--c-warning-text);
    padding: 0 12px;
    margin: 6px 0px;
}
</style>