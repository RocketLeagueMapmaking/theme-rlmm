export interface SidebarActionOptions {
    /**
     * The path to open when clicking on the button
     */
    path: string

    /**
     * The style of the button
     * @default 'alt'
     */
    buttonTheme?: 'brand' | 'alt'

    /**
     * The text on the action button
     */
    title: string

    /**
     * Where to place the action button on the sidebar 
     * @default 'top'
     */
    position?: 'top' | 'bottom'
}
