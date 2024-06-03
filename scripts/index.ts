import { deployV3Core } from "./deployment";

async function main() {
  await deployV3Core();
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
