import { ethers } from "hardhat";

import { Token } from "@uniswap/sdk-core";
import { computePoolAddress } from "@uniswap/v3-sdk";

import { CurrentConfig, initPoolCodeHash } from "./config/uni-config";

import { encodePriceSqrt } from "./conversion";

import { UniswapV3Factory__factory, UniswapV3Pool__factory } from "./bindings";

async function createPool(tokenA: Token, tokenB: Token) {
  const signer = await ethers.provider.getSigner();

  const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA];

  console.info(`Creating pool for tokens ${token0.address} and ${token1.address}`);

  const currentPoolAddress = computePoolAddress({
    factoryAddress: CurrentConfig.factoryAddress,
    tokenA: token0,
    tokenB: token1,
    fee: CurrentConfig.tokens.poolFee,
    initCodeHashManualOverride: initPoolCodeHash,
  });

  const poolContract = UniswapV3Factory__factory.connect(CurrentConfig.factoryAddress, signer as any);

  const receipt = await (
    await poolContract.createPool(token0.address, token1.address, CurrentConfig.tokens.poolFee)
  ).wait();

  console.assert(
    (receipt?.logs[0] as any).args[4] === currentPoolAddress,
    "Pool address does not match expected address",
  );

  console.info(`Pool created at ${currentPoolAddress}`);

  const pool = UniswapV3Pool__factory.connect(currentPoolAddress, signer as any);

  await pool.initialize(encodePriceSqrt(1000, 1000));

  console.info(`Pool initialized with sqrt price of 1000`);
}

createPool(CurrentConfig.tokens.token0, CurrentConfig.tokens.token1)
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
