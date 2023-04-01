import { Card, FlexBox, Text } from '@/components/atoms'
import { useMedia } from '@/hooks/use-media'
import React, { useState } from 'react'
import { ExchangeMode } from './exchange-card.props'
import { InfoCard } from './info-card'
import { BuyAndSellCard } from './buy-and-sell-card/buy-and-sell-card'
import exchangeModeContent from './exchange-mode-content'

const ExchangeCard = () => {
  const { isMobile, isTabletOrMobile } = useMedia()
  const [exchangeMode, setExchangeMode] = useState<ExchangeMode>('buy')
  const { title, description } = exchangeModeContent(exchangeMode)

  const renderMobileTitleAndDescription = () => {
    return (
      <FlexBox gap="0.7rem" flexDirection="column" flex="0" marginBottom="1.5rem">
        <Text size="xl" bold align="center" text={title} />
        <Text size="md" align="justify" text={description} />
      </FlexBox>
    )
  }

  return (
    <FlexBox
      flex="0"
      minHeight={isMobile ? '80vh' : '60vh'}
      maxWidth={isTabletOrMobile ? '80vw' : '60vw'}
    >
      {isMobile && renderMobileTitleAndDescription()}
      <Card color="base200">
        <FlexBox flexDirection="row">
          {!isMobile && <InfoCard exchangeMode={exchangeMode} />}
          <BuyAndSellCard
            handleExchangeMode={(mode) => setExchangeMode(mode)}
            exchangeMode={exchangeMode}
          />
        </FlexBox>
      </Card>
    </FlexBox>
  )
}

ExchangeCard.displayName = 'ExchangeCard'

export { ExchangeCard }
