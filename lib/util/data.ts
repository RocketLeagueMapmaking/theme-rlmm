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
