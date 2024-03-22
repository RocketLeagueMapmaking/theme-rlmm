export type StorageData<Type> = Record<string,
    | string
    | { key: string, defaultValue?: Type }
>

export interface StorageOptions {
    /**
     * The local storage keys that is used by components and the theme
     * 
     * @default 
     * { 
     *     hideHomeSteamMaps: 'rlmm-home-hidesteam',
     *     hideNotificationInbox: 'rlmm-hide-navinbox',
     *     hideSidebarAction: 'rlmm-hide-action',
     *     notificationInboxLastOpened: 'rlmm-navinbox-lastopened',
     *     useSteamProtocolUrl: 'rlmm-urls-steam',
     *     watchAllPages: 'rlmm-push-all'
     * }
     */
    keys?: Partial<
        Record<
            | 'useSteamProtocolUrl'
            | 'hideHomeSteamMaps'
            | 'hideNotificationInbox'
            | 'hideSidebarAction'
            | 'notificationInboxLastOpened'
            | 'watchAllPages'
            , string
        >
    >

    // TODO: allow difference between themes
    /**
     * A set of CSS colors to apply on loading the page
     * @example { '--vp-c-bg': 'localstore-key' }
     */
    colorKeys?: StorageData<string>

    /**
     * Apply classes to the page based on local storage items
     * @example { 'green-bg': 'use-green-bg-setting' }
     */
    pageClasses?: StorageData<boolean>
}
