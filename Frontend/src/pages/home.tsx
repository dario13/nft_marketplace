import React from 'react'
import { FlexBox } from '@/components'
import { PageLayout } from '@/components/layouts/page-layout'
import { ThemeProvider } from '@/contexts/theme/theme-provider'
import { IcosahedronAnimated } from '@/components/atoms/icosahedron-animated'
import TitleAnimated from '@/components/atoms/title-animated/title-animated'
import { useMedia } from '@/hooks/use-media'
import GoldGlitterRain from '@/components/atoms/gold-glitter-rain/gold-glitter-rain'

const Home = () => {
  const { isMobile } = useMedia()
  const renderHome = () => {
    return (
      <FlexBox alignItems="center" justifyContent="center" flexDirection="column" className="z-10">
        <FlexBox width="60vw" padding={isMobile ? '0.1rem' : '1rem'}>
          <FlexBox
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            paddingBottom={isMobile ? '2rem' : '2.5rem'}
            paddingTop={isMobile ? undefined : '3rem'}
            paddingLeft={isMobile ? undefined : '5rem'}
            paddingRight={isMobile ? undefined : '5rem'}
            gap="0.5rem"
          >
            <TitleAnimated text="UNLOCK THE BEAUTY OF THE BLOCKCHAIN" />

            <IcosahedronAnimated />

            <TitleAnimated text="CHAINGEM IS THE FIRST JEWELRY NFT MARKETPLACE" />
          </FlexBox>
        </FlexBox>
      </FlexBox>
    )
  }

  return (
    <ThemeProvider>
      <>
        <PageLayout content={renderHome()} />
        <GoldGlitterRain />
      </>
    </ThemeProvider>
  )
}

export default Home
