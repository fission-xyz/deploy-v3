import { BigNumberish } from "ethers";
import bn from "bignumber.js";

export function fromReadableAmount(amount: number, decimals: number): bigint {
  const extraDigits = Math.pow(10, countDecimals(amount));
  const adjustedAmount = amount * extraDigits;
  return (BigInt(Math.round(adjustedAmount)) * BigInt(10) ** BigInt(decimals)) / BigInt(extraDigits);
}

export function toReadableAmount(rawAmount: bigint, decimals: number): string {
  return (rawAmount / BigInt(10) ** BigInt(decimals)).toString();
}

function countDecimals(x: number) {
  if (Math.floor(x) === x) {
    return 0;
  }
  return x.toString().split(".")[1].length || 0;
}

export function encodePriceSqrt(reserve1: BigNumberish, reserve0: BigNumberish): string {
  return new bn(reserve1.toString())
    .div(reserve0.toString())
    .sqrt()
    .multipliedBy(new bn(2).pow(96))
    .integerValue(3)
    .toFixed();
}
