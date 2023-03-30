import React from 'react'
import { PlayingCardProps } from './playing-card.props'

export const PlayingCard: React.FC<PlayingCardProps> = ({ suit, number }) => {
  const suitSymbol = () => {
    switch (suit) {
      case 'hearts':
        return '♥'
      case 'diamonds':
        return '♦'
      case 'clubs':
        return '♣'
      case 'spades':
        return '♠'
      default:
        return ''
    }
  }

  return (
    <svg width="100" height="150">
      <rect width="100" height="150" fill="white" />
      <text x="10" y="20" fontSize="20">
        {number}
      </text>
      <text x="80" y="130" fontSize="20">
        {number}
      </text>
      <text x="50" y="75" fontSize="30">
        {suitSymbol()}
      </text>
    </svg>
  )
}
