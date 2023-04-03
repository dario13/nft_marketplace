import { FlexBox } from '@/components/atoms'
import { MainNavbar } from '@/components/organisms/main-navbar'
import React from 'react'
import { PageLayoutProps } from './page-layout.props'
import { twMerge } from 'tailwind-merge'

const PageLayout = (pageLayoutProps: PageLayoutProps) => {
  const { content, className } = pageLayoutProps

  const classes = twMerge('pageLayout', className, 'bg-base-200')

  return (
    <FlexBox
      gap="3.5rem"
      paddingTop="1rem"
      paddingLeft="0.8rem"
      paddingRight="0.8rem"
      className={classes}
      height="100vh"
      minHeight="100vh"
    >
      <FlexBox flex="0" className="z-10">
        <MainNavbar />
      </FlexBox>
      <FlexBox flex="1">{content}</FlexBox>
    </FlexBox>
  )
}

PageLayout.displayName = 'PageLayout'

export { PageLayout }
