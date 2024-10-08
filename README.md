# theme-rlmm

> [!NOTE]
> This is the theme for [the Rocket League map making guide][docs_repo]. For guide content related issues, go to the [docs repo][docs_repo]

Note that is theme is solely intended for the RLMM guide. While making some generic theme improvements, it will also export Rocket League (custom maps) related components. This project does not follow semver, can introduce breaking changes and may have hardcoded configuration for the RLMM repo.

## Documentation

See the [documentation][docs] for all theme options and components.
This theme also exports types for theme configuration and more. The types will be updated first and the documentation might miss small features, so use types as a source of truth.

## Local development

Requirements:

- node v18+

```sh
# Install
npm ci
# Run locally
npm run docs:dev
```

To format the `.Vue` files use the `Volar` extension as a default formatter.

### Local development with guide content

This theme mainly holds custom components and layout.

For combining RLMM guide content with a custom component (window), make a new placeholder guide page in `docs/guide/{type}/` with the component to add from `lib/components/src/guide/` and export the component in `lib/components/src/index.ts`.

## Roadmap

When this theme has the requested features and is stable enough, this repo will be merged in to the main repo.
Currently planned features can be found in the [GitHub project][project].

[docs_repo]: https://github.com/rocketleaguemapmaking/rl-docs
[docs]: https://theme-rlmm.pages.dev/
[project]: https://github.com/orgs/RocketLeagueMapmaking/projects/3
