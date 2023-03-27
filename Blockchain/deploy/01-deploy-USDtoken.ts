import { DeployFunction } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre
  const { deploy, log } = deployments

  const { deployer } = await getNamedAccounts()

  log('----------------------------------------------------')

  try {
    await deploy('USDtoken', {
      from: deployer,
      args: [],
      log: true,
    })
  } catch (error) {
    log('USDtoken deployment failed:', error)
  }

  log('----------------------------------------------------')
}

export default func
func.tags = ['USDtoken']
