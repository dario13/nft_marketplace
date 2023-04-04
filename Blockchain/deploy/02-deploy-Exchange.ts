import { ethers, run } from 'hardhat'
import { DeployFunction } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { ChainGems, USDtoken } from 'typechain-types'
import { NetWorkInfo } from 'tasks'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments } = hre
  const { deploy, log } = deployments

  const { deployer }: NetWorkInfo = await run('networkInfo')

  log('----------------------------------------------------')
  const ChainGemsContract: ChainGems = await ethers.getContract('ChainGems')
  const USDtokenContract: USDtoken = await ethers.getContract('USDtoken')
  const nativeTokenId = 1

  try {
    const { address: exchangeAddress } = await deploy('ChainGemsExchange', {
      from: deployer.address,
      args: [ChainGemsContract.address, nativeTokenId, USDtokenContract.address],
      log: true,
    })

    // Provide the exchange with some native tokens and some USD tokens
    const amountToTransfer = (10 ** 8).toString()
    await ChainGemsContract.connect(deployer).safeTransferFrom(
      deployer.address,
      exchangeAddress,
      nativeTokenId,
      amountToTransfer,
      '0x',
    )

    await USDtokenContract.connect(deployer).transfer(exchangeAddress, amountToTransfer)
  } catch (error) {
    log('ChainGemsExchange deployment failed:', error)
  }

  log('----------------------------------------------------')
}

export default func
func.tags = ['ChainGemsExchange']
