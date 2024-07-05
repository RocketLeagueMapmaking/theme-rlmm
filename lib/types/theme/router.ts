export interface RouterOptions {
    /**
     * Same as config.rewrites, but client-side
     */
    redirects?: Record<string, string>

    onRouteChanged?: (to: string) => Promise<void> | void

    scrollIntoView?: {
        /**
         * @default true
         */
        sidebar?: boolean | ScrollIntoViewOptions
    }
}
