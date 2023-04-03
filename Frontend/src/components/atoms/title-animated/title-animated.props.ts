import { ComponentBgColors, ComponentColor } from '@/components/types'

enum TitleAnimatedSize {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export enum TitleAnimatedAlign {
  left = 'left',
  center = 'center',
  right = 'right',
  justify = 'justify',
  start = 'start',
  end = 'end',
}

export type TitleNeonProps = {
  neonColor?: string
}

export type TitleColorProps = {
  color?: ComponentColor | ComponentBgColors
}

export type TitleAnimatedProps = {
  text: string

  size?: TitleAnimatedSize
  align?: TitleAnimatedAlign
  bold?: boolean
  velocity?: number
  reverseTrail?: boolean
} & TitleNeonProps &
  TitleColorProps
