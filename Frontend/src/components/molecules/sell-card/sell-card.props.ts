export type NftData = {
  name: string
  manufacturer: string
  description: string
  image: string
  attributes: attributes
}

export type attributes = {
  manufacturer: string
  batchNumber: string
  madeIn: string
}

export type SellCardProps = {
  nftData: NftData
}
