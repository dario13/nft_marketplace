import styled, { keyframes, css } from 'styled-components'

const fall = keyframes`
  0% {
    transform: translateY(-100%) translateZ(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(100%) translateZ(-250px);
    opacity: 0;
  }
`

const glitterAnimation = css`
  animation: ${fall} linear infinite;
  opacity: 0;
`

export const GoldGlitterRainWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
  perspective: 1000px;
`

export const Glitter = styled.div`
  position: absolute;
  ${glitterAnimation};
`
