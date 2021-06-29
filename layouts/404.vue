<template>
  <div v-bind:style="getBackground()">
    <div class="theme-container">
      <div class="content">
        <h1>{{ title }}</h1>
        <blockquote>{{ getMsg() }}</blockquote>

        <router-link v-bind:to="site.base">
          {{ theme.backToHome || backToHome }}
        </router-link>

        <br /><br />

        <div>
          <div v-if="enabledSuggestedPages()">
            <p>{{ suggestionTitle }}</p>

            <div v-if="autoSuggestPages">
              <li v-for="(page, i) in autoSuggestPage()" :key="i">
                <a :href="origin.concat(page.path)">{{ page.title }}</a>
              </li>
              <br v-if="autoSuggestPage().length > 0" />
            </div>

            <li v-for="(page, i) in getRecommendedPages()" :key="page.url">
              <a :href="page.link" v-if="i < maxRecommendedPages">{{
                page.text
              }}</a>
            </li>
          </div>

          <div v-if="enabledReport()">
            <p>
              {{ getReportText()[0] }}
              <a :href="githubIssuesUrl()">
                {{ getReportText()[1] }}
              </a>
              <OutboundLink />
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { findBestMatch } from "../util/index.js";

export default {
  data() {
    return {
      theme: "",
      site: "",

      path: "",
      origin: "",

      // local notFound settings
      notFoundSettings: "",

      // default titles
      title: "404",
      suggestionTitle: "Suggested pages:",
      backToHome: "Back to home",

      // default recommended pages
      maxRecommendedPages: 2,
      recommendedPages: [
        {
          text: "Home",
          link: "/",
        },
      ],
      
      defaultQuotes: [
        "There's nothing here.",
        "How did we get here?",
        "That's a Four-Oh-Four.",
        "Looks like we've got some broken links.",
      ],

      autoSuggestPages: true,
      autoSuggestThreshold: 0.3,
      maxAutoSuggestions: 3,
    };
  },

  created() {
    this.theme = this.$themeConfig;
    this.site = this.$site;

    this.path = window.location.pathname;
    this.origin = window.location.origin;

    const ThemeExtension = "local";

    if (this.theme) {
      const ExtendedTheme = this["theme"][ThemeExtension];

      if (ExtendedTheme) {
        this.notFoundSettings = ExtendedTheme.notFound;
      }
    }
  },

  methods: {
    getMsg() {
      let { notFound } = this.theme;

      if (!notFound) notFound = this.defaultQuotes;

      const index = Math.floor(Math.random() * notFound.length);
      return notFound[index];
    },

    getBackground() {
      if (!this.notFoundSettings) return {};

      const backgroundImage = this.notFoundSettings.background;

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
      if (!this.notFoundSettings) return this.recommendedPages;

      const pages = this.notFoundSettings.suggestedPages;

      return pages ? pages : this.recommendedPages;
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
      if (!this.notFoundSettings) return !!this.theme.repo;

      return this.theme.repo && !!this.notFoundSettings.report;
    },

    enabledSuggestedPages() {
      if (!this.notFoundSettings) return true;

      return !!this.notFoundSettings.showSuggestedPages;
    },

    autoSuggestPage() {
      if (this.notFoundSettings) {
        if (!this.notFoundSettings.autoSuggestPages) return [];
      }
      const pages = this.site.pages;
      const paths = pages.map((page) => page.path);

      const matches = findBestMatch(this.path, paths);

      const sortedMatches = matches.ratings.sort((a, b) =>
        a.rating < b.rating ? 1 : a.rating > b.rating ? -1 : 0
      );

      const suggestions = sortedMatches
        .filter((x, i) => {
          return (
            i < this.maxAutoSuggestions && x.rating > this.autoSuggestThreshold
          );
        })
        .map((result) => pages.find((x) => x.path === result.target));

      return suggestions;
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