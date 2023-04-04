import { FlexBox } from '@/components/atoms'
import { MainNavbar } from '@/components/organisms/main-navbar'
import React from 'react'
import { PageLayoutProps } from './page-layout.props'
import { twMerge } from 'tailwind-merge'

const PageLayout = (pageLayoutProps: PageLayoutProps) => {
  const { content, className } = pageLayoutProps

  const classes = twMerge('pageLayout', className, 'bg-base-200 min-h-screen')

  return (
    <FlexBox className={classes}>
      <FlexBox gap="3.5rem" paddingTop="1rem" paddingLeft="0.8rem" paddingRight="0.8rem">
        <FlexBox className="z-10" flex="0">
          <MainNavbar />
        </FlexBox>
        <FlexBox>{content}</FlexBox>
      </FlexBox>
    </FlexBox>
  )
}

PageLayout.displayName = 'PageLayout'

export { PageLayout }
