import React from 'react'
import { AnimatedCardProps } from './animated-card.props'
import { useSpring, animated } from '@react-spring/web'
import { PlayingCard } from '../playingCard/playing-card'

const AnimatedCard: React.FC<AnimatedCardProps> = ({ card }) => {
  const [isFlipped, setIsFlipped] = React.useState(false)

  const { transform, opacity } = useSpring({
    opacity: isFlipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${isFlipped ? 0 : 180}deg)`,
  })

  React.useEffect(() => {
    const randomTimeout = Math.floor(Math.random() * 1000) + 1000 // random timeout between 1s and 3s
    const flipTimer = setTimeout(() => setIsFlipped(true), randomTimeout)
    return () => clearTimeout(flipTimer)
  }, [])

  return (
    <animated.div style={{ transform, opacity }}>
      <PlayingCard number={card.number} suit={card.suit} />
    </animated.div>
  )
}

AnimatedCard.displayName = 'AnimatedCard'

export { AnimatedCard }
