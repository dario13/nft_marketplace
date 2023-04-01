import React from 'react'
import { Text } from '@/components/atoms'

import { ExchangeMode } from '../exchange-card.props'
import {
  coinsToBuyIsLessThanMinimum,
  coinsToSellIsLessThanMinimum,
  inputLabel,
  maskOptions,
  minimumCOINSToBuy,
  minimumCOINSToSell,
  minimumToExchangeMessage,
} from './buy-and-sell-constants'
import Input from '@/components/atoms/input/input'

type AmountInputProps = {
  exchangeMode: ExchangeMode
  isMobile: boolean
  amountToBuy: string
  amountToSell: string
  handleInputChange: (mask: IMask.InputMask<IMask.AnyMaskedOptions>) => void
  handleResetInput: () => void
}

const AmountInput: React.FC<AmountInputProps> = ({
  exchangeMode,
  isMobile,
  amountToBuy,
  amountToSell,
  handleInputChange,
  handleResetInput,
}) => {
  const isBuyMode = exchangeMode === 'buy'

  const amountIsValid = () => {
    if (isBuyMode) {
      if (!amountToBuy) return true
      return !coinsToBuyIsLessThanMinimum(amountToBuy)
    } else {
      if (!amountToSell) return true
      return !coinsToSellIsLessThanMinimum(amountToSell)
    }
  }

  return (
    <>
      <Input
        key={exchangeMode + '-amount-input'}
        title={'amount-to-' + exchangeMode}
        label={inputLabel[exchangeMode]}
        inputSize={isMobile ? 'sm' : 'md'}
        suffix={'COINS'}
        type="text"
        mask={{
          options: maskOptions[exchangeMode],
          onAccept() {
            handleResetInput()
          },
          onComplete(value, mask) {
            handleInputChange(mask)
          },
        }}
        value={isBuyMode ? amountToBuy : amountToSell}
        color={amountIsValid() ? 'ghost' : 'error'}
      />
      {!amountIsValid() && (
        <Text
          text={
            isBuyMode
              ? minimumToExchangeMessage.buy + minimumCOINSToBuy
              : minimumToExchangeMessage.sell + minimumCOINSToSell
          }
        />
      )}
    </>
  )
}

export default React.memo(AmountInput)
