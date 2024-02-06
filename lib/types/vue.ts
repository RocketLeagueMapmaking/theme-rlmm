export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    $frontmatter: Record<string, any>
    $params: Record<string, string>

    // Assumes that the enhanceApp function from the theme is run
    // or, the exported function `registerGlobalProperties`

    $theme: {
        name: string
        description: string
        version: string
    }
  }
}