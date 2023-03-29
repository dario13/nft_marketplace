import { create } from 'zustand'

const initialState = {
  coinsBalance: '0',
  transactionInProgress: false,
}

type ExchangeState = {
  coinsBalance: string
  transactionInProgress: boolean
  setCoinsBalance: (coinsBalance: string) => void
  setTransactionInProgress: (transactionInProgress: boolean) => void
}

export const useExchangeStore = create<ExchangeState>((set) => ({
  ...initialState,
  setCoinsBalance: (coinsBalance: string) => set({ coinsBalance }),
  setTransactionInProgress: (transactionInProgress: boolean) => set({ transactionInProgress }),
}))
