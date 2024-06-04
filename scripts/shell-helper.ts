import fs from "fs";
import { spawnSync } from "child_process";

import { MigrationOptions } from "@types";

import { CACHE_FOLDER } from "./constants";

export async function runMigration(options: MigrationOptions): Promise<void> {
  const expectedCachePath: string = `${options.cwd}/${CACHE_FOLDER}`;

  if (!fs.existsSync(expectedCachePath)) {
    fs.mkdirSync(expectedCachePath, { recursive: true });
  }

  const command = "yarn";
  const args = ["--cwd", options.cwd, "hardhat", "migrate", "--network", options.network];

  if (options.verify) {
    args.push("--verify");
  }

  createEnv(options.cwd, options.envs);

  spawnSync(command, args, { stdio: "inherit", env: process.env });
}

function createEnv(workdir: string, envs: Record<string, string>): void {
  let content: string = "";

  for (const [key, value] of Object.entries(envs)) {
    content += `${key}=${value}\n`;
  }

  fs.writeFileSync(`${workdir}/.env`, content, { encoding: "utf-8" });
}
