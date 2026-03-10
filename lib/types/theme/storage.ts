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
     *     hideNotificationBanners: 'rlmm-hide-navbanners',
     *     hideNotificationInbox: 'rlmm-hide-navinbox',
     *     hideSidebarAction: 'rlmm-hide-action',
     *     hidePageRelatedBlocks: 'rlmm-hide-related',
     *     notificationInboxLastOpened: 'rlmm-navinbox-lastopened',
     *     useSteamProtocolUrl: 'rlmm-urls-steam',
     *     watchAllPages: 'rlmm-push-all'
     * }
     */
    keys?: Partial<
        Record<
            | 'useSteamProtocolUrl'
            | 'hideHomeSteamMaps'
            | 'hideNotificationBanners'
            | 'hideNotificationInbox'
            | 'hideSidebarAction'
            | 'hidePageRelatedBlocks'
            | 'notificationInboxLastOpened'
            | 'watchAllPages'
            , string | { key?: string, defaultValue?: string }
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
