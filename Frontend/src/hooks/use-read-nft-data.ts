import { useState, useEffect, useMemo, useCallback } from 'react'
import { useContractConnection } from './use-contract-connection'
import { useWallet } from './use-wallet'
import { useHandleBlockchainOperations } from './use-handle-blockchain-operations'

export type NFTData = 'name' | 'manufacturer' | 'description' | 'image | attributes'

type ReadNftDataType = {
  data: Record<NFTData, string>[] | []
  loading: boolean
  error: boolean
}

export const useReadNftData = (): ReadNftDataType => {
  const tokenIds = [2, 3]
  const { chainGemsContract } = useContractConnection()
  const { handleCall } = useHandleBlockchainOperations()
  const { signer } = useWallet()
  const userAddress = signer?.address!
  const [data, setData] = useState<Record<string, string>[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const fetchNftData = useCallback(async () => {
    try {
      setLoading(true)
      const nftDataPromises = []

      for (const tokenId of tokenIds) {
        const quantity =
          (await handleCall(chainGemsContract.balanceOf(userAddress, tokenId)))?.toNumber() || 0

        for (let i = 0; i < quantity; i++) {
          const uri = await chainGemsContract.uri(tokenId)
          const uriWithTokenId = uri.replace('{id}', tokenId.toString())
          const response = await fetch(uriWithTokenId)
          const jsonData = await response.json()
          nftDataPromises.push(jsonData)
        }
      }

      const nftDataList = await Promise.all(nftDataPromises)

      setData(nftDataList)
      setLoading(false)
    } catch (err) {
      setError(true)
      setLoading(false)
    }
  }, [signer])

  useEffect(() => {
    fetchNftData()
  }, [fetchNftData])

  return { data, loading, error }
}
