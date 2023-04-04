import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { SellCard } from './sell-card'

export default {
  title: 'Molecules/SellCard',
  component: SellCard,
} as ComponentMeta<typeof SellCard>

const Template: ComponentStory<typeof SellCard> = (args) => <SellCard {...args} />

export const Primary = Template.bind({})
Primary.args = {
  nftData: {
    name: 'SERPENTI VIPER BRACELET',
    manufacturer: 'BULGARI',
    description:
      'An ultra-modern interpretation of Bvlgaris famed icon of glamour and seduction, Serpenti Viper enchants with its innovative and cutting-edge design. Abstracting the mythical snake through geometric and sleek shapes, the bracelet coils around the wrist striking with the precious beauty of the scales and with the distinctive sinuosity of the Serpenti collection. Serpenti Viper bracelet in 18 kt rose gold with demi-pave diamonds.',
    image:
      'https://media2.bulgari.com/f_auto,q_auto,c_pad,h_520,w_520/production/dw8515e8aa/images/images/1327233.png',
  },
}

//export const Secondary = () => <SellCard />;
