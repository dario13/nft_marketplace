import { HardhatUserConfig } from 'hardhat/config'
import '@typechain/hardhat'
import 'hardhat-deploy'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import '@openzeppelin/hardhat-upgrades'
import './tasks'
import * as dotenv from 'dotenv'

dotenv.config({ path: '../.env' })

const config: HardhatUserConfig = {
  namedAccounts: {
    deployer: 0,
    owner: 1,
    userA: 2,
    userB: 3,
    userC: 4,
  },
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      chainId: 31337,
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.9',
      },
    ],
    settings: {
      outputSelection: {
        '*': {
          '*': ['storageLayout'],
        },
      },
    },
  },
  typechain: {
    outDir: 'typechain-types',
    target: 'ethers-v5',
  },
}

export default config
