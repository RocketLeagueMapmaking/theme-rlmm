import { useData } from "vitepress"
import { computed, onMounted, ref } from "vue"
import { RLMMThemeConfig } from "../types"

export type WatchedPages =
    | 'all'
    | string[]

export function useStorage<Key extends string = string>() {
    const storage = ref<Storage | null>(null)
    const keys = ref<NonNullable<Required<NonNullable<RLMMThemeConfig['storage']>['keys']>>>({
        hideSidebarAction: 'rlmm-hide-action',
        useSteamProtocolUrl: 'rlmm-urls-steam',
        watchAllPages: 'rlmm-push-all',
    })

    onMounted(() => {
        storage.value = window?.localStorage ?? null

        const { theme } = useData<RLMMThemeConfig>()
        const options = theme.value.storage?.keys

        keys.value = {
            hideSidebarAction: options?.hideSidebarAction ?? 'rlmm-hide-action',
            useSteamProtocolUrl: options?.useSteamProtocolUrl ?? 'rlmm-urls-steam',
            watchAllPages: options?.watchAllPages ?? 'rlmm-push-all',
        } satisfies Required<NonNullable<RLMMThemeConfig['storage']>['keys']>
    })

    const get = (key: string) => storage.value?.getItem(key.toString()) ?? null
    const getBool = (key: string): boolean | undefined => {
        const value = get(key)
        return value != null ? value === 'true' : undefined
    }

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
            return getBool(key) ?? unknown ?? false
        },

        getWatchedPages() {
            // TODO: figure out interface to expose prefix
            // and make interacting with watched pages easier
            const prefix = 'rlmm-page-'
            const isAll = getBool(keys.value.watchAllPages) ?? false

            if (isAll) return 'all'
            else return list(prefix, 'true')
                .map(p => p.slice(prefix.length).replace(/_/g, '/'))
        },

        getThemeKeys() {
            return keys
        },

        set: (key: Key, value: string): void => {
            storage.value?.setItem(key, value)
        },

        list: (prefix: string, value?: string): string[] => {
            return list(prefix, value)
        },
    }
}
