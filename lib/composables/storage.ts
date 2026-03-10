import { MaybeRefOrGetter, onMounted, ref } from "vue"
import { inBrowser, useData } from "vitepress"

import { ThemeConfig } from "../types"
import { useLocalStorage, useSessionStorage } from "@vueuse/core"

export type ThemeStorageKeys = NonNullable<Required<NonNullable<ThemeConfig['storage']>['keys']>>

function findKeyByValue <T extends object>(obj: T, value: T[keyof T]) {
    return Object.entries(obj).find(([_key, val]) => val === value)?.[0]
}

export function useStorage<Key extends string = string>() {
    const storage = ref<Storage | null>(null)
    const defaultKeys = Object.freeze({
        hideHomeSteamMaps: 'rlmm-home-hidesteam',
        hideNotificationInbox: 'rlmm-hide-navinbox',
        hideNotificationBanners: 'rlmm-hide-navbanners',
        hideSidebarAction: 'rlmm-hide-action',
        hidePageRelatedBlocks: 'rlmm-hide-related',
        notificationInboxLastOpened: 'rlmm-navinbox-lastopened',
        useSteamProtocolUrl: 'rlmm-urls-steam',
        watchAllPages: 'rlmm-push-all',
    })

    const options = ref<Partial<ThemeStorageKeys>>()
    const keys = ref<Record<keyof ThemeStorageKeys, string>>(defaultKeys)

    onMounted(() => {
        if (!inBrowser || !window || !window.localStorage) return console.error('No storage found!')
        storage.value = window.localStorage

        const { theme } = useData<ThemeConfig>()
        options.value = theme.value.storage?.keys

        keys.value = Object.entries(defaultKeys)
            .reduce((obj, [key, defaultValue]) => {
                const value = options.value?.[<keyof ThemeStorageKeys>key]
                const storageKey = typeof value === 'string' ? value : value?.key

                return {
                    ...obj,
                    [key]: storageKey ?? defaultValue,
                }
            }, {} as Record<keyof ThemeStorageKeys, string>)
    })

    const getDefaultValue = (key: string): string | null => {
        const optionKey = findKeyByValue(keys.value, key)
        if (!optionKey) return null
        const option: ThemeStorageKeys[keyof ThemeStorageKeys] | undefined = options.value?.[<keyof ThemeStorageKeys>optionKey]

        if (!option || typeof option === 'string') return null
        else return option.defaultValue ?? null
    }

    const get = (key: string | undefined) => key ? storage.value?.getItem(key.toString()) ?? getDefaultValue(key) : null
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

        remove: (key: Key): void => {
            storage.value?.removeItem(key)
        },

        list: (prefix: string, value?: string): string[] => {
            return list(prefix, value)
        },

        useKey: (...params: Parameters<typeof useLocalStorage<string | null>>) => {
            const initialValue: MaybeRefOrGetter<string | null> = getDefaultValue(params[0].toString()) ?? params[1]
            return useLocalStorage<string | null>(params[0].toString(), initialValue, params[2] ?? {
                writeDefaults: false,
                listenToStorageChanges: true,
            })
        },
        useSessionKey: useSessionStorage,
    }
}
