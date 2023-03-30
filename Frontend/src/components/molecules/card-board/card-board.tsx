import React, { useState } from 'react'
import { CardBoardProps } from './card-board.props'
import { useTransition, animated } from '@react-spring/web'
import { AnimatedCardProps } from '@/components/atoms/animated-card/animated-card.props'
import { AnimatedCard } from '@/components/atoms/animated-card'
import { Card } from '@/components/atoms'

const CardBoard: React.FC<CardBoardProps> = ({ addCard, resetBoard }) => {
  const [cards, setCards] = useState<AnimatedCardProps[]>([])

  const handleAddCard = (card: AnimatedCardProps) => {
    setCards((prevCards) => [...prevCards, card])
    addCard(card)
  }

  const handleResetCards = () => {
    setCards([])
    resetBoard()
  }

  const transitions = useTransition(cards, {
    from: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
    enter: { opacity: 1, transform: 'translate3d(0,0px,0)' },
    leave: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
  })

  return (
    <div>
      <button onClick={handleResetCards}>Reset Cards</button>
      <div>
        {transitions((style, card) => (
          <animated.div style={style}>
            <AnimatedCard card={card.card} />
          </animated.div>
        ))}
      </div>
    </div>
  )
}

CardBoard.displayName = 'CardBoard'

export { CardBoard }

// give me a react component, written in typescript, using a react-spring animation, that will show a list of playing card component in rows of up to 3 elements per row.
// The component will obtain the  playing card(number and suit) of the sta
