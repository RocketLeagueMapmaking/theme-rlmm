import { parse } from 'marked'

export function useMarkdown () {
    return (md: string) => {
        return parse(md, {
            async: false,
        }) as string
    }
}
