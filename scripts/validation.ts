import fs from "fs";
import path from "path";
import { ethers } from "ethers";

import {
  CACHE_FOLDER_NAME,
  EXPECTED_UNIVERSAL_ROUTER_PATH,
  EXPECTED_V3_CORE_PATH,
  FACTORY_KEY,
  MIGRATE_STORAGE_FILE,
  UNISWAP_V3_POOL_ARTIFACT_PATH,
} from "./constants";

export async function validatePoolInitCodeHash(): Promise<void> {
  // 1. Get the artifact for the UniswapV3Pool contract
  const uniswapV3PoolArtifact = require(path.resolve(EXPECTED_V3_CORE_PATH, UNISWAP_V3_POOL_ARTIFACT_PATH));

  // 2. Get the init code hash for the UniswapV3Pool contract
  const initCodeHash = ethers.keccak256(uniswapV3PoolArtifact.bytecode);

  // 3. Check if the UniswapV3Pool contract bytecode embedded into the Uniswap V3 Factory contract
  const migrateStorageData = JSON.parse(
    fs.readFileSync(path.resolve(EXPECTED_V3_CORE_PATH, CACHE_FOLDER_NAME, MIGRATE_STORAGE_FILE)),
  );

  const bytecode = migrateStorageData.transactions[FACTORY_KEY].contractKeyData.data;

  const isEmbedded = bytecode.includes(uniswapV3PoolArtifact.bytecode.slice(2));

  console.assert(isEmbedded, "UniswapV3Pool bytecode not embedded into the Uniswap V3 Factory contract");

  // 4. Compare init code hash with the one stored in default.config.json in Universal Router deployment script
  const config = JSON.parse(
    fs.readFileSync(path.resolve(EXPECTED_UNIVERSAL_ROUTER_PATH, "deploy", "default.config.json"), "utf8"),
  );

  console.assert(
    config.poolInitCodeHash == initCodeHash,
    `UniswapV3Pool init code hash mismatch. New: ${initCodeHash}`,
  );
}
