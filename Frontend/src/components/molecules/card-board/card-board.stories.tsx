import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { CardBoard } from './card-board'

export default {
  title: 'Molecules/CardBoard',
  component: CardBoard,
} as ComponentMeta<typeof CardBoard>

const Template: ComponentStory<typeof CardBoard> = (args) => <CardBoard {...args} />

export const Primary = Template.bind({})
Primary.args = {
  cards: [
    {
      card: {
        suit: 'hearts',
        number: 1,
      },
    },
    {
      card: {
        suit: 'hearts',
        number: 2,
      },
    },
    {
      card: {
        suit: 'hearts',
        number: 3,
      },
    },
    {
      card: {
        suit: 'hearts',
        number: 5,
      },
    },
  ],
}

// export const Secondary = () => <CardBoard />;
