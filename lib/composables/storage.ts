import { onMounted, ref } from "vue"
import { inBrowser, useData } from "vitepress"

import { RLMMThemeConfig } from "../types"
import { useLocalStorage, useSessionStorage } from "@vueuse/core"

// export type WatchedPages =
//     | 'all'
//     | string[]

export type ThemeStorageKeys = NonNullable<Required<NonNullable<RLMMThemeConfig['storage']>['keys']>>

export function useStorage<Key extends string = string>() {
    const storage = ref<Storage | null>(null)
    const defaultKeys = Object.freeze({
        hideHomeSteamMaps: 'rlmm-home-hidesteam',
        hideNotificationInbox: 'rlmm-hide-navinbox',
        hideSidebarAction: 'rlmm-hide-action',
        notificationInboxLastOpened: 'rlmm-navinbox-lastopened',
        useSteamProtocolUrl: 'rlmm-urls-steam',
        watchAllPages: 'rlmm-push-all',
    })

    const keys = ref<ThemeStorageKeys>(defaultKeys)

    onMounted(() => {
        if (!inBrowser || !window || !window.localStorage) return console.error('No storage found!')
        storage.value = window.localStorage

        const { theme } = useData<RLMMThemeConfig>()
        const options = theme.value.storage?.keys

        keys.value = Object.entries(defaultKeys)
            .reduce((obj, [key, defaultValue]) => ({ ...obj, [key]: options?.[key] ?? defaultValue }), {} as ThemeStorageKeys)
    })

    const get = (key: string | undefined) => key ? storage.value?.getItem(key.toString()) ?? null : null
    const toBool = (value: string | null) => value != null ? value === 'true' : undefined

    const list = (prefix: string, value?: string) => Object.entries(storage.value ?? {})
        .filter(([key, setting]) => (value != undefined ? value === setting : true) && key.startsWith(prefix))
        .map(([key]) => key)

    return {
        get: (key: Key): string | null => {
            return get(key.toString())
        },

        getAny: <T extends string | boolean>(key: Key, unknown: T): T => {
            const value = get(key)

            return value != null
                ? typeof unknown === 'boolean'
                    ? <T>(value === 'true')
                    : <T>value
                : unknown
        },

        getBoolean: (key: Key, unknown?: boolean): boolean => {
            return toBool(get(key)) ?? unknown ?? false
        },

        get themeKeys() {
            return keys
        },

        set: (key: Key, value: string): void => {
            storage.value?.setItem(key, value)
        },

        list: (prefix: string, value?: string): string[] => {
            return list(prefix, value)
        },

        useKey: <T>(...params: Parameters<typeof useLocalStorage<T>>) => {
            return useLocalStorage(params[0], params[1], params[2] ?? { writeDefaults: false })
        },
        useSessionKey: useSessionStorage,
    }
}
