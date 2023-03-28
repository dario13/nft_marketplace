import { task } from 'hardhat/config'
import { NetWorkInfo } from './network-info'
import { ChainGems } from 'typechain-types'

task(
  'transferNFT',
  'Given an address and a token id, transfer one nft from that id collection to the specified address.' +
    'Example: yarn hardhat transferNFT --to {address} --id {id} --network localhost',
)
  .addParam('to', 'The address to transfer the NFT to')
  .addParam('id', 'The id of NFT to transfer')
  .setAction(async (taskArgs, hre) => {
    const { ethers } = hre
    const { to, id } = taskArgs
    await hre.deployments.fixture(['ChainGems'])

    const { deployer }: NetWorkInfo = await hre.run('networkInfo')

    const chainGemsContract: ChainGems = await ethers.getContract('ChainGems')

    const deployerConnectedToContract = chainGemsContract.connect(deployer)

    await deployerConnectedToContract.safeTransferFrom(deployer.address, to, id, 1, '0x')

    const balance = await deployerConnectedToContract.balanceOf(to, id)

    console.log(`Balance of token id ${id} for address ${to}: ${balance}`)
  })
