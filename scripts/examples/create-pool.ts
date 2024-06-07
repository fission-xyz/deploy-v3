import { ethers } from "hardhat";

import { Token } from "@uniswap/sdk-core";
import { computePoolAddress } from "@uniswap/v3-sdk";

import { CurrentConfig, initPoolCodeHash } from "./config/uni-config";

import { UniswapV3Factory__factory, UniswapV3Pool__factory } from "./bindings";
import { encodePriceSqrt } from "./conversion";

async function createPool(tokenA: Token, tokenB: Token) {
  const signer = await ethers.provider.getSigner();

  const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA];

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

  const pool = UniswapV3Pool__factory.connect(currentPoolAddress, signer as any);

  await pool.initialize(encodePriceSqrt(1, 1));
}

createPool(CurrentConfig.tokens.token0, CurrentConfig.tokens.token1)
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
