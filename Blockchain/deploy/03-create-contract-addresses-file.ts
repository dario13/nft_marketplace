import { ethers, run } from 'hardhat'
import { promises as fs } from 'fs'
import * as path from 'path'
import { DeployFunction } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const contractList = {
    ChainGems: (await ethers.getContract('ChainGems')).address,
    USDtoken: (await ethers.getContract('USDtoken')).address,
    ChainGemsExchange: (await ethers.getContract('ChainGemsExchange')).address,
    blockConfirmations: 1,
  }

  const filePath = path.join(__dirname, '..', 'deployed-contract-addresses.json')
  fs.writeFile(filePath, JSON.stringify(contractList, null, 2))

  console.log(`Contract addresses and names saved to ${filePath}`)
}

export default func
func.tags = ['CreateContractList']
