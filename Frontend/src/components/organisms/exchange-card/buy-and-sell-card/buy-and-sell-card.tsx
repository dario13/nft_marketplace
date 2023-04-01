import React, { useEffect, useState } from 'react'
import { Button, FlexBox } from '@/components/atoms'
import { useMedia } from '@/hooks/use-media'
import { ExchangeMode } from '../exchange-card.props'
import { useExchange } from '@/hooks/use-exchange'
import AmountInput from './amount-input'
import ConversionInfo from './conversion-info'
import ConfirmationModal from './confirmation-modal'
import BuyAndSellHeader from './buy-and-sell-header'
import { coinsToBuyIsLessThanMinimum, coinsToSellIsLessThanMinimum } from './buy-and-sell-constants'
import { useHydration } from '@/hooks/use-hydration'

type BuyAndSellCardProps = {
  handleExchangeMode: (mode: ExchangeMode) => void
  exchangeMode: ExchangeMode
}

const BuyAndSellCard = React.memo((props: BuyAndSellCardProps) => {
  const { exchangeMode, handleExchangeMode } = props
  const [amountToBuy, setAmountToBuy] = useState<string>('')
  const [amountToSell, setAmountToSell] = useState<string>('')
  const [stableCoinNeededToBuyCoins, setStableCoinNeededNeededToBuyCoins] = useState<string>('')
  const [stableCoinToReceiveFromCoins, setStableCoinToReceiveFromCoins] = useState<string>('')
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false)
  const { isMobile } = useMedia()
  const hasHydrated = useHydration()
  const {
    buyToken,
    sellToken,
    getStableCoinNeededToBuyCoins,
    getStableCoinToReceiveFromCoins,
    operationInProgress,
  } = useExchange()

  useEffect(() => {
    if (amountToBuy) {
      getStableCoinNeededToBuyCoins(amountToBuy).then((stableCoinNeeded) => {
        stableCoinNeeded ? setStableCoinNeededNeededToBuyCoins(stableCoinNeeded) : null
      })
    }
    if (amountToSell) {
      getStableCoinToReceiveFromCoins(amountToSell).then((stableCoinToReceive) => {
        stableCoinToReceive ? setStableCoinToReceiveFromCoins(stableCoinToReceive) : null
      })
    }
  }, [amountToBuy, amountToSell])

  const isBuyMode = exchangeMode === 'buy'

  const shouldConfirmButtonBeDisabled = () => {
    if (operationInProgress) return true
    if (isBuyMode) {
      if (!amountToBuy) return true
      return coinsToBuyIsLessThanMinimum(amountToBuy)
    } else {
      if (!amountToSell) return true
      return coinsToSellIsLessThanMinimum(amountToSell)
    }
  }

  const handleConfirmation = () => {
    if (isBuyMode) {
      buyToken(amountToBuy, stableCoinNeededToBuyCoins)
    } else {
      sellToken(amountToSell, stableCoinToReceiveFromCoins)
    }
    setShowConfirmationModal(false)
  }

  const handleInputChange = (mask: IMask.InputMask<IMask.AnyMaskedOptions>) => {
    if (isBuyMode) {
      setAmountToBuy(mask.unmaskedValue)
    } else {
      setAmountToSell(mask.unmaskedValue)
    }
  }

  const handleResetInput = () => {
    setAmountToBuy('')
    setAmountToSell('')
    setStableCoinNeededNeededToBuyCoins('')
    setStableCoinToReceiveFromCoins('')
  }

  const content = () => {
    return (
      <FlexBox flexDirection="column" justifyContent="space-around">
        <FlexBox flexDirection="column" padding={isMobile ? '2vh' : '5vh'} flex="0" gap="1vh">
          {hasHydrated && (
            <AmountInput
              exchangeMode={exchangeMode}
              isMobile={isMobile}
              amountToBuy={amountToBuy}
              amountToSell={amountToSell}
              handleInputChange={handleInputChange}
              handleResetInput={handleResetInput}
            />
          )}
        </FlexBox>
        {(!coinsToBuyIsLessThanMinimum(amountToBuy) ||
          !coinsToSellIsLessThanMinimum(amountToSell)) && (
          <ConversionInfo
            isBuyMode={isBuyMode}
            amount={stableCoinToReceiveFromCoins || stableCoinNeededToBuyCoins}
          />
        )}
        <Button
          key={exchangeMode + 'confirm'}
          color="primary"
          text="Confirm"
          responsive={false}
          loading={operationInProgress}
          disabled={shouldConfirmButtonBeDisabled()}
          onClick={() => setShowConfirmationModal(true)}
        />
      </FlexBox>
    )
  }

  return (
    <>
      <FlexBox flexDirection="column" padding={isMobile ? '5vh' : '7vh'} width="30vw" height="60vh">
        <BuyAndSellHeader exchangeMode={exchangeMode} handleExchangeMode={handleExchangeMode} />
        {content()}
      </FlexBox>
      <ConfirmationModal
        visible={showConfirmationModal}
        exchangeMode={exchangeMode}
        coinsAmount={amountToSell || amountToBuy}
        stableCoinAmount={stableCoinToReceiveFromCoins || stableCoinNeededToBuyCoins}
        onConfirm={() => handleConfirmation()}
        onCancel={() => setShowConfirmationModal(false)}
      />
    </>
  )
})

BuyAndSellCard.displayName = 'BuyAndSellCard'

export { BuyAndSellCard }
