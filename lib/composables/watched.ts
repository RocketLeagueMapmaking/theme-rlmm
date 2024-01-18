import { useStorage } from './storage'

export type WatchedPages =
    | 'all'
    | string[]

export function useWatchedPages(prefix: string = 'rlmm-page-') {
    const storage = useStorage()

    return {
        pathToKey(path: string) {
            return `${prefix}${path.replace(/\//g, '_').replace('.md', '')}`
        },

        pathToDisplay(path: string) {
            return '/' + path.replace('index.md', '').replace('.md', '')
        },

        getWatchedPages(): WatchedPages {
            const isAll = storage.getBoolean(storage.themeKeys.value.watchAllPages) ?? false

            if (isAll) return 'all'
            else return storage.list(prefix, 'true')
                .map(p => p.slice(prefix.length).replace(/_/g, '/'))
        },
    }
}