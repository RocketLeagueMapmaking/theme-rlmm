export function getThemeColor (color: string, variant = '3') {
    const isTheme = [
        'brand',
        'red',
        'indigo',
        'default',
        'gray',
        'yellow',
        'green',
    ].includes(color)

    return isTheme ? `var(--vp-c-${color}-${variant})` : color
}
