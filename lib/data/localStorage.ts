import { onMounted, ref } from "vue"

export type WatchedPages = 
    | 'all'
    | string[]

export function useStorage () {
    const storage = ref<Storage | null>(window.localStorage)

    const get = (key: string) => storage.value.getItem(key.toString())
    const getBool = (key: string): boolean | undefined => {
        const value = get(key)
        return value != null ? value === 'true' : undefined
    }

    const list = (prefix: string, value?: string) => Object.entries(storage.value)
        .filter(([key, setting]) => (value != undefined ? value === setting : true) && key.startsWith(prefix))
        .map(([key]) => key)

    return {
        get: (key: `rlmm-${string}`): string | null => {
            return get(key.toString())
        },
    
        getAny: <T extends string | boolean>(key: `rlmm-${string}`, unknown: T): T => {
            const value = get(key)
    
            return value != null 
                ? typeof unknown === 'boolean'
                    ? <T>(value === 'true')
                    : <T>value
                : unknown
        },
    
        getBoolean: (key: `rlmm-${string}`, unknown?: boolean): boolean => {
            return getBool(key) ?? unknown ?? false
        },

        getWatchedPages () {
            const isAll = getBool('rlmm-push-all') ?? false
            if (isAll) return 'all'
            else return list('rlmm-page-', 'true')
                .map(p => p.slice('rlmm-page-'.length).replace(/_/g, '/'))
        },
    
        set: (key: `rlmm-${string}`, value: string): void => {
            storage.value.setItem(key, value)
        },
    
        list: (prefix: string, value?: string): string[] => {
            return list(prefix, value)
        },
    }
}
