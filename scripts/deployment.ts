import fs from "fs";

import { UniversalRouterDeploymentResult, V3CoreDeploymentResult, V3PeripheryDeploymentResult } from "@types";

import { EXPECTED_UNIVERSAL_ROUTER_PATH, EXPECTED_V3_CORE_PATH, EXPECTED_V3_PERIPHERY_PATH } from "./constants";

import { runMigration } from "./shell-helper";
import { validatePoolInitCodeHash } from "./validation";
import { getUniV3FactoryAddress, getUniV3PeripheryAddresses, getUniversalRouterAddress } from "./migration-parser";
import {
  getUniversalRouterDeploymentParams,
  getV3CoreDeploymentParams,
  getV3PeripheryDeploymentParams,
} from "./config-parser";

export async function deployV3Core(): Promise<V3CoreDeploymentResult> {
  console.assert(fs.existsSync(EXPECTED_V3_CORE_PATH), `Expected repository path ${EXPECTED_V3_CORE_PATH} not found`);

  const params = getV3CoreDeploymentParams();

  await runMigration({
    cwd: EXPECTED_V3_CORE_PATH,
    envs: params.envs,
    network: params.network,
  });

  return {
    factoryAddress: getUniV3FactoryAddress(),
  };
}

export async function deployV3Periphery(factoryAddress?: string): Promise<V3PeripheryDeploymentResult> {
  const params = getV3PeripheryDeploymentParams(factoryAddress ? factoryAddress : getUniV3FactoryAddress());

  await runMigration({
    cwd: EXPECTED_V3_PERIPHERY_PATH,
    envs: params.envs,
    network: params.network,
  });

  return getUniV3PeripheryAddresses();
}

export async function deployUniversalRouter(factoryAddress?: string): Promise<UniversalRouterDeploymentResult> {
  const params = getUniversalRouterDeploymentParams(factoryAddress ? factoryAddress : getUniV3FactoryAddress());

  await validatePoolInitCodeHash();

  await runMigration({
    cwd: EXPECTED_UNIVERSAL_ROUTER_PATH,
    envs: params.envs,
    network: params.network,
  });

  return {
    universalRouterAddress: getUniversalRouterAddress(),
  };
}
