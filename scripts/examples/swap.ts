import { ethers } from "hardhat";

import JSBI from "jsbi";

import { CurrencyAmount, Percent, Token, TradeType } from "@uniswap/sdk-core";

import { Trade as V2Trade } from "@uniswap/v2-sdk";

import { SwapRouter } from "@uniswap/universal-router-sdk";

import { MixedRouteTrade, Trade as RouterTrade } from "@uniswap/router-sdk";
import {
  nearestUsableTick,
  Pool,
  Trade as V3Trade,
  Route as RouteV3,
  TickMath,
  computePoolAddress,
  TICK_SPACINGS,
  FeeAmount,
} from "@uniswap/v3-sdk";

import { CurrentConfig, initPoolCodeHash } from "./config/uni-config";

import { getTokenTransferApproval, permitToken } from "./utils";
import { UniswapV3Pool__factory, UniversalRouter__factory } from "./bindings";

async function getPool(tokenA: Token, tokenB: Token, feeAmount: FeeAmount) {
  const signer = await ethers.provider.getSigner();

  const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA];

  const currentPoolAddress = computePoolAddress({
    factoryAddress: CurrentConfig.factoryAddress,
    tokenA: CurrentConfig.tokens.token0,
    tokenB: CurrentConfig.tokens.token1,
    fee: CurrentConfig.tokens.poolFee,
    initCodeHashManualOverride: initPoolCodeHash,
  });

  const poolContract = UniswapV3Pool__factory.connect(currentPoolAddress, signer as any);

  let liquidity = await poolContract.liquidity();

  let { sqrtPriceX96, tick } = await poolContract.slot0();

  const liquidityJSBI = JSBI.BigInt(liquidity.toString());
  const sqrtPriceX96JSBI = JSBI.BigInt(sqrtPriceX96.toString());

  return new Pool(token0, token1, feeAmount, sqrtPriceX96JSBI, liquidityJSBI, Number(tick), [
    {
      index: nearestUsableTick(TickMath.MIN_TICK, TICK_SPACINGS[feeAmount]),
      liquidityNet: liquidityJSBI,
      liquidityGross: liquidityJSBI,
    },
    {
      index: nearestUsableTick(TickMath.MAX_TICK, TICK_SPACINGS[feeAmount]),
      liquidityNet: JSBI.multiply(liquidityJSBI, JSBI.BigInt("-1")),
      liquidityGross: liquidityJSBI,
    },
  ]);
}

function buildTrade(trades: any) {
  return new RouterTrade({
    v2Routes: trades
      .filter((trade: any) => trade instanceof V2Trade)
      .map((trade: any) => ({
        routev2: trade.route,
        inputAmount: trade.inputAmount,
        outputAmount: trade.outputAmount,
      })),
    v3Routes: trades
      .filter((trade: any) => trade instanceof V3Trade)
      .map((trade: any) => ({
        routev3: trade.route,
        inputAmount: trade.inputAmount,
        outputAmount: trade.outputAmount,
      })),
    mixedRoutes: trades
      .filter((trade: any) => trade instanceof MixedRouteTrade)
      .map((trade: any) => ({
        mixedRoute: trade.route,
        inputAmount: trade.inputAmount,
        outputAmount: trade.outputAmount,
      })),
    tradeType: trades[0].tradeType,
  });
}

function swapOptions(recipient: string, options: any) {
  return Object.assign(
    {
      slippageTolerance: new Percent(30, 100),
      recipient: recipient,
    },
    options,
  );
}

export async function swap(): Promise<void> {
  const signer = await ethers.provider.getSigner();

  console.info(`Approving tokens to Universal Router: ${CurrentConfig.universalRouterAddress} via Permit2`);

  await permitToken(CurrentConfig.tokens.token0, CurrentConfig.universalRouterAddress);
  await permitToken(CurrentConfig.tokens.token1, CurrentConfig.universalRouterAddress);

  console.info(`Approving tokens to Permit2: ${CurrentConfig.universalRouterAddress}`);

  const approvePermit1 = await getTokenTransferApproval(CurrentConfig.permit2, CurrentConfig.tokens.token0);
  const approvePermit2 = await getTokenTransferApproval(CurrentConfig.permit2, CurrentConfig.tokens.token1);

  console.assert(approvePermit1, "approvePermit1 failed");
  console.assert(approvePermit2, "approvePermit2 failed");

  console.info(`Successfully approved tokens!`);

  const pool = await getPool(CurrentConfig.tokens.token0, CurrentConfig.tokens.token1, CurrentConfig.tokens.poolFee);

  const inputToken = ethers.parseEther("3");

  const trade = await V3Trade.fromRoute(
    new RouteV3([pool], CurrentConfig.tokens.token0, CurrentConfig.tokens.token1),
    CurrencyAmount.fromRawAmount(CurrentConfig.tokens.token0, inputToken.toString()),
    TradeType.EXACT_INPUT,
  );

  console.info(
    `Trading ${ethers.formatEther(inputToken).toString()} ${CurrentConfig.tokens.token0.symbol} for ${trade.outputAmount.toExact()} ${CurrentConfig.tokens.token1.symbol}`,
  );

  const routerTrade = buildTrade([trade]);

  const opts = swapOptions(await signer.getAddress(), {});

  const params = SwapRouter.swapERC20CallParameters(routerTrade, opts);

  const router = UniversalRouter__factory.connect(CurrentConfig.universalRouterAddress, signer as any);

  console.info(`Swapping tokens via Universal Router: ${CurrentConfig.universalRouterAddress}`);

  const receipt = await (
    await signer.sendTransaction({
      to: await router.getAddress(),
      data: params.calldata,
      value: params.value,
    })
  ).wait();

  console.info(`Successfully swapped tokens! Transaction hash: ${receipt!.hash}`);
}

swap()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
