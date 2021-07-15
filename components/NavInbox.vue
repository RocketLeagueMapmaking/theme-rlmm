<template>
    <div v-if="watchingEnabled">
        <div class="bell-icon" @click="toggleInbox()">
            <div v-if="newNotification">

            </div>
            <div v-else>
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet" fill="var(--c-text)"  viewBox="0 0 1664 1792"><path d="M848 1696q0-16-16-16q-59 0-101.5-42.5T688 1536q0-16-16-16t-16 16q0 73 51.5 124.5T832 1712q16 0 16-16zm-666-288h1300q-266-300-266-832q0-51-24-105t-69-103t-121.5-80.5T832 256t-169.5 31.5T541 368t-69 103t-24 105q0 532-266 832zm1482 0q0 52-38 90t-90 38h-448q0 106-75 181t-181 75t-181-75t-75-181H128q-52 0-90-38t-38-90q50-42 91-88t85-119.5t74.5-158.5t50-206T320 576q0-152 117-282.5T744 135q-8-19-8-39q0-40 28-68t68-28t68 28t28 68q0 20-8 39q190 28 307 158.5T1344 576q0 139 19.5 260t50 206t74.5 158.5t85 119.5t91 88z"/></svg>
            </div>
        </div>

        <div v-if="showInbox" class="inbox">
            <div class="inbox-tabs">
                <p>{{ text.title }}</p>
                <hr>
            </div>

            <div>
                <div v-if="messages.length > 0 && (watchAll || pageMatches() > 0)">
                    <p>{{ text.recent }}</p>
                    <div v-for="(event, i) in messages" :key="i">
                        <a :href="event.url">{{ event.date }}</a>
                        <p v-for="file in event.changes" :key="file.filename">
                            <span>{{ statusIcon(file.status) }}</span>
                            {{ file.filename }}
                        </p>
                        <hr v-if="i < messages.length">
                    </div>
                </div>

                <div v-else-if="messages.length !== 0 && (!watchAll && pageMatches() === 0)">
                    <p>{{ text.noSubscribedChanges }}</p>
                </div>

                <div v-else>
                    <p>{{ text.noChanges }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import fetch from 'node-fetch'

import { getBooleanValue } from '@theme/util/index.js'

export default {
    data () {
        return {
            showInbox: false,
            messages: [],
            watchingEnabled: false,
            watchAll: true,
            pages: [],
            types: ['Pages'],
            text: {
                title: 'Changelog',
                recent: 'Recent',
                noSubscribedChanges: 'No subscribed changes',
                noChanges: 'No changes in the last 90 days'
            }
        }
    },

    async mounted () {
        const watchingEnabled = localStorage.getItem('settingsAppInbox')
        const watchAllPages = localStorage.getItem('settingsAppAllPages')

        this.watchingEnabled = watchingEnabled == null ? this.watchingEnabled : !getBooleanValue(watchingEnabled)
        this.watchAll = watchingEnabled == null ? this.watchAll : getBooleanValue(watchAllPages)

        console.log(this.watchingEnabled)

        if (this.watchingEnabled) {
            const repo = this.$themeConfig.repo

            const pageEvents = await fetch(`https://api.github.com/repos/${repo}events`).then(async response => {
                if (response.ok) {
                    const commits = []
                    const json = await response.json()

                    const events = json.filter(event => {
                        return event.type === 'PushEvent' 
                            && event.payload.ref === 'refs/heads/master'
                            && event.repo.name.toLowerCase() === repo
                    })

                    for (let event of events) {
                        for (let commit of event.payload.commits) {
                            const files = await fetch(commit.url).then(async response => {
                                if (response.ok) {
                                    const json = await response.json()
                                    const filesList = json.files.filter(file => {
                                        return file.filename.endsWith('.md')
                                            && file.filename.includes('/')
                                    })
                                    
                                    return {
                                        date: json.commit.author.date.split('T')[0],
                                        url: json.html_url,
                                        changes: filesList
                                    }
                                }
                            })

                            if (files.changes && files.changes.length > 0) commits.push(files)
                        }
                    }

                    return commits
                }
            })
            this.messages = pageEvents
        }
    },

    computed: {
        newNotification: function () {
            return false
        }
    },

    methods: {
        toggleInbox () {
            this.showInbox = !this.showInbox
        },

        pageMatches () {
            return this.messages
        },

        statusIcon (status) {
            return status
        }
    }
}
</script>

<style scoped>
.bell-icon, .bell-icon div {
  width: 30px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 6px;
}

svg {
  width: 20px;
}

.inbox {
  position: fixed;
  transform: translateX(-10%);
  /* right: 0; */
  background-color: var(--c-bg);
  border: 1px solid var(--c-border);
  padding: 4px 12px;
  margin-top: 12px;
  border-radius: 4px;
  min-width: 350px;
  overflow-y: auto;
}

.inbox-tabs {
    display: flex;
    flex-direction: row;
    padding-bottom: 4px;
    border-bottom: 2px solid var(--c-border);
}

.inbox-tabs p {
    margin: 4px 10px;
    font-weight: 600;
    padding-bottom: 2px;
}

.inbox-tabs .active {
    color: var(--c-brand);
    border-bottom: 2px solid var(--c-brand);
}
    
</style>