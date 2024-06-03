import fs from "fs";
import hre, { ethers } from "hardhat";

import { UniV3DeploymentConfig, V3CoreDeploymentParams } from "@types";

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

export function parseConfig(): UniV3DeploymentConfig {
  const expectedConfigName: string = `configs/${hre.network.name}.config.json`;

  if (!fs.existsSync(expectedConfigName)) {
    throw new Error(`Expected config file ${expectedConfigName} not found`);
  }

  const config: UniV3DeploymentConfig = JSON.parse(fs.readFileSync(expectedConfigName, "utf8"));

  return validateConfig(config);
}

function validateConfig(config: UniV3DeploymentConfig): UniV3DeploymentConfig {
  if (!config.factoryOwner || !ethers.isAddress(config.factoryOwner) || config.factoryOwner == ethers.ZeroAddress) {
    throw new Error(`Invalid factoryOwner address: ${config.factoryOwner}`);
  }

  return config;
}
