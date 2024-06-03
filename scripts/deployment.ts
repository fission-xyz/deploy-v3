import fs from "fs";

import { V3CoreDeploymentResult } from "@types";

import { runMigration } from "./shell-helper";
import { getV3CoreDeploymentParams } from "./config-parser";

const EXPECTED_REPOSITORY_PATH = "lib/v3-core";

export async function deployV3Core(): Promise<V3CoreDeploymentResult> {
  console.assert(
    fs.existsSync(EXPECTED_REPOSITORY_PATH),
    `Expected repository path ${EXPECTED_REPOSITORY_PATH} not found`,
  );

  const params = getV3CoreDeploymentParams();

  await runMigration({
    cwd: EXPECTED_REPOSITORY_PATH,
    envs: params.envs,
    network: params.network,
  });

  const migrateStorageData = JSON.parse(fs.readFileSync(`${EXPECTED_REPOSITORY_PATH}/cache/.migrate.storage.json`));

  return {
    factoryAddress: migrateStorageData.transactions["contracts/UniswapV3Factory.sol:UniswapV3Factory"].contractAddress,
  };
}
