import { Token } from "@uniswap/sdk-core";
import { FeeAmount } from "@uniswap/v3-sdk";

const tokenA = "0x09307ff8d7886314Af1BbCb5Db6C450E25b35F6E";
const tokenB = "0x5F2a500030Dd6741b0e7E67f73C306B279c8309B";

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
export const SepoliaChainId = 11155111;

export const TokenA = new Token(SepoliaChainId, tokenA, 18, "Token1", "Token1");

export const TokenB = new Token(SepoliaChainId, tokenB, 18, "Token2", "Token2");

export const CurrentConfig: ExampleConfig = {
  factoryAddress: "0xdEF0B711d89aE4865658a217391D651213c6acFd",
  managerAddress: "0x8974307631098fB33A708A8e1FA471C3201183b7",
  universalRouterAddress: "0x1190815f8bB87F53Afec359D80F4fdC2b518Ec9F",
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
