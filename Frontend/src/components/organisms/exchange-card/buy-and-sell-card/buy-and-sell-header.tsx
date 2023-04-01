import React from 'react'
import { Button, FlexBox } from '@/components/atoms'
import { Divider } from '@/components/atoms/divider'
import { ExchangeMode } from '../exchange-card.props'

type BuyAndSellHeaderProps = {
  exchangeMode: ExchangeMode
  handleExchangeMode: (mode: ExchangeMode) => void
}

const BuyAndSellHeader: React.FC<BuyAndSellHeaderProps> = ({
  exchangeMode,
  handleExchangeMode,
}) => {
  const isBuyMode = exchangeMode === 'buy'
  const mainColor = isBuyMode ? 'success' : 'error'

  return (
    <FlexBox flexDirection="column" flex="0">
      <FlexBox flexDirection="row" justifyContent="space-around">
        <Button
          text="Buy"
          size="md"
          color={isBuyMode ? mainColor : 'ghost'}
          onClick={() => handleExchangeMode('buy')}
        />

        <Button
          text="Sell"
          size="md"
          color={isBuyMode ? 'ghost' : mainColor}
          onClick={() => handleExchangeMode('sell')}
        />
      </FlexBox>
      <FlexBox marginTop="-1px">
        <Divider color={mainColor} />
      </FlexBox>
    </FlexBox>
  )
}

export default React.memo(BuyAndSellHeader)
