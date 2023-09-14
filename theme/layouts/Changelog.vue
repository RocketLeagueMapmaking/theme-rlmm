<template>
    <Layout :disable-sidemenu="true">
        <template #page-header>
            <div class="layout-rlmm-theme-wrapper">
                <div class="changelog-page">
                    <div class="changelog-header">
                        <h1>{{ title }}</h1>
                        <p>{{ description }}</p>
                    </div>

                    <div v-if="content" v-html="content">
                    </div>
                    <div v-else v-for="item in fetchedItems" :key="item.id">
                        <h2>{{ item.name }}
                            <Badge v-if="item.prerelease" text="Pre-release" type="warning" />
                        </h2>
                        <p v-if="item.published_at">Published on {{ new Date(item.published_at).toLocaleString() }}</p>
                        <a v-if="item.html_url" :href="item.html_url">View release
                            <OutboundLink />
                        </a>
                        <p v-html="item.body"></p>
                    </div>
                </div>
            </div>
        </template>
    </Layout>
</template>

<script>
import Layout, { renderMd } from '@theme/layouts/Layout.vue'

export default {
    data() {
        return {
            fetchedItems: [{ name: 'Nothing...', body: 'Nothing to display here...' }],
            content: null,
            title: 'Changelog',
            description: 'A list of all the recent changes',
        }
    },

    components: {
        Layout,
    },

    async created() {
        const options = this.$themeConfig.changelog || {}

        if (options.title) this.title = options.title
        if (options.description) this.description = options.description

        if (options.fetchReleases) {
            const response = await fetch(`https://api.github.com/repos/${this.$themeConfig.repo}/releases`)
                .then(async response => await response.json())
                .catch(error => console.error(error))

            if (response && Array.isArray(response)) {
                this.fetchedItems = response.map(item => {
                    return {
                        name: item.name,
                        published_at: item.published_at,
                        html_url: item.html_url,
                        body: renderMd(item.body),
                        prerelease: item.prerelease,
                    }
                })
            }
        } else if (options.items) {
            this.fetchedItems = options.items
        } else if (options.content) {
            this.content = renderMd(options.content)
            /** @type {RegExpMatchArray | null} */
            const headers = options.content.match(/(?<=## )\d+\.\d+\.\d+/gm)
            this.$page.headers = (headers || []).map(version => ({
                level: 2,
                title: version,
                slug: version,
            }))
        } else {
            throw new Error('No items to fetch or display for the changelog!')
        }
    },
}
</script>

<style scoped>
.changelog-page {
    width: var(--content-width);
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 0 auto;
    align-items: flex-start;
}</style>