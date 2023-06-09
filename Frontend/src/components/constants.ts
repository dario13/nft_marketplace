export const componentPositions = ['top', 'bottom', 'left', 'right'] as const
export const componentShapes = ['circle', 'square'] as const
export const componentSizes = ['lg', 'md', 'sm', 'xs'] as const
export const componentStatuses = ['info', 'success', 'warning', 'error'] as const
export const brandColors = ['primary', 'secondary', 'accent'] as const
export const componentColors = [...brandColors, 'ghost', ...componentStatuses] as const
export const bgColors = ['base100', 'base200', 'base300', 'neutral'] as const

export const defaultTheme = 'bumblebee'
