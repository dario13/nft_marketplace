export const modalTitle = {
  buy: 'Buy COINS',
  sell: 'Sell COINS',
}

export const inputLabel = {
  buy: 'Amount to buy',
  sell: 'Amount to sell',
}

export const modalMessage = {
  buy: 'You are about to buy ',
  sell: 'You are about to sell ',
  common1: ' COINS for ',
  common2: ' USDT',
  common3:
    '. This action cannot be undone, clicking on confirm will send the transaction to the blockchain',
}

export const minimumToExchangeMessage = {
  buy: 'The minimum amount to buy is: ',
  sell: 'The minimum amount to sell is: ',
}

export const conversionMessage = {
  buy: 'You will pay ',
  sell: 'You will receive ',
  arrow: ' → ',
}

export const minimumCOINSToBuy = 3
export const minimumCOINSToSell = 3

export const maskOptions = {
  buy: {
    mask: Number,
    scale: 0,
    signed: false,
    thousandsSeparator: '',
    radix: '.',
    mapToRadix: ['.'],
    max: 1000000,
    lazy: true,
  },
  sell: {
    mask: Number,
    scale: 0,
    signed: false,
    thousandsSeparator: '',
    radix: '.',
    mapToRadix: ['.'],
    max: 1000000,
    lazy: true,
  },
}

export const coinsToBuyIsLessThanMinimum = (amountToBuy: Number | string) => {
  return Number(amountToBuy) < minimumCOINSToBuy
}

export const coinsToSellIsLessThanMinimum = (amountToSell: Number | string) => {
  return Number(amountToSell) < minimumCOINSToSell
}
