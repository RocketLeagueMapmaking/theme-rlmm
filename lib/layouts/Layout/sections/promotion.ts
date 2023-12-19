import { h } from 'vue'

import { VPButton, VPImage } from '../../../components/export'

// Copied from VPButton
interface ButtonProps {
    tag?: string
    size?: 'medium' | 'big'
    theme?: 'brand' | 'alt' | 'sponsor'
    text: string
    href?: string
}

type PromotionOptions = {
    title: { image: string } | string
    description: string
    image: string
    actions: ButtonProps[]
}

export function renderPromotion(config?: PromotionOptions) {
    if (!config) return undefined
    else return h('div', {
        class: 'home-resources',
        style: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            backgroundColor: 'var(--vp-c-bg-soft)',
        }
    }, [
        h(VPImage, {
            image: config.image,
            style: {
                width: '800px',
                maxWidth: '80vw',
                margin: '20px',
                borderRadius: '10px',
                flex: 1,
            },
        }),
        h('div', {
            class: 'vp-doc home-resources',
            style: { maxWidth: '90vw', flex: 0.6 }
        }, [
            h(typeof config.title !== 'string' ? VPImage : 'p', {
                style: {
                    width: '400px',
                    maxWidth: '80vw',
                    backgroundColor: 'var(--vp-c-neutral)',
                },
                image: typeof config.title !== 'string' ? config.title.image : undefined,
                innerHTML: typeof config.title === 'string' ? config.title : undefined,
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
