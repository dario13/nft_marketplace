import React from 'react'
import { TitleAnimatedAlign, TitleAnimatedProps } from './title-animated.props'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import { TitleStyled } from './title-animated.styles'
import { useTheme } from '@/hooks/use-theme'

const titleColor = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  success: 'text-success',
  accent: 'text-accent',
  warning: 'text-warning',
  info: 'text-info',
  error: 'text-error',
  ghost: 'text-ghost',
  neutral: 'text-neutral',
  base100: 'text-base-100',
  base200: 'text-base-200',
  base300: 'text-base-300',
}

const titleAlign = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
  start: 'text-start',
  end: 'text-end',
}

const TitleAnimated: React.FC<TitleAnimatedProps> = ({
  text,
  size = 'large',
  align = TitleAnimatedAlign.center,
  neonColor = 'darkgoldenrod',
}) => {
  const { theme } = useTheme()

  const color = theme === 'bumblebee' ? 'text-ghost' : 'text-primary'

  const TitleComponentLabel = () => {
    if (size === 'medium') return 'h2'
    if (size === 'small') return 'h3'
    return 'h1'
  }

  const TitleComponent = TitleComponentLabel()

  return (
    <article className="prose">
      <TitleStyled neonColor={neonColor} className={titleAlign[align]}>
        <TitleComponent className={color}>{text}</TitleComponent>
      </TitleStyled>
    </article>
  )
}

export default TitleAnimated
