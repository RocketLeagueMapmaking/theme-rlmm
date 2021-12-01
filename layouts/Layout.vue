<template>
  <div>
    <ParentLayout>
      <!-- Layout slots -->
      <template #page-top>
        <slot name="page-header" />
      </template>

      <template #page-bottom>
        <slot name="page-footer" />

        <!-- TODO: add individual page watching -->
        <PageUpdate v-if="showPageWatching && false" />
      </template>

      <template #sidebar-bottom>
        <slot name="sidebar-bottom" />
      </template>
    </ParentLayout>
  </div>
</template>

<script>
import Vue from 'vue'

import ParentLayout from '@parent-theme/layouts/Layout.vue'
import PageUpdate from '@theme/components/PageWatch.vue'

import { getBooleanValue } from '@theme/util/index.js'

export const themeEvents = new Vue()

import PageSettings from '@theme/components/PageSettings.vue'

export default {
  components: {
    ParentLayout,
    PageUpdate,
    PageSettings
  },

  props: {
    enableWatching: {
      type: Boolean,
      default: true
    }
  },

  mounted () {
    const headers = document.getElementsByTagName('H1')

    if (headers.length > 0) {
      const titleElem = headers[0]

      if (titleElem && titleElem.id) {
        // Append component to the title of the page
        const TitleComponent = Vue.extend(PageSettings)

        const component = new TitleComponent().$mount()
        document.getElementById(titleElem.id).appendChild(component.$el)
      }
    }

    themeEvents.$on('setting-change', (event) => {
      const { id, value } = JSON.parse(event)
      console.log(event)

      if (id === 'settingsAppDarkTheme') this.setDarkTheme(getBooleanValue(value))
      if (id === 'settingsAppUpdates') this.showPageWatching = this.watchingEnabled()
      
    })

    const darkThemeEnabled = localStorage.getItem('settingsAppDarkTheme') 

    if (getBooleanValue(darkThemeEnabled)) this.setDarkTheme(true)
    this.showPageWatching = this.watchingEnabled()

    // TODO: move to style section
    const items = ['sidebar', 'navbar', 'links']
    items.forEach(item => {
      document.getElementsByClassName(item)[0].style.backgroundColor = 'var(--c-bg)'
    })
    
    for (const dropdown of document.getElementsByClassName('nav-dropdown')) {
      dropdown.style.backgroundColor = 'var(--c-bg)'
    }
  },

  data () {
    return {
      darkTheme: null,
      showPageWatching: false,
      showPageSettingsModal: false
    }
  },

  methods: {
    watchingEnabled: function () {

      const localValue = getBooleanValue(localStorage.getItem('settingsAppUpdates'))

      if (!this.enableWatching) return false
      return localValue
    },

    setDarkTheme (enabled) {
      this.darkTheme = enabled

      const name = 'dark' 
      const { classList } = document.documentElement

      this.darkTheme ? classList.add(name) : classList.remove(name)
    }
  }
}
</script>

<style>
/* 
Css variables for the theme
Append the class 'dark' to the html tag for dark theme colors
Reference: https://vuepress2.netlify.app/reference/default-theme/styles.html#style-file
TODO: dark mode for: blocks and search 
 */
@import '../style/root.css';
@import '../style/theme.css';
</style>