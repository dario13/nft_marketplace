import { task } from 'hardhat/config'
import { HardhatRuntimeEnvironment, TaskArguments } from 'hardhat/types'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

export type NetWorkInfo = {
  isLocalNetwork: boolean
  chainId: number
  deployer: SignerWithAddress
}

task(
  'networkInfo',
  'Returns all the information about the chosen network',
  async (taskArgs: TaskArguments, hre: HardhatRuntimeEnvironment): Promise<NetWorkInfo> => {
    const chainId: string | undefined = await hre.getChainId()

    if (!chainId) {
      throw new Error('Chain id not specified')
    }

    const isLocalNetwork: boolean = chainId === '31337'

    const [deployer] = await hre.ethers.getSigners()

    return {
      isLocalNetwork,
      chainId: Number(chainId),
      deployer,
    }
  },
)
