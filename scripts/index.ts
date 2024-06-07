import { deployUniversalRouter, deployV3Core, deployV3Periphery } from "./deployment";

async function main() {
  const v3CoreDeploymentResult = await deployV3Core();
  await deployV3Periphery(v3CoreDeploymentResult.factoryAddress);
  await deployUniversalRouter(v3CoreDeploymentResult.factoryAddress);
}

const assert = (condition: any, ...args: any) => {
  if (!condition) {
    console.error(...args);
    process.exit(1);
  }
};

console.assert = assert;

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
