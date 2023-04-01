import { task } from 'hardhat/config'
import { NetWorkInfo } from './network-info'
import { USDtoken } from 'typechain-types'

task(
  'transferUSDT',
  'Given an address and an amount, transfer that amount of USDT to the specified address.' +
    'Example: yarn hardhat transferUSDT --to {address} --amount {amount} --network localhost',
)
  .addParam('to', 'The address to transfer the USDT to')
  .addParam('amount', 'The amount of USDT to transfer')
  .setAction(async (taskArgs, hre) => {
    const { ethers } = hre
    const { to, amount } = taskArgs

    const { deployer }: NetWorkInfo = await hre.run('networkInfo')

    const usdtContract: USDtoken = await ethers.getContract('USDtoken')

    const deployerConnectedToContract = usdtContract.connect(deployer)

    await deployerConnectedToContract.transfer(to, amount)

    const balance = await deployerConnectedToContract.balanceOf(to)

    console.log('USDT Contract Address: ', usdtContract.address)
    console.log(`Balance of USDT for address ${to}: ${balance}`)
  })
