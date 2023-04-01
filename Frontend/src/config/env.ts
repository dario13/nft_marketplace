import deployedContractAddresses from '@dario13/nft_marketplace_blockchain/deployed-contract-addresses.json'

type EnvConstants = {
  CHAIN_GEMS_CONTRACT_ADDRESS: string
  USD_TOKEN_CONTRACT_ADDRESS: string
  CHAIN_GEMS_EXCHANGE_CONTRACT_ADDRESS: string
  BLOCK_CONFIRMATIONS: number
  CHAIN_GEMS_NATIVE_TOKEN_ID: number
}

const getEnvConstants = (): EnvConstants => {
  return {
    CHAIN_GEMS_CONTRACT_ADDRESS: deployedContractAddresses.ChainGems,
    USD_TOKEN_CONTRACT_ADDRESS: deployedContractAddresses.USDtoken,
    CHAIN_GEMS_EXCHANGE_CONTRACT_ADDRESS: deployedContractAddresses.ChainGemsExchange,
    BLOCK_CONFIRMATIONS: deployedContractAddresses.blockConfirmations,
    CHAIN_GEMS_NATIVE_TOKEN_ID: 0,
  }
}

export default getEnvConstants()
