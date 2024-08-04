export interface RouterOptions {
    /**
     * Same as config.rewrites, but client-side
     */
    redirects?: Record<string, string>

    /**
     * Redirect the current page when the current page is mounted and is defined in {@link redirects}
     * @default true
     */
    redirectOnMounted?: boolean

    onRouteChanged?: (to: string) => Promise<void> | void

    scrollIntoView?: {
        /**
         * @default true
         */
        sidebar?: boolean | ScrollIntoViewOptions
    }
}
