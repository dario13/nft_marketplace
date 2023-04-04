import React from 'react'
import { ConnectYourWallet, FlexBox } from '@/components'
import { PageLayout } from '@/components/layouts/page-layout'
import { ThemeProvider } from '@/contexts/theme/theme-provider'
import { ListSellCard } from '@/components/organisms/list-sell-card'
import { useWallet } from '@/hooks/use-wallet'

const Sell = () => {
  const { signer } = useWallet()
  const renderSell = () => {
    return (
      <FlexBox alignItems="center">{signer ? <ListSellCard /> : <ConnectYourWallet />}</FlexBox>
    )
  }

  return (
    <ThemeProvider>
      <>
        <PageLayout content={renderSell()} />
      </>
    </ThemeProvider>
  )
}

export default Sell
