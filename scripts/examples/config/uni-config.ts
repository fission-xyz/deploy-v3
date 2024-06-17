import { Token } from "@uniswap/sdk-core";
import { FeeAmount } from "@uniswap/v3-sdk";

const tokenA = "0x2e2e24daeeBA50075bc27701E623e5bbc6cE79E9";
const tokenB = "0x7A217b0a0BcdC0d6b7ABB092d22A0a02F845Aa21";

export const initPoolCodeHash = "0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54";

export const MIN_SQRT_RATIO = 4295128739n;
export const MAX_SQRT_RATIO = 1461446703485210103287273052203988822378723970342n;

export interface ExampleConfig {
  factoryAddress: string;
  managerAddress: string;
  universalRouterAddress: string;
  permit2: string;
  tokens: {
    token0: Token;
    token0Amount: number;
    token1: Token;
    token1Amount: number;
    poolFee: FeeAmount;
  };
}
export const TokenChainId = 80002;

export const TokenA = new Token(TokenChainId, tokenA, 18, "Token1", "Token1");

export const TokenB = new Token(TokenChainId, tokenB, 18, "Token2", "Token2");

export const CurrentConfig: ExampleConfig = {
  factoryAddress: "0x7386bC7020013EC9D67c09Bb55c6a6a2fF7f2ea4",
  managerAddress: "0x4F9Fd9652FfA0B2Ff1D2413dA7Cd0403AC626aED",
  universalRouterAddress: "0x238da5Fb56c2148b3D622243d06b9a6d6858aB4a",
  permit2: "0x000000000022D473030F116dDEE9F6B43aC78BA3",
  tokens: {
    token0: TokenA,
    token0Amount: 1000,
    token1: TokenB,
    token1Amount: 1000,
    poolFee: FeeAmount.LOWEST,
  },
};

export const getMinTick = (tickSpacing: number) => Math.ceil(-887272 / tickSpacing) * tickSpacing;
export const getMaxTick = (tickSpacing: number) => Math.floor(887272 / tickSpacing) * tickSpacing;
