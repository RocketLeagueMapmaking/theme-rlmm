import { parse, type MarkedOptions } from 'marked'

export function useMarkdown (options?: MarkedOptions) {
    return (md: string) => {
        return parse(md, {
            ...(options ?? {}),
            async: false,
        }) as string
    }
}
