import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { AnimatedCard } from './animated-card'

export default {
  title: 'Atoms/AnimatedCard',
  component: AnimatedCard,
} as ComponentMeta<typeof AnimatedCard>

const Template: ComponentStory<typeof AnimatedCard> = (args) => <AnimatedCard {...args} />

export const Primary = Template.bind({})
Primary.args = {
  card: {
    suit: 'hearts',
    number: 1,
  },
}
