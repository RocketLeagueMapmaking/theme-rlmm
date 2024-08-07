import { type Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './styles/style.css'

import { enhanceApp } from './components/enhance'
import Layout from './layouts/'

export * from './components/export'
export * from './composables/'

export type * from './types'
export { ThemeNotificationContext } from './types'

export default {
    extends: DefaultTheme,
    Layout,
    enhanceApp,
} satisfies Theme
