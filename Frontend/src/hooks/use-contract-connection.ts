import {
  ChainGemsExchange__factory,
  ChainGems__factory,
  USDtoken__factory,
  ChainGems,
  USDtoken,
  ChainGemsExchange,
} from '@dario13/nft_marketplace_blockchain/typechain-types'
import { useMemo } from 'react'
import { useWallet } from './use-wallet'
import env from '@/config/env'

type ContractConnectionState = {
  chainGemsContract: ChainGems
  chainGemsExchangeContract: ChainGemsExchange
  usdTokenContract: USDtoken
}

export const useContractConnection = (): ContractConnectionState => {
  const { signer } = useWallet()

  const {
    CHAIN_GEMS_CONTRACT_ADDRESS,
    USD_TOKEN_CONTRACT_ADDRESS,
    CHAIN_GEMS_EXCHANGE_CONTRACT_ADDRESS,
  } = env

  const chainGemsContract: ChainGems = useMemo(() => {
    return ChainGems__factory.connect(CHAIN_GEMS_CONTRACT_ADDRESS, signer!)
  }, [signer, CHAIN_GEMS_CONTRACT_ADDRESS])

  const chainGemsExchangeContract: ChainGemsExchange = useMemo(() => {
    return ChainGemsExchange__factory.connect(CHAIN_GEMS_EXCHANGE_CONTRACT_ADDRESS, signer!)
  }, [signer, CHAIN_GEMS_EXCHANGE_CONTRACT_ADDRESS])

  const usdTokenContract: USDtoken = useMemo(() => {
    return USDtoken__factory.connect(USD_TOKEN_CONTRACT_ADDRESS, signer!)
  }, [signer, USD_TOKEN_CONTRACT_ADDRESS])

  return {
    chainGemsContract,
    chainGemsExchangeContract,
    usdTokenContract,
  }
}
