<template>
  <header class="navbar" :class="{ 'notification-display': notification != null }">
    <NotificationBanner
      v-if="notification"
      :message="notification.message"
      :storageKey="notification.storageKey"
      :dismisseable="notification.dismisseable"
      :pages="notification.pages"
      :color="notification.color"
      :textColor="notification.textColor"
      :startDate="notification.startDate"
      :endDate="notification.endDate"
      :once="notification.once"
    />
    <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')" />

    <RouterLink
      :to="$localePath"
      class="home-link"
    >
      <img
        v-if="$site.themeConfig.logo"
        class="logo"
        :src="$withBase($site.themeConfig.logo)"
        :alt="$siteTitle"
      >
      <span
        v-if="$siteTitle"
        ref="siteName"
        class="site-name"
        :class="{ 'can-hide': $site.themeConfig.logo }"
      >{{ navbarTitle() }} </span>
    </RouterLink>

    <div
      class="links"
      :style="linksWrapMaxWidth ? {
        'max-width': linksWrapMaxWidth + 'px'
      } : {}"
    >
      <AlgoliaSearchBox
        v-if="isAlgoliaSearch"
        :options="algolia"
      />
      <SearchBox v-else-if="$site.themeConfig.search !== false && $page.frontmatter.search !== false" />

      <NavSettings />
      <!-- <NavInbox /> -->

      <NavLinks class="can-hide" />

      <div class="navbar-icons" v-if="icons.length > 0">
        <a :href="icon.link" v-for="icon in icons" :key="icon.name" class="navbar-icon">
          <span class="iconify" :data-icon="icon.name" data-width="24"></span>
        </a>
      </div>
    </div>
  </header>
</template>

<script>
/* eslint-disable no-restricted-imports */
import AlgoliaSearchBox from '@AlgoliaSearchBox'
import SearchBox from '@SearchBox'
import SidebarButton from '@parent-theme/components/SidebarButton.vue'
import NavLinks from '@parent-theme/components/NavLinks.vue'

import NavSettings from '@theme/components/NavSettings.vue'
import NavInbox from '@theme/components/NavInbox.vue'

import NotificationBanner from '@theme/components/NotificationBanner.vue'

export default {
  name: 'Navbar',

  components: {
    SidebarButton,
    NavLinks,
    SearchBox,
    AlgoliaSearchBox,
    NavSettings,
    NavInbox,
    NotificationBanner,
},

  data () {
    return {
      linksWrapMaxWidth: null,
      notification: null,
    }
  },

  computed: {
    algolia () {
      return this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
    },

    isAlgoliaSearch () {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName
    },

    navbarConfig () {
      return this.$themeConfig.navbar || {}
    },

    icons () {
      return this.navbarConfig.icons || []
    }
  },

  mounted () {
    const MOBILE_DESKTOP_BREAKPOINT = 719 // refer to config.styl
    const NAVBAR_VERTICAL_PADDING = parseInt(css(this.$el, 'paddingLeft')) + parseInt(css(this.$el, 'paddingRight'))
    const handleLinksWrapWidth = () => {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.linksWrapMaxWidth = null
      } else {
        this.linksWrapMaxWidth = this.$el.offsetWidth - NAVBAR_VERTICAL_PADDING
          - (this.$refs.siteName && this.$refs.siteName.offsetWidth || 0)
      }
    }
    handleLinksWrapWidth()
    window.addEventListener('resize', handleLinksWrapWidth, false)

    if (this.$themeConfig.navbar) {
        const notifications = this.$themeConfig.navbar.notifications || []
        // TODO: pick first one
        this.notification = notifications[0] || null
    }
  },

  methods: {
    navbarTitle () {
      const theme = this.$themeConfig
      if (theme && theme['navbar']) {
        return theme['navbar']['title'] || this.$siteTitle
      } else return this.$siteTitle
    }
  }
}

function css (el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView
  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property]
}
</script>

<style lang="stylus">
$navbar-vertical-padding = 0.7rem
$navbar-horizontal-padding = 1.5rem
$navbar-height = 3.5rem
$navbar-notification-height = 2.2rem

.navbar.notification-display
  height $navbar-notification-height + $navbar-height !important
  .sidebar-button, .sidebar-mask, .home-link, .links
    margin-top $navbar-notification-height !important

.navbar-icons
  padding-left 20px
  display flex
  flex-direction: row
  :not(:first-child)
    margin-left 14px

.navbar-icon
  display flex !important
  align-items center
  color var(--c-text)
  :hover
    color var(--c-brand)

.navbar
  padding $navbar-vertical-padding $navbar-horizontal-padding
  line-height $navbarHeight - 1.4rem
  a, span, img
    display inline-block
  .logo
    height $navbarHeight - 1.4rem
    min-width $navbarHeight - 1.4rem
    margin-right 0.8rem
    vertical-align top
  .site-name
    font-size 1.3rem
    font-weight 600
    color $textColor
    position relative
  .links
    padding-left 1.5rem
    box-sizing border-box
    background-color white
    white-space nowrap
    font-size 0.9rem
    position absolute
    right $navbar-horizontal-padding
    top $navbar-vertical-padding
    display flex
    .search-box
      flex: 0 0 auto
      vertical-align top

@media (max-width: $MQMobile)
  .navbar-icons
    padding-left 0px
  .nav-item > a:not(.external):hover
    border-bottom none !important
    color $brandColor
  .nav-item > a:not(.external).router-link-active
    color $brandColor
  .navbar
    padding-left 4rem
    .can-hide
      display none
    .links
      padding-left 1.5rem
    .site-name
      width calc(100vw - 9.4rem)
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
</style>