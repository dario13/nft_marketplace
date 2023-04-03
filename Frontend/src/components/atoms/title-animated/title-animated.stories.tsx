import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import TitleAnimated from './title-animated'

export default {
  title: 'Atoms/TitleAnimated',
  component: TitleAnimated,
} as ComponentMeta<typeof TitleAnimated>

const Template: ComponentStory<typeof TitleAnimated> = (args) => <TitleAnimated {...args} />

export const Primary = Template.bind({})
Primary.args = {}

//export const Secondary = () => <TitleAnimated />;
