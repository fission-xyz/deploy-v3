import fs from "fs";

import { V3PeripheryDeploymentResult } from "@types";

import {
  DESCRIPTOR_PROXY_ADMIN_KEY,
  DESCRIPTOR_PROXY_KEY,
  EXPECTED_UNIVERSAL_ROUTER_PATH,
  EXPECTED_V3_CORE_PATH,
  EXPECTED_V3_PERIPHERY_PATH,
  FACTORY_KEY,
  NFT_DESCRIPTOR_KEY,
  NFT_POSITION_DESCRIPTOR_KEY,
  NFT_POSITION_MANAGER_KEY,
  QUOTER_V2_KEY,
  TICK_LENS_KEY,
  UNI_V3_MULTICALL_KEY,
  UNIVERSAL_ROUTER_KEY,
  V3_MIGRATOR_KEY,
} from "./constants";

export function getUniV3FactoryAddress(): string {
  const migrateStorageData = JSON.parse(fs.readFileSync(`${EXPECTED_V3_CORE_PATH}/cache/.migrate.storage.json`));

  const contractAddress = migrateStorageData.transactions[FACTORY_KEY].contractAddress;

  console.assert(contractAddress, "UniswapV3Factory contract address not found in the Hardhat Migrate storage file.");

  return contractAddress;
}

export function getUniV3PeripheryAddresses(): V3PeripheryDeploymentResult {
  const migrateStorageData = JSON.parse(fs.readFileSync(`${EXPECTED_V3_PERIPHERY_PATH}/cache/.migrate.storage.json`));

  const uniswapMulticall = migrateStorageData.transactions[UNI_V3_MULTICALL_KEY].contractAddress;
  const descriptorProxyAdmin = migrateStorageData.transactions[DESCRIPTOR_PROXY_ADMIN_KEY].contractAddress;
  const tickLens = migrateStorageData.transactions[TICK_LENS_KEY].contractAddress;
  const nftDescriptor = migrateStorageData.transactions[NFT_DESCRIPTOR_KEY].contractAddress;
  const nftPositionDescriptor = migrateStorageData.transactions[NFT_POSITION_DESCRIPTOR_KEY].contractAddress;
  const descriptorProxy = migrateStorageData.transactions[DESCRIPTOR_PROXY_KEY].contractAddress;
  const nftPositionManager = migrateStorageData.transactions[NFT_POSITION_MANAGER_KEY].contractAddress;
  const v3Migrator = migrateStorageData.transactions[V3_MIGRATOR_KEY].contractAddress;
  const quoterV2 = migrateStorageData.transactions[QUOTER_V2_KEY].contractAddress;

  console.assert(
    uniswapMulticall,
    "UniswapInterfaceMulticall contract address not found in the Hardhat Migrate storage file.",
  );
  console.assert(descriptorProxyAdmin, "ProxyAdmin contract address not found in the Hardhat Migrate storage file.");
  console.assert(tickLens, "TickLens contract address not found in the Hardhat Migrate storage file.");
  console.assert(nftDescriptor, "NFTDescriptor contract address not found in the Hardhat Migrate storage file.");
  console.assert(
    nftPositionDescriptor,
    "NonfungibleTokenPositionDescriptor contract address not found in the Hardhat Migrate storage file.",
  );
  console.assert(
    descriptorProxy,
    "TransparentUpgradeableProxy contract address not found in the Hardhat Migrate storage file.",
  );
  console.assert(
    nftPositionManager,
    "NonfungiblePositionManager contract address not found in the Hardhat Migrate storage file.",
  );
  console.assert(v3Migrator, "V3Migrator contract address not found in the Hardhat Migrate storage file.");
  console.assert(quoterV2, "QuoterV2 contract address not found in the Hardhat Migrate storage file.");

  return {
    uniswapMulticall: uniswapMulticall,
    proxyAdmin: descriptorProxyAdmin,
    tickLens,
    nftDescriptor,
    nonfungibleTokenPositionDescriptor: nftPositionDescriptor,
    descriptorProxyAddress: descriptorProxy,
    nonFungibleTokenPositionManager: nftPositionManager,
    v3Migrator,
    quoterV2,
  };
}

export function getUniversalRouterAddress(): string {
  const migrateStorageData = JSON.parse(
    fs.readFileSync(`${EXPECTED_UNIVERSAL_ROUTER_PATH}/cache/.migrate.storage.json`),
  );

  const contractAddress = migrateStorageData.transactions[UNIVERSAL_ROUTER_KEY].contractAddress;

  console.assert(contractAddress, "UniversalRouter contract address not found in the Hardhat Migrate storage file.");

  return contractAddress;
}
