import React from 'react'

import { GoldGlitterRainWrapper, Glitter } from './gold-glitter-rain.styles'

const GoldGlitterRain: React.FC = () => {
  return (
    <GoldGlitterRainWrapper>
      {Array.from({ length: 200 }).map((_, index) => (
        <Glitter
          key={index}
          className="bg-yellow-400 w-1 h-1 absolute"
          style={{
            top: Math.random() * 100 + 'vh',
            left: Math.random() * 100 + 'vw',
            animationDuration: 1 + Math.random() * 3 + 's',
            animationDelay: Math.random() * 2 + 's',
          }}
        />
      ))}
    </GoldGlitterRainWrapper>
  )
}

export default GoldGlitterRain
