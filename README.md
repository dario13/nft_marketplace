<div align="center">
<img src="https://github.com/dario13/nft_marketplace/blob/master/Frontend/public/images/logo.png?raw=true" alt="ChainGem logo" title="ChainGem" height="80"/>

<h1 ><strong style="color:darkgoldenrod">Chain</strong><strong style="color:gold">Gem</strong></h1>
</div>

\
This project aims to create an NFT Marketplace with focus on best practices and scalability.

## Table of content

- [Introduction](#introduction)

- [Project sections](#project-sections)

- [Project structure](#project-structure)

- [Principles](#principles)

- [Architecture](#architecture)

- [Metodologies](#metodologies)

- [Technologies](#technologies)

- [Run project](#run-project)

- [Run Tools](#run-tools)

  <br><br>

## Introduction

The problem of counterfeit jewelry is a significant issue in the market, which leads to buyers being scammed into purchasing products that are not authentic. In this projet, I propose a solution to this problem through the use of non-fungible tokens (NFTs) in a jewelry marketplace. My approach involves creating a platform that connects jewelry manufacturers, owners, and buyers through the use of NFTs, which would ensure the authenticity of the jewelry and create a more secure marketplace for buyers.

## Project sections

This solution consists of three main sections:

1. A manufacturer section for minting NFTs
2. An owner section for selling authentic jewelry with accompanying NFTs
3. A marketplace for buyers to purchase authentic jewelry.

The manufacturer section will use a signature-based validation process to ensure that only authentic jewelry manufacturers are able to mint NFTs on our platform. Owners will then be able to sell their authentic jewelry with accompanying NFTs in the owner section, and buyers can purchase authentic jewelry with confidence on the marketplace.

## Project structure

The repository is a monorepo, which means that it contains multiple projects. Currently contains 3 projects:

1. The blockchain project, that uses Hardhat as a development environment, testing framework and deployment tool for Ethereum smart contracts. It has 3 smart contracts:
   - The **ChainGems** contract, which is a ERC1155 contract, that is used to mint the NFTs and the native token.
   - The **ChainGemsExchange** contract, which is a decentralized exchange that is used to exchange the native token for a stablecoin.
   - The **USDToken** contract, which is a ERC20 contract, that is used as a stablecoin.
2. The frontend project, which is a React application that interacts with smart contracts and is based on the Model View Presenter architecture and Atomic Design methodology.
3. The backend project, which is a NodeJS that upload files to IPFS.  
   <br>

## Principles

The project is based on the following principles:

- **SOLID**
- **Separation of Concerns (SOC)**
- **Don't Repeat Yourself (DRY)**
- **You Aren't Gonna Need It (YAGNI)**
- **Keep It Simple, Silly (KISS)**
  <br>

## Architecture

- **[Model View Presenter](https://khalilstemmler.com/articles/client-side-architecture/layers)** (on the Front)
  <div>
  <img src="https://khalilstemmler.com/img/blog/client-side-architecture/Client-side_architecture_basics_(5).png?raw=true" alt="MVP" title="MVP"/>
  </div>

    <br>

## Methodologies

The items in this section are not strictly related to methodologies, but are concepts that I applied to the project and helped me to maintain an organized, structured and testable code.

- **[Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)**
- **GitFlow**
- **Monorepo**
- **Continous Integration**
- **Conventionnal Commits**
- **Semantic Versioning**
- **Linting and Formatting**
- **Unit Testing**

  <br>

## Technologies

The most relevant technologies used in this project are:

<table>
<tr>
<th> Back </th>
<th> Front </th>
<th> General </th>
</tr>
<tr>
<td>

- **Solidity**
- **Hardhat**
- **OpenZeppelin**
- **Chainlink**
- **Ethers.js**
- **Slither**
- **Chai**

</td>
<td>

- **ReactJS**
- **NextJS**
- **Storybook**
- **Zustand**
- **Jest**
- **React Testing Library**
- **Tailwind CSS**

</td>
<td>

- **Typescript**
- **Lerna**
- **Yarn Workspaces**
- **ESLint**
- **Prettier**
- **Lint Staged**
- **CodeQL (on CI)**
- **Docker**
- **ACT** _(Run GitHub Actions locally)_

</td>
</tr>
</table>

## Run project

To run the project, you need to have [Yarn](https://classic.yarnpkg.com/en/docs/install) installed, [Node](https://nodejs.org/en/download/) and [Metamask](https://metamask.io/download/) . <br>

1. Clone the repository

2. Install dependencies

```bash
yarn install
```

3. Run the blockchain project

Inside the `Blockchain` folder, run:

```
yarn hardhat node
```

4. Run the frontend project

Inside the `Frontend` folder, run:

```bash
yarn dev
```

5. If you want to use Metamask, remember to connect to the local network

## Run Tools

Because of the monorepo structure, some tools need to be run from the root of the project and others in their own packages(Backend/Frontend). <br>
The context for executing each each tool is clarified in parentheses. <br>

- **Slither** _(Blockchain)_ \
  For running these tools, I use a docker image, you can run this command to get the image:

  ```bash
  docker pull trailofbits/eth-security-toolbox
  ```

  \
  Then you need to run the following command:

  ```bash
  yarn toolbox
  ```

  \
  And inside the container, you can run slither as follows:\

  ```bash
  slither /src/Blockchain/contracts/ --solc-remaps '@openzeppelin=/src/node_modules/@openzeppelin @chainlink=/src/node_modules/@chainlink' --exclude naming-convention,external-function,low-level-calls
  ```

- **Mythril** _(Blockchain)_ \
  To run mythril, you can do it with docker. First, you need to get the image:

  ```bash
  docker pull mythril/myth
  ```

  \
  Then you can run it (one contract at a time) as follows:

  ```bash
  docker run -v ${PWD%/*}:/src mythril/myth analyze --solc-json /src/Blockchain/mythril-config.json /src/Blockchain/contracts/{contract_name}.sol
  ```

- **Storybook** _(Frontend)_ \
  To run storybook, you need to run the following command:
  ```bash
  yarn storybook
  ```
