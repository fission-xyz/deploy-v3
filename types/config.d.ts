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
 * - createPool (TODO)
 */
export type UniV3DeploymentConfig = {
  factoryOwner: string;
};

export type CommonParams = {
  network: string;
  envs: Record<string, string>;
};

export type V3CoreDeploymentParams = CommonParams;

export type V3CoreDeploymentResult = {
  factoryAddress: string;
};
