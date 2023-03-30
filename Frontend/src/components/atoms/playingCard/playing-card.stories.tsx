import React from 'react'
import { Story, Meta } from '@storybook/react'
import { PlayingCard } from './playing-card'
import { PlayingCardProps } from './playing-card.props'

// create the story for the generic card icon
export default {
  title: 'Atoms/PlayingCard',
  component: PlayingCard,
  argTypes: {
    suit: {
      control: {
        type: 'select',
        options: ['hearts', 'diamonds', 'clubs', 'spades'],
      },
    },
    number: {
      control: {
        type: 'select',
        options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      },
    },
  },
} as Meta

const Template: Story<PlayingCardProps> = (args) => <PlayingCard {...args} />
export const PlayingCardStory = Template.bind({})
PlayingCardStory.args = {
  suit: 'hearts',
  number: 1,
}
