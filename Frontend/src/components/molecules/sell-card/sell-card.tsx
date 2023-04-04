import React, { useState } from 'react'
import { SellCardProps } from './sell-card.props'

import { Button, Card, FlexBox, Image, Text } from '@/components/atoms'

const SellCard: React.FC<SellCardProps> = ({ nftData }) => {
  const [showFullDescription, setShowFullDescription] = useState(false)

  const maxNumberOfCharacters = 80

  const handleToggleDescription = () => {
    setShowFullDescription(!showFullDescription)
  }

  const getDescription = () => {
    if (showFullDescription) {
      return nftData.description
    } else {
      return nftData.description.slice(0, maxNumberOfCharacters) + '...'
    }
  }

  return (
    <FlexBox>
      <Card color="base200">
        <FlexBox flexDirection="column" justifyContent="space-between" className="p-8">
          <FlexBox onClick={handleToggleDescription} className="cursor-pointer">
            <Text size="IIxl" bold>
              {nftData.name}
            </Text>
            <Text bold>{nftData.attributes.manufacturer}</Text>
            <Text>{getDescription()}</Text>
            <FlexBox justifyContent="center" alignItems="center">
              <Image src={nftData.image} alt={nftData.name} width={200} height={200} />
            </FlexBox>
          </FlexBox>
          <FlexBox flexDirection="column" justifyContent="flex-end">
            <Button color="primary" text="Sell" />
          </FlexBox>
        </FlexBox>
      </Card>
    </FlexBox>
  )
}

SellCard.displayName = 'SellCard'

export { SellCard }
