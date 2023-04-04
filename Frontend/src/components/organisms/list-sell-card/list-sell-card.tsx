import React from 'react'
import { FlexBox, Text } from '@/components/atoms'
import { useReadNftData } from '@/hooks/use-read-nft-data'
import { useMedia } from '@/hooks/use-media'
import { SellCard } from '@/components/molecules'

const ListSellCard: React.FC = () => {
  const { data: nfts } = useReadNftData()
  const { isMobile } = useMedia()

  return (
    <FlexBox
      flexDirection={isMobile ? 'column' : 'row'}
      flexWrap="wrap"
      gap="1.5rem"
      justifyContent="center"
    >
      {nfts.length === 0 && <Text>{'There are no NFTs to sell at this time'}</Text>}

      {nfts.length > 0 && nfts.map((nft, index) => <SellCard key={index} nftData={nft} />)}
    </FlexBox>
  )
}

ListSellCard.displayName = 'ListSellCard'

export { ListSellCard }
