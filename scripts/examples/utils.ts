import { ethers } from "hardhat";

import { ContractTransactionReceipt } from "ethers";

import { Token } from "@uniswap/sdk-core";

import { ERC20__factory, Permit2__factory } from "./bindings";

import { CurrentConfig } from "./config/uni-config";

export async function getTokenTransferApproval(
  spender: string,
  token: Token,
): Promise<ContractTransactionReceipt | null> {
  const signer = await ethers.provider.getSigner();

  try {
    const tokenContract = ERC20__factory.connect(token.address, signer);

    return await (await tokenContract.approve(spender, 2n ** 160n)).wait();
  } catch (e) {
    console.error(e);
    return null;
  }
}

export const getTimestamp = (): number => Math.floor(Date.now() / 1000);

export async function permitToken(token: Token, spender: string): Promise<ContractTransactionReceipt | null> {
  const signer = await ethers.provider.getSigner();

  try {
    const tokenContract = Permit2__factory.connect(CurrentConfig.permit2, signer);

    return await (
      await tokenContract.approve(token.address, spender, (2n ** 100n).toString(), getTimestamp() + 800)
    ).wait();
  } catch (e) {
    console.error(e);
    return null;
  }
}
