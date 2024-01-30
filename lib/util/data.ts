import { type Awaitable } from "vitepress"

import { useStorage } from "../composables"

export interface AnalyticsOptions {
    url: string

    enabled?: boolean
    /**
     * The local storage key for the user to consent sending metrics.
     * If {@link enabled} is `false`, this setting cannot override this.
     */
    settingEnabled?: string

    /**
     * Adds additional data to metrics.
     * By default only the path is included.
     */
    addData?: () => Record<string, any>

    /**
     * Additional headers to send in requests
     */
    headers?: Record<string, string>

    onError?: (error: unknown) => Awaitable<void>
    onResponse?: (res: Response) => Awaitable<void>
}

export type ComponentData<T, O extends object> = ({
    data?: T | undefined
    dataUrl?: string | undefined | null
} & O)

export type ComponentFetchedData<T, O extends object, Default> = {
    data: T | Default
    usingFetchedData: boolean
} & O

export async function fetchComponentData <T, D, O extends object = object>(
    data: ComponentData<T, O>,
    def: D
): Promise<ComponentFetchedData<T, O, D>> {
    const { data: _data, dataUrl: _url, ...obj } = data
    let usingFetchedData = false
    let output = data.data ?? def

    if (typeof data.dataUrl === 'string') {
        await fetch(data.dataUrl)
            .then(res => res.ok ? res.json() as Promise<T> : undefined)
            .then(json => {
                if (json) {
                    usingFetchedData = true
                    output = json
                }
            })
            .catch(console.error)
    }

    return {
        ...(obj as O),
        usingFetchedData,
        data: output,
    }
}

export async function fetchComponent <T, O extends object = object>(
    data: ComponentData<T, O> | undefined,
): Promise<T | undefined> {
    if (data == undefined) return undefined

    return await fetchComponentData<T, undefined, O>(data, undefined)
        .then(result => result.data)
}

export function createAnalyticsDataCollector (options?: AnalyticsOptions) {
    return async (route: string) => {
        if (!options || !options.enabled) return
        const userSetting = options.settingEnabled
            ? useStorage().useKey(options.settingEnabled, null).value === 'true'
            : true

        if (!userSetting) return

        const additionalData = options.addData?.() ?? {}
        const data = {
            method: 'POST',
            body: JSON.stringify({
                ...additionalData,
                path: route,
            }),
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers ?? {}),
            },
        }
        
        await fetch(options.url, data)
            .then(options.onResponse)
            .catch(options.onError)
    }
}
