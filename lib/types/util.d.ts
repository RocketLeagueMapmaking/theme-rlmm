declare module ThemeUtil {
    const getBooleanValue: (value: string | boolean | undefined) => boolean
    const findBestMatch: (test: string, array: string[]) => {
        bestMatch: string
        bestMatchIndex: number
        ratings: { }[]
    }
}
