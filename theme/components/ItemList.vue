<template>
    <div v-if="itemsToList && itemsToList.length > 0" class="home-events">
        <div v-for="(event, index) in itemsToList" :key="index" class="event" :class="{ center: center }">
            <div class="event-text">
                <h1>{{ event.title }}</h1>
                <div>
                    <p v-if="event.description">{{ event.description }}</p>
                </div>
                <a v-for="(action, i) in event.actions" :key="i" :href="action.link">
                    <v-btn :class="{
                        primary: action.primary,
                        'secondary border': !action.primary,
                        margin: i !== 0,
                    }" class="event-buttons">
                        {{ action.text }}
                    </v-btn>
                </a>
            </div>

            <div class="event-image">
                <img :src="event.image" :alt="event.title"
                    :style="{ 'max-width': maxWidth + 'px', ...(maxHeight > 0 ? { 'max-height': maxHeight + 'px' } : {}) }" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            required: false,
            default: () => [],
        },
        center: {
            type: Boolean,
            required: false,
            default: true,
        },
        maxWidth: {
            type: Number,
            required: false,
            default: 600,
        },
        maxHeight: {
            type: Number,
            required: false,
            default: 0,
        },
        fetchUrl: {
            type: String,
            required: false,
            default: '',
        },
    },

    data() {
        return {
            fetchedItems: [],
        }
    },

    computed: {
        itemsToList() {
            return this.fetchedItems.length > 0 ? this.fetchedItems : this.items
        },
    },
    async mounted() {
        if (this.fetchUrl.length > 0) {
            const response = await fetch(this.fetchUrl)
                .then(async response => await response.json())
                .catch(error => console.error(error))

            if (response && Array.isArray(response)) {
                this.fetchedItems = response
            }
        }
    }
};
</script>

<style scoped>
.event-buttons:not(:first-of-type) {
    margin-left: 10px !important;
}

.event-buttons.margin {
    margin-left: 10px;
    /* margin-bottom: 1rem; */
}

.event {
    padding-top: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
}

.event.center {
    justify-content: center !important;
}

.event-text div,
.event-text button,
.event-text h1 {
    margin-left: 10vw;
}

.event-text div {
    max-width: 500px;
    padding-right: 5vw;
}

.event-text button {
    margin-left: 10vw;
}

.event-image {
    display: flex;
    flex-direction: row;
    width: 50%;
    max-width: 80vw;
    padding-left: 15px;
    padding-right: 5vw;
    justify-content: flex-end;
}

.event-text h1 {
    text-transform: uppercase;
    font-size: 30px;
    /* margin-left: 10vw; */
    margin-bottom: 24px;
}

.event-text h1 span {
    color: var(--c-accent);
    font-size: 26px;
}

@media screen and (max-width: 600px) {
    .event-image {
        padding-left: 5vw;
    }

    .event-image img {
        max-width: 80vw !important;
    }

    .event-buttons {
        margin-bottom: 10px;
    }
}

@media screen and (max-width: 1000px) {
    .event-image {
        width: 70vw;
        align-items: center;
        justify-content: center;
    }
}

@media screen and (max-width: 1215px) {
    .event {
        flex-direction: column;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>