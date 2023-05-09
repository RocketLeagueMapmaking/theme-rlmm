<template>
    <div v-if="maps.length > 0" class="steam">
        <p style="font-size: xx-large; text-transform: uppercase; margin-top: 50px;">{{ title }}</p>
        <div v-if="type === 'expanded'">
            <div class="steam-map" v-for="map in maps" :key="map.id">
                <img :src="map.preview.url" :alt="`Preview image for map: ${map.title}`" style="max-width: calc(512px)">
                <div class="steam-map-info">
                    <a style="font-size: large;" :href="'https://steamcommunity.com/sharedfiles/filedetails/?id=' + map.id">{{ map.title }}</a> <OutboundLink />
                    <p>Published on {{ new Date(Number(map.time.created.toString() + '000')).toUTCString() }}</p>
                    <p>{{ map.description.slice(0, 250)}}...</p>
                    <a :href="'steam://url/CommunityFilePage/' + map.id"><button>Open in Steam app</button></a>
                    <a :href="map.creator.url"><button>More from {{ map.creator.name }}</button></a>
                </div>
            </div>
        </div>
        <div v-else-if="type === 'list'">
            <ItemList :items="convertToList()" :maxWidth="400" />
        </div>
        <div v-else-if="type === 'gallery'">
            <div v-for="map in maps" :key="map.id">
                <img :src="map.preview.url" :alt="`Preview image for map: ${map.title}`">
            </div>
        </div>
    </div>
</template>

<script>
import ItemList from './ItemList.vue'

export default {
    props: {
        title: {
            type: String,
            required: false,
            default: 'Recent Steam maps'
        },
        amount: {
            type: Number,
            required: false,
            default: 3,
            validator: function (value) {
                return value > 0
            },
        },
        type: {
            typee: String,
            required: false,
            default: 'list',
            validator: function (value) {
                return ['gallery', 'list', 'expanded'].indexOf(value) !== -1
            },
        }
    },

    components: {
        ItemList
    },

    data () {
        return {
            maps: []
        }
    },

    methods: {
        convertToList() {
            return this.maps.map(item => {
                return {
                    title: item.title,
                    description: item.description.slice(0, 250) + '...',
                    image: item.preview.url,
                    actions: [
                        {
                            text: 'Open in Steam app',
                            link: 'steam://url/CommunityFilePage/' + item.id,
                            primary: true
                        },
                        {
                            text: 'More from ' + item.creator.name,
                            link: item.creator.url,
                            primary: false
                        }
                    ]
                }
            })
        },
    },

    async mounted() {
        const res = await fetch('https://ghostrider-05.com/workshop/raw/recent?amount=' + Number(this.amount))
            .then(res => res.ok ? res.json() : [])
        if (res) this.maps = res
    },
}
</script>

<style scoped>
.steam {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.steam-map {
    display: flex;
    flex-direction: row;
    margin: 20px 0px;
}

.steam-map-info {
    width: 100%;
    max-width: 512px;
    background-color: var(--c-bg-light);
    padding: 2rem;
}

button {
  padding: 10px 18px;
  margin: 0px 12px 0px 0px;
  border: 2px solid var(--c-border);
  background-color: transparent;
  color: var(--c-text);
  border-radius: 4px;
}

button:hover {
    cursor: pointer;
    background-color: var(--c-bg);
}

@media screen and (max-width: 979px) {
    .steam-map {
        flex-direction: column;
    }

    .steam-map-info, .steam-map-info p, .steam-map {
        max-width: 90vw !important;
        word-wrap: break-word;
    }

    .steam-map-info {
        width: auto;
        padding: 1rem;
    }

    .steam-map img {
        width: 100%;
    }

    button {
        margin-bottom: 0.8rem;
    }
}
</style>