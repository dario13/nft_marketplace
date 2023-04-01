import { useExchangeStore } from '@/store/exchange/exchange.store'
import { useCallback, useEffect } from 'react'
import { useWallet } from './use-wallet'
import { useContractConnection } from './use-contract-connection'
import env from '@/config/env'
import { useHandleBlockchainOperations } from './use-handle-blockchain-operations'

export type useExchangeType = {
  buyToken: (amountCoinsToBuy: string, maxStableCoinToPay: string) => Promise<void>
  sellToken: (amountCoinsToSell: string, minStableCoinToReceive: string) => Promise<void>
  getStableCoinNeededToBuyCoins: (amountCoinsToBuy: string) => Promise<string | undefined>
  getStableCoinToReceiveFromCoins: (amountStableCoinToSell: string) => Promise<string | undefined>
  operationInProgress: boolean
  coinsBalance: string
  error: boolean
}

const { CHAIN_GEMS_EXCHANGE_CONTRACT_ADDRESS, CHAIN_GEMS_NATIVE_TOKEN_ID } = env

export const useExchange = (): useExchangeType => {
  const { signer, isAccountLoggedOut } = useWallet()
  const { coinsBalance, setCoinsBalance } = useExchangeStore()
  const { chainGemsExchangeContract, chainGemsContract, usdTokenContract } = useContractConnection()
  const { handleTransaction, handleCall, operationInProgress, error } =
    useHandleBlockchainOperations()

  // Buy token
  const buyToken = async (amountCoinsToBuy: string, maxStableCoinToPay: string) => {
    if (!signer) {
      return
    }

    // Approve the exchange to spend the stable coin
    await handleTransaction(
      usdTokenContract.approve(CHAIN_GEMS_EXCHANGE_CONTRACT_ADDRESS, maxStableCoinToPay),
    )

    await handleTransaction(
      chainGemsExchangeContract.buyTokens(
        CHAIN_GEMS_NATIVE_TOKEN_ID,
        amountCoinsToBuy,
        maxStableCoinToPay,
      ),
    )
  }

  const sellToken = async (amountCoinsToSell: string, minStableCoinToReceive: string) => {
    if (!signer) {
      return
    }

    await handleTransaction(
      chainGemsContract.setApprovalForAll(CHAIN_GEMS_EXCHANGE_CONTRACT_ADDRESS, true),
    )

    await handleTransaction(
      chainGemsExchangeContract.sellTokens(
        CHAIN_GEMS_NATIVE_TOKEN_ID,
        amountCoinsToSell,
        minStableCoinToReceive,
      ),
    )
  }

  const getCoinsBalance = useCallback(async () => {
    const fetch = async () => {
      if (isAccountLoggedOut) setCoinsBalance('0')
      if (!signer) return

      const balance = await chainGemsContract.balanceOf(signer.address, CHAIN_GEMS_NATIVE_TOKEN_ID)
      setCoinsBalance(balance.toString())
    }

    fetch()
  }, [signer, isAccountLoggedOut, operationInProgress])

  useEffect(() => {
    getCoinsBalance()
  }, [getCoinsBalance])

  const getStableCoinNeededToBuyCoins = async (amountCoinsToBuy: string) => {
    if (!signer || !amountCoinsToBuy) return

    const stableCoinNeeded = await handleCall(
      chainGemsExchangeContract.getStableCoinAmountOut(
        CHAIN_GEMS_NATIVE_TOKEN_ID,
        amountCoinsToBuy,
      ),
    )

    const extraToExceedTheMin = 1

    return stableCoinNeeded?.add(extraToExceedTheMin)?.toString()
  }

  const getStableCoinToReceiveFromCoins = async (amountCoinsToSell: string) => {
    if (!signer || !amountCoinsToSell) return

    const stableCoinToReceive = await handleCall(
      chainGemsExchangeContract.getStableCoinAmountOut(
        CHAIN_GEMS_NATIVE_TOKEN_ID,
        amountCoinsToSell,
      ),
    )

    return stableCoinToReceive?.toString()
  }

  return {
    buyToken,
    sellToken,
    getStableCoinNeededToBuyCoins,
    getStableCoinToReceiveFromCoins,
    operationInProgress,
    coinsBalance,
    error,
  }
}
