import type { DefaultTheme } from 'vitepress'

// TODO: write tests

export function getSidebarItems(sidebar?: DefaultTheme.Sidebar) {
    if (!sidebar) return []

    const items = Array.isArray(sidebar)
        ? sidebar
        : Object.values(sidebar)

    return items.flatMap((item: DefaultTheme.SidebarItem | DefaultTheme.SidebarMulti[string]) => {
        if ('base' in item) {
            return item.items?.map(i => {
                if (i.link && item.base) i.link = item.base + i.link
                return i
            }) ?? []
        } else if (Array.isArray(item))
            return item
        else
            return [item]
    })
}

export function findInSidebar(items: DefaultTheme.SidebarItem[], path: string): Record<'item' | 'parent', DefaultTheme.SidebarItem | null> {
    let item: DefaultTheme.SidebarItem | null = null
    let parent: DefaultTheme.SidebarItem | null = null
    let index = 0

    function setItem(i: DefaultTheme.SidebarItem, p?: DefaultTheme.SidebarItem) {
        const same = i.link != undefined && i.link === path

        if (same) {
            if (p != undefined) parent = p
            item = i
        }
        return same
    }

    function checkChildren(i: DefaultTheme.SidebarItem, p?: DefaultTheme.SidebarItem) {
        if (setItem(i, p)) return true
        else if (i.items) i.items.some(c => checkChildren(c, i))
        return false
    }

    while (index < items.length && item == null) {
        const current = items[index]

        if (!checkChildren(current)) index++
    }

    return {
        item,
        parent,
    }
}
