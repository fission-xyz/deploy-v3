/**
 * @name UniV3DeploymentConfig
 * @description
 * This type represents the configuration parameters for the whole Uniswap V3 deployment.
 * It consists of the the properties that are required to deploy following contracts:
 * - v3-core
 * - v3-periphery
 * - universal-router
 *
 * @property {string} factoryOwner - The address of the owner of the Uniswap V3 factory
 * This address will be allowed to call following functions on the Uniswap V3 factory:
 * - setOwner
 * - enableFeeAmount
 * - createPool
 *
 * @property {string} weth9Address - The address of the WETH9 contract on the network
 * @property {string} nativeCurrencySymbol - The symbol of the native currency on the network
 * @property {string} descriptorProxyAdminOwner - The address of the owner of the descriptor proxy admin
 */
export type UniV3DeploymentConfig = {
  factoryOwner: string;
  weth9Address: string;
  nativeCurrencySymbol: string;
  descriptorProxyAdminOwner: string;
};

export type CommonParams = {
  network: string;
  envs: Record<string, string>;
};

export type V3CoreDeploymentParams = CommonParams;

export type V3PeripheryDeploymentParams = CommonParams;

export type UniversalRouterDeploymentParams = CommonParams;

export type V3CoreDeploymentResult = {
  factoryAddress: string;
};

export type V3PeripheryDeploymentResult = {
  uniswapMulticall: string;
  proxyAdmin: string;
  tickLens: string;
  nftDescriptor: string;
  nonfungibleTokenPositionDescriptor: string;
  descriptorProxyAddress: string;
  nonFungibleTokenPositionManager: string;
  v3Migrator: string;
  quoterV2: string;
};

export type UniversalRouterDeploymentResult = {
  universalRouterAddress: string;
};
