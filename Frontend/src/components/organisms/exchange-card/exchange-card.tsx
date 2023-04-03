import { Card, FlexBox, Text, ConnectYourWallet } from '@/components/atoms'
import { useMedia } from '@/hooks/use-media'
import React, { useState } from 'react'
import { ExchangeMode } from './exchange-card.props'
import { InfoCard } from './info-card'
import { BuyAndSellCard } from './buy-and-sell-card/buy-and-sell-card'
import exchangeModeContent from './exchange-mode-content'
import { useWallet } from '@/hooks/use-wallet'

const ExchangeCard = () => {
  const { isMobile, isTabletOrMobile, isDesktop } = useMedia()
  const { signer } = useWallet()
  const [exchangeMode, setExchangeMode] = useState<ExchangeMode>('buy')
  const { title, description } = exchangeModeContent(exchangeMode)

  const renderMobileTitleAndDescription = () => {
    return (
      <FlexBox gap="0.7rem" flexDirection="column" flex="0" marginBottom="1.5rem">
        <Text size="xl" bold align="center" text={title} />
        <Text size="md" align="center" text={description} />
      </FlexBox>
    )
  }

  const showExchange = () => {
    return (
      <FlexBox flexDirection="row">
        {!isMobile && <InfoCard exchangeMode={exchangeMode} />}
        <BuyAndSellCard
          handleExchangeMode={(mode) => setExchangeMode(mode)}
          exchangeMode={exchangeMode}
        />
      </FlexBox>
    )
  }

  const showConnectWallet = () => {
    return <ConnectYourWallet />
  }

  return (
    <FlexBox
      flex="0"
      minHeight={isMobile ? '80vh' : '60vh'}
      minWidth={isTabletOrMobile ? '70vw' : '60vw'}
      maxWidth={isDesktop ? '60vw' : undefined}
    >
      {isMobile && renderMobileTitleAndDescription()}
      <Card color="base200">{signer ? showExchange() : showConnectWallet()}</Card>
    </FlexBox>
  )
}

ExchangeCard.displayName = 'ExchangeCard'

export { ExchangeCard }
