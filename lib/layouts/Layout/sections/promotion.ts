import { h } from 'vue'

import { VPButton, VPImage } from '../../../components/export'

type PromotionOptions = Record<
    | 'description'
    | 'titleImage'
    | 'image'
    | 'actionText'
    | 'actionLink',
    string
>

export function renderPromotion(config?: PromotionOptions) {
    if (!config) return undefined
    else return h('div', { 
        class: 'home-resources',
        style: { 
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center'
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
            h(VPImage, {
                style: {
                    width: '400px',
                    maxWidth: '80vw',
                    backgroundColor: 'var(--vp-c-neutral)',
                },
                image: config.titleImage,
            }),
            h('p', { 
                innerHTML: config.description,
                style: { 
                    fontWeight: '400',
                    margin: 'revert',
                },
            }),
            h(VPButton, { 
                text: config.actionText, 
                href: config.actionLink, 
                style: {
                    textDecoration: 'none',
                    marginRight: '20px',
                },
            }),
        ])
    ])
}
