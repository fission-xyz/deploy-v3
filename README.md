# Uni V3 -- Universal deployment scripts

This repository contains scripts to deploy Uniswap V3 contracts to different networks.

## Usage 

In order to run deploy Uniswap, first of all you need to install dependencies:

```bash
make
```

`yarn` is used as a package manager for this repository, so if you do not have `yarn` installed, you can install it by running, please refer to the [yarn documentation](https://classic.yarnpkg.com/en/docs/install).

After the installation is complete, you need to set up a configuration file for the network you want to deploy to.

### Config files

The configuration file example can be found in the `configs` directory.

To create a real configuration file, you need to copy the example file and name it as `<network>.config.json`.
Where `<network>` is the name of the network you want to deploy to.

#### Uniswap Contracts Configuration Explanation
- `factoryOwner`: This variable specifies the address of the Uniswap V3 Factory contract, which can be obtained from previous Uniswap V3 core deployment.
- `weth9Address`: This variable specifies the address of the WETH9 contract (Wrapped Ether). Basically this contract, MUST represent the ERC20 wrapped version of the native currency of the network..
- `nativeCurrencySymbol`: This variable specifies the label of the native currency of the network.
- `descriptorProxyAdminOwner`: This variable specifies the address of the owner of the proxy admin of the Non-fungible Token Position Descriptor contract.

## Deployment

After the configuration file is created, you can run the deployment script for the network you want to deploy to, for example:

```bash
yarn hardhat run ./scripts/index.ts
```

Also, you could set up contract verification on Etherscan by adding the `VERIFY=true` env to the command:

```bash
VERIFY=true yarn hardhat run ./scripts/index.ts --network sepolia
```

## Graph Deployment 

To deploy the Uni V3 subgraph, please refer to the [Uni V3 subgraph deployment scripts](https://github.com/micro-capital/v3-subgraph?tab=readme-ov-file#uniswap-v3-subgraph)
