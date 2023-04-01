import { create } from 'zustand'

const initialState = {
  coinsBalance: '0',
}

type ExchangeState = {
  coinsBalance: string
  setCoinsBalance: (coinsBalance: string) => void
}

export const useExchangeStore = create<ExchangeState>((set) => ({
  ...initialState,
  setCoinsBalance: (coinsBalance: string) => set({ coinsBalance }),
}))
