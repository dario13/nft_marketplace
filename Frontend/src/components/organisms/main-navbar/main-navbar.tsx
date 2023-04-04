import { Button, FlexBox, Image, Navbar, Text } from '@/components/atoms'
import { DropdownHamburger } from '@/components/molecules/dropdown-hamburger'
import { useMedia } from '@/hooks/use-media'
import React from 'react'
import logo from '../../../../public/images/logo.png'
import { Menu } from '@/components/atoms/dropdown/dropdown.props'
import { ChangeTheme } from '@/components/molecules/change-theme'
import { WalletButton } from '@/components/molecules/wallet-button'
import Navigate from '@/components/atoms/primitives/navigate/navigate'

const MainNavbar = () => {
  const { isMobile } = useMedia()

  const menuItems: Menu = [
    {
      label: 'Exchange',
      href: '/exchange',
    },
    {
      label: 'Sell',
      href: '/sell',
    },
  ]

  const renderLogo = () => {
    return (
      <Navigate href="/" asAButton>
        <FlexBox flexDirection="row" gap="0.5rem" alignItems="center">
          <FlexBox flexDirection="row" paddingTop="0.3rem">
            <Image src={logo} width={isMobile ? 50 : 25} height={isMobile ? 50 : 25} title="logo" />
          </FlexBox>
          {!isMobile && (
            <FlexBox flexDirection="row">
              <Text bold size="IIIxl" className="text-primary">
                {'Chain'}
              </Text>
              <Text bold size="IIIxl">
                {'Gem'}
              </Text>
            </FlexBox>
          )}
        </FlexBox>
      </Navigate>
    )
  }

  const renderWalletButton = () => {
    return <WalletButton />
  }

  const renderLeftSideForMobile = () => {
    return (
      <>
        <DropdownHamburger menuItems={menuItems} />
        <ChangeTheme />
      </>
    )
  }

  const leftSideNavbar = () => {
    return (
      <FlexBox flexDirection="row" alignItems="flex-start" paddingLeft={isMobile ? '' : '3rem'}>
        {isMobile ? renderLeftSideForMobile() : renderLogo()}
      </FlexBox>
    )
  }

  const renderMenu = () => {
    return (
      <FlexBox flexDirection="row" paddingRight="1.5rem" gap="1rem" justifyContent="flex-end">
        {menuItems.map(({ label, onClick, href, active, color, endIcon, startIcon }) => (
          <Button
            color={color || 'ghost'}
            key={label}
            text={label}
            onClick={onClick}
            href={href}
            active={active}
            endIcon={endIcon}
            startIcon={startIcon}
            responsive={false}
          />
        ))}
        <ChangeTheme />
        {renderWalletButton()}
      </FlexBox>
    )
  }

  const rightSideNavbar = () => {
    return isMobile ? renderWalletButton() : renderMenu()
  }

  return (
    <>
      <Navbar
        left={leftSideNavbar()}
        center={isMobile ? renderLogo() : undefined}
        right={rightSideNavbar()}
        background={!isMobile}
        data-testid="MainNavBar"
      />
    </>
  )
}

MainNavbar.displayName = 'MainNavbar'

export { MainNavbar }
