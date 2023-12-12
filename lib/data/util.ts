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

// Combine `platform` and `userAgentData` since one is deprecated and one is experimental
export function getPlatform(): string {
    // Not in TS
    const data = (navigator as (typeof navigator & { userAgentData: { platform: string } })).userAgentData

    if (typeof data !== 'undefined' && data != null) {
        return data.platform;
    }

    if (typeof navigator.platform !== 'undefined') {
        return navigator.platform;
    }

    return 'unknown';
}

export function getThemeColor (color: string) {
    const isTheme = [
        'brand',
        'red',
        'indigo',
        'default',
        'gray',
        'yellow',
        'green',
    ].includes(color)

    return isTheme ? `var(--vp-c-${color}-3)` : color
}