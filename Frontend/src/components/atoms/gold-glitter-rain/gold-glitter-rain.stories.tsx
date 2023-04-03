import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import GoldGlitterRain from './gold-glitter-rain'

export default {
  title: 'Organisms/GoldGlitterRain',
  component: GoldGlitterRain,
} as ComponentMeta<typeof GoldGlitterRain>

const Template: ComponentStory<typeof GoldGlitterRain> = (args) => <GoldGlitterRain {...args} />

export const Primary = Template.bind({})
Primary.args = {}
