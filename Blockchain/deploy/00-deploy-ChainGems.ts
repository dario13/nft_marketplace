import { DeployFunction } from 'hardhat-deploy/types'
import { run } from 'hardhat'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre
  const { deploy, log } = deployments

  const { deployer } = await getNamedAccounts()

  log('----------------------------------------------------')

  try {
    const { address } = await deploy('ChainGems', {
      from: deployer,
      args: [],
      log: true,
    })

    log('ChainGems deployed to:', address)
  } catch (error) {
    log('ChainGems deployment failed:', error)
  }

  log('----------------------------------------------------')
}

export default func
func.tags = ['ChainGems']
