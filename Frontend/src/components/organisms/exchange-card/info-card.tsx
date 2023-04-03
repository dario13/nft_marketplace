import React from 'react'
import { Card, FlexBox, Image, Text } from '@/components/atoms'
import { ExchangeMode } from './exchange-card.props'
import { useTheme } from '@/hooks/use-theme'
import exchangeModeContent from './exchange-mode-content'

const InfoCard = React.memo((props: { exchangeMode: ExchangeMode }) => {
  const { title, description, image } = exchangeModeContent(props.exchangeMode)
  const { theme } = useTheme()

  return (
    <FlexBox maxWidth="40%">
      <Card color={theme === 'luxury' ? 'neutral' : 'base300'}>
        <FlexBox
          padding="3.5rem"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap="3.5rem"
        >
          <Text size="IIIxl" bold align="center" text={title} />
          <Image src={image} width="100%" height="100%" />
          <Text size="xl" align="center" text={description} />
        </FlexBox>
      </Card>
    </FlexBox>
  )
})

InfoCard.displayName = 'InfoCard'

export { InfoCard }
