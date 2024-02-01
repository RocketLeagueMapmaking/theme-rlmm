<template>
    <div class="related-pages" v-if="rawOptions !== false && ($frontmatter.related ?? []).length > 0">
        <p class="related-pages-title">{{ options?.title ?? 'See also' }}</p>
        <div class="related-page prev-next">
            <VPLink class="link pager-link next" :href="path.path" v-for="path of ($frontmatter.related ?? []).map(parse)">
                <span class="desc" v-if="path.description">{{ path.description }}</span>
                <span class="title">{{ path.title }}</span>
            </VPLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { type DefaultTheme, useData } from 'vitepress';

import { VPLink } from '../theme';

import { findInSidebar, getSidebarItems } from '../../util';
import type { ThemeConfig } from '../../types';

const { theme } = useData<ThemeConfig>()

const rawOptions = theme.value.blocks?.relatedPages
const options = typeof rawOptions !== 'boolean' ? rawOptions : undefined

const sidebarItems = getSidebarItems(theme.value.sidebar)

// TODO: look into built-end stuff / options in frontmatter to improve this data?
function parse (path: string) {
    const convert = ({ item, parent }: Record<'item' | 'parent', DefaultTheme.SidebarItem | null>) => ({
        title: item?.text,
        description: options?.useDocFooter ? item?.docFooterText : parent?.text,
    })

    const data = options?.transformRoute?.(path)
        ?? convert(findInSidebar(sidebarItems, path))
        ?? options?.transformUnknownPath?.(path)
        ?? (() => {
            const cap = (str: string) => str[0].toUpperCase() + str.slice(1)
            const parts = path.split('/'), last = parts[parts.length - 1]
            const name = last.length === 0 ? 'Introduction' : last

            return {
                title: cap(name),
                description: cap(parts[parts.length - 2]),
            }
        })()

    return {
        path,
        ...(data ?? {}),
    }
}
</script>

<style scoped>
.related-pages {
    margin-top: 20px;
}

.related-pages-title {
    /* border-top: 1px solid var(--vp-c-divider); */
    font-weight: 700;
    color: var(--vpc-text-1);
}

/* Copied from DocFooter.vue */
.prev-next {
    padding-top: 12px;
    display: grid;
    grid-row-gap: 8px;
}

@media (min-width: 640px) {
    .prev-next {
        grid-template-columns: repeat(2, 1fr);
        grid-column-gap: 16px;
    }
}

.pager-link {
    display: block;
    border: 1px solid var(--vp-c-divider);
    border-radius: 8px;
    padding: 11px 16px 13px;
    width: 100%;
    height: 100%;
    transition: border-color 0.25s;
}

.pager-link:hover {
    border-color: var(--vp-c-brand-1);
}

.pager-link.next {
    margin-left: auto;
    text-align: right;
}

.desc {
    display: block;
    line-height: 20px;
    font-size: 12px;
    font-weight: 500;
    color: var(--vp-c-text-2);
}

.title {
    display: block;
    line-height: 20px;
    font-size: 14px;
    font-weight: 500;
    color: var(--vp-c-brand-1);
    transition: color 0.25s;
}
</style>
