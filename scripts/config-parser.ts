import fs from "fs";
import path from "path";
import hre, { ethers } from "hardhat";

import {
  UniV3DeploymentConfig,
  UniversalRouterDeploymentParams,
  V3CoreDeploymentParams,
  V3PeripheryDeploymentParams,
} from "@types";

export function getV3CoreDeploymentParams(): V3CoreDeploymentParams {
  const config: UniV3DeploymentConfig = parseConfig();

  const envs: Record<string, string> = {
    FACTORY_OWNER: config.factoryOwner,
  };

  return {
    envs,
    network: hre.network.name,
  };
}

export function getV3PeripheryDeploymentParams(factoryAddress: string): V3PeripheryDeploymentParams {
  const config: UniV3DeploymentConfig = parseConfig();

  const envs: Record<string, string> = {
    V3_FACTORY_ADDRESS: factoryAddress,
    WETH9_ADDRESS: config.weth9Address,
    NATIVE_CURRENCY_LABEL: config.nativeCurrencySymbol,
    FINAL_PROXY_ADMIN_OWNER: config.descriptorProxyAdminOwner,
  };

  return {
    network: hre.network.name,
    envs,
  };
}

export function getUniversalRouterDeploymentParams(factoryAddress: string): UniversalRouterDeploymentParams {
  const config: UniV3DeploymentConfig = parseConfig();

  const envs: Record<string, string> = {
    V3_FACTORY_ADDRESS: factoryAddress,
    WETH9_ADDRESS: config.weth9Address,
  };

  return {
    network: hre.network.name,
    envs,
  };
}

export function parseConfig(): UniV3DeploymentConfig {
  const expectedConfigName: string = path.resolve("configs", `${hre.network.name}.config.json`);

  if (!fs.existsSync(expectedConfigName)) {
    throw new Error(`Expected config file ${expectedConfigName} not found`);
  }

  const config: UniV3DeploymentConfig = JSON.parse(fs.readFileSync(expectedConfigName, "utf8"));

  return validateConfig(config);
}

function validateConfig(config: UniV3DeploymentConfig): UniV3DeploymentConfig {
  console.assert(isAddressValid(config.factoryOwner), `Invalid factoryOwner address: ${config.factoryOwner}`);
  console.assert(isAddressValid(config.weth9Address), `Invalid weth9Address address: ${config.weth9Address}`);
  console.assert(
    isAddressValid(config.descriptorProxyAdminOwner),
    `Invalid descriptorProxyAdminOwner address: ${config.descriptorProxyAdminOwner}`,
  );
  console.assert(
    config.nativeCurrencySymbol.length > 0,
    `Invalid nativeCurrencySymbol: ${config.nativeCurrencySymbol}`,
  );

  return config;
}

function isAddressValid(address: string | undefined): boolean {
  return !(!address || !ethers.isAddress(address) || address == ethers.ZeroAddress);
}
