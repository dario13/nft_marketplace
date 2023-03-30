import { AnimatedCardProps } from '@/components/atoms/animated-card/animated-card.props'

export type CardBoardProps = {
  addCard: (card: AnimatedCardProps) => void
  resetBoard: () => void
}
