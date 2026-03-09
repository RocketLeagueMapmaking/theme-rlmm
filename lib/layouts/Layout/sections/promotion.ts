import { h } from 'vue'

import { VPButton, VPImage } from '../../../components/export'
import Tabs from '../../../components/global/markdown/tabs.vue'

// Copied from VPButton
interface ButtonProps {
    tag?: string
    size?: 'medium' | 'big'
    theme?: 'brand' | 'alt' | 'sponsor'
    text: string
    href?: string
}

export type PromotionOptions = {
    title: { image: string } | string
    key: string
    description: string
    image: string
    actions: ButtonProps[]
}

function renderPromotion(config: PromotionOptions, inTabs?: boolean) {
    return h('div', {
        class: 'home-resources',
        style: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            backgroundColor: 'var(--vp-c-bg-soft)',
            ...(inTabs ? {
                marginTop: 0,
            } : {}),
        }
    }, [
        h(VPImage, {
            image: config.image,
            style: {
                width: '800px',
                maxWidth: '80vw',
                maxHeight: '600px',
                objectFit: 'cover',
                margin: '20px',
                borderRadius: '10px',
                flex: 1,
            },
        }),
        h('div', {
            class: 'vp-doc home-resources home-promotion',
            style: { maxWidth: '90vw', flex: 0.6 }
        }, [
            typeof config.title !== 'string' ? h(VPImage, {
                class: 'promotion-img',
                style: {
                    width: '400px',
                    maxWidth: '80vw',
                },
                image: config.title.image,
            }) : h('p', {
                style: {
                    width: '400px',
                    maxWidth: '80vw',
                    fontSize: '2rem',
                },
                innerHTML: config.title,
            }),
            h('p', {
                innerHTML: config.description,
                style: {
                    fontWeight: '400',
                    margin: 'revert',
                },
            }),
            ...config.actions.map((action, i) => h(VPButton, {
                ...action,
                style: {
                    textDecoration: 'none',
                    marginRight: i + 1 === config.actions.length ? '0' : '20px',
                },
            }))
        ])
    ])
}

export function renderPromotions (config: PromotionOptions[] | PromotionOptions, options?: {
    switchTimeout?: number
}) {
    if (!Array.isArray(config)) return renderPromotion(config)
    else return h(Tabs, {
        ...(options ?? {}),
        switchTimeout: options?.switchTimeout ?? 15_000,
        tabs: config.map(c => c.key),
        alignLeft: false,
        alignCenter: true,
        hideDivider: true,
    }, config.reduce((slots, item) => ({
        [`tab-${item.key.toLowerCase().replace(/ /g, '_')}`]: renderPromotion(item, true),
        ...slots,
    }), {}))
}
