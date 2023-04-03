// TitleAnimatedStyled.ts
import styled, { keyframes } from 'styled-components'
import { TitleNeonProps, TitleColorProps } from './title-animated.props'

const neonAnimation = (neonColor: string) => keyframes`
  0%, 100% {
    text-shadow: 0 0 5px ${neonColor},
                0 0 10px ${neonColor},
                0 0 20px ${neonColor},
                0 0 30px ${neonColor},
                0 0 40px ${neonColor};
  }
  50% {
    text-shadow: 0 0 2px ${neonColor},
                0 0 5px ${neonColor},
                0 0 10px ${neonColor},
                0 0 20px ${neonColor},
                0 0 30px ${neonColor};
  }
`

export const TitleStyled = styled.article<TitleNeonProps>`
  h1 {
    animation: ${(props) => neonAnimation(props.neonColor!)} 1.5s infinite;
  }
`
