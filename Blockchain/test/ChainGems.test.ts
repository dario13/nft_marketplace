import { expect } from './chai-setup'
import { deployments, ethers, getNamedAccounts } from 'hardhat'
import { setupNamedUsers } from './utils/setup-users'
import { ChainGems } from 'typechain-types'

const setup = async () => {
  await deployments.fixture(['ChainGems'])

  const ChainGemsContract: ChainGems = await ethers.getContract('ChainGems')

  const users = await setupNamedUsers(await getNamedAccounts(), { ChainGems: ChainGemsContract })

  return {
    ChainGemsContract,
    users,
  }
}

describe('ChainGems contract tests', () => {
  it('should assign the initial native token supply to the deployer', async () => {
    // Given
    const { ChainGemsContract, users } = await setup()
    const { deployer } = users
    const initialSupply = (10 ** 18).toString()

    // When
    const deployerBalance = await ChainGemsContract.balanceOf(deployer.address, 1)

    // Then
    expect(deployerBalance.toString()).to.equal(initialSupply)
  })
})
