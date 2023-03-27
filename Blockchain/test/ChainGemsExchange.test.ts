import { expect } from './chai-setup'
import { deployments, ethers, getNamedAccounts } from 'hardhat'
import { setupNamedUsers } from './utils/setup-users'
import { ChainGems, USDtoken } from 'typechain-types'
import { ChainGemsExchange } from 'typechain-types/contracts/Exchange.sol'
import { BigNumber } from 'ethers'

const setup = async () => {
  await deployments.fixture(['ChainGems', 'USDtoken', 'ChainGemsExchange'])

  const ChainGemsContract: ChainGems = await ethers.getContract('ChainGems')
  const USDtokenContract: USDtoken = await ethers.getContract('USDtoken')
  const ChainGemsExchangeContract: ChainGemsExchange = await ethers.getContract('ChainGemsExchange')

  const users = await setupNamedUsers(await getNamedAccounts(), {
    ChainGems: ChainGemsContract,
    USDtoken: USDtokenContract,
    ChainGemsExchange: ChainGemsExchangeContract,
  })

  return {
    ChainGemsContract,
    users,
  }
}

describe('ChainGemsExchange contract tests', () => {
  it('should buy tokens with stablecoin', async () => {
    // Given
    const { ChainGemsContract, users } = await setup()
    const { deployer, userA } = users
    const tokenAmountToBuy = ethers.utils.parseUnits('1', 4)
    const maxStablecoinAmountToPay = ethers.utils.parseUnits('10', 4)
    await deployer.USDtoken.transfer(userA.address, maxStablecoinAmountToPay)

    // When
    await userA.USDtoken.approve(userA.ChainGemsExchange.address, maxStablecoinAmountToPay)
    const userBalanceBeforeBuy = await ChainGemsContract.balanceOf(userA.address, 0)
    await userA.ChainGemsExchange.buyTokens(0, tokenAmountToBuy, maxStablecoinAmountToPay)
    const userBalanceAfterBuy = await ChainGemsContract.balanceOf(userA.address, 0)

    // Then
    expect(userBalanceBeforeBuy).to.equal(0)
    expect(userBalanceAfterBuy).to.equal(tokenAmountToBuy)
  })
  it('should sell tokens for stablecoin', async () => {
    // Given
    const { users } = await setup()
    const { deployer, userA } = users
    const tokenAmountToSell = ethers.utils.parseUnits('10', 4)
    const minStablecoinAmountToReceive = ethers.utils.parseUnits('1', 4)

    // Transfer tokens to userA
    await deployer.ChainGems.safeTransferFrom(
      deployer.address,
      userA.address,
      0,
      tokenAmountToSell,
      '0x',
    )

    // When
    const userBalanceBeforeSell = await userA.USDtoken.balanceOf(userA.address)
    await userA.ChainGems.setApprovalForAll(userA.ChainGemsExchange.address, true)
    await userA.ChainGemsExchange.sellTokens(0, tokenAmountToSell, minStablecoinAmountToReceive)
    const userBalanceAfterSell = await userA.USDtoken.balanceOf(userA.address)

    // Then
    expect(userBalanceBeforeSell).to.equal(0)
    expect(userBalanceAfterSell.toNumber()).to.be.approximately(tokenAmountToSell.toNumber(), 1000)
  })
})
