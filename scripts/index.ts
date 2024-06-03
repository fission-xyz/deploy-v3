import { deployV3Core, deployV3Periphery } from "./deployment";

async function main() {
  const v3CoreDeploymentResult = await deployV3Core();
  await deployV3Periphery(v3CoreDeploymentResult.factoryAddress);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
