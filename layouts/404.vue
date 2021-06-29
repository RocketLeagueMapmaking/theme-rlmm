<template>
  <div v-bind:style="getBackground()">
    <div class="theme-container">
      <div class="content">
        <h1>{{ title }}</h1>
        <blockquote>{{ getMsg() }}</blockquote>

        <router-link v-bind:to="site.base">
          {{ theme.backToHome }}
        </router-link>

        <br /><br />

        <div>
          <div v-if="enabledSuggestedPages()">
            <p>{{ suggestionTitle }}</p>
            <li v-for="page in getRecommendedPages()" :key="page.url">
              <a :href="page.link">{{ page.text }}</a>
            </li>
          </div>

          <div v-if="enabledReport()">
            <p>
              {{ getReportText()[0] }}
              <a :href="githubIssuesUrl()">
                {{ getReportText()[1] }}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      theme: this.$site.themeConfig,
      site: this.$site,
      // local notFound settings
      notFoundSettings: this.$site.themeConfig.local.notFound,
      // default titles
      title: "404",
      suggestionTitle: "Suggested pages:",
      // default recommended pages
      recommendedPages: [
        {
          text: "Home",
          link: "/",
        },
      ],
    };
  },

  methods: {
    getMsg() {
      const { notFound } = this.theme;

      const index = Math.floor(Math.random() * notFound.length);
      return notFound[index];
    },

    getBackground() {
      const backgroundImage = this.theme.local.notFound.background;

      return backgroundImage
        ? {
            "background-image": `url(${backgroundImage})`,
            height: "100vh",
            "background-position": "center",
            "background-repeat": "no-repeat",
            "background-size": "cover",
            display: "flow-root",
          }
        : {};
    },

    getRecommendedPages() {
      const pages = this.notFoundSettings.suggestedPages;

      return pages || this.recommendedPages;
    },

    getReportText() {
      return [
        "To help improve this guide you can report this broken link in a",
        "new github issue",
      ];
    },

    githubIssuesUrl() {
      return `https://github.com/${this.theme.repo}/issues`;
    },

    enabledReport() {
      const isReportEnabled = this.notFoundSettings.report;

      return this.theme.repo && (isReportEnabled || true);
    },

    enabledSuggestedPages() {
      const showSuggestedPages = this.notFoundSettings.showSuggestedPages;

      return showSuggestedPages || true;
    },
  },
};
</script>


<style scoped >
html,
body {
  height: 100%;
  margin: 0px;
  padding: 0px;
}

.content {
  max-width: 740px;
  margin: 0 auto;
}

.content > h1 {
  padding-top: 4.6rem;
}

@media screen and (max-width: 959px) {
  .content {
    padding: 2rem;
  }
}
</style>