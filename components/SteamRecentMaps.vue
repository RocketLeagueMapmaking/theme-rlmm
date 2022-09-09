<template>
    <div v-if="maps.length > 0" class="steam">
        <p style="font-size: xx-large; text-transform: uppercase; margin-top: 50px;">Recent Steam maps</p>
        <div class="steam-map" v-for="map in maps" :key="map.id">
            <img :src="map.preview.url" alt="" style="max-width: calc(512px + 4rem)">
            <div class="steam-map-info">
                <a style="font-size: large;" :href="'https://steamcommunity.com/sharedfiles/filedetails/?id=' + map.id">{{ map.title }}</a> <OutboundLink />
                <p>Published on {{ new Date(Number(map.time.created.toString() + '000')).toUTCString() }}</p>
                <p>{{ map.description.slice(0, 250)}}</p>
                <a :href="'steam://url/CommunityFilePage/' + map.id"><button>Open in Steam app</button></a>
                <a :href="map.creator.url"><button>{{ map.creator.name }}</button></a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            maps: []
        }
    },

    async mounted() {
        const res = await fetch('https://ghostrider-05.com/workshop/raw/recent?amount=3')
            .then(res => res.ok ? res.json() : [])
        this.maps = res
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
    width: 75%;
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
}
</style>