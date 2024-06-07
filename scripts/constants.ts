import path from "path";

export const EXPECTED_V3_CORE_PATH = path.resolve("lib", "v3-core");
export const EXPECTED_V3_PERIPHERY_PATH = path.resolve("lib", "v3-periphery");
export const EXPECTED_UNIVERSAL_ROUTER_PATH = path.resolve("lib", "universal-router");

// Uniswap V3 Core
export const FACTORY_KEY = `${path.normalize("contracts/UniswapV3Factory.sol")}:UniswapV3Factory`;
export const UNISWAP_V3_POOL_ARTIFACT_PATH = path.normalize("artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json");

// Uniswap V3 Periphery
export const UNI_V3_MULTICALL_KEY = `${path.normalize("contracts/lens/UniswapInterfaceMulticall.sol")}:UniswapInterfaceMulticall`;
export const DESCRIPTOR_PROXY_ADMIN_KEY = `${path.normalize("@openzeppelin/contracts/proxy/ProxyAdmin.sol")}:ProxyAdmin`;
export const TICK_LENS_KEY = `${path.normalize("contracts/lens/TickLens.sol")}:TickLens`;
export const NFT_DESCRIPTOR_KEY = `${path.normalize("contracts/libraries/NFTDescriptor.sol")}:NFTDescriptor`;
export const NFT_POSITION_DESCRIPTOR_KEY = `${path.normalize("contracts/NonfungibleTokenPositionDescriptor.sol")}:NonfungibleTokenPositionDescriptor`;
export const DESCRIPTOR_PROXY_KEY = `${path.normalize("@openzeppelin/contracts/proxy/TransparentUpgradeableProxy.sol")}:TransparentUpgradeableProxy`;
export const NFT_POSITION_MANAGER_KEY = `${path.normalize("contracts/NonfungiblePositionManager.sol")}:NonfungiblePositionManager`;
export const V3_MIGRATOR_KEY = `${path.normalize("contracts/V3Migrator.sol")}:V3Migrator`;
export const QUOTER_V2_KEY = `${path.normalize("contracts/lens/QuoterV2.sol")}:QuoterV2`;

// Universal Router
export const UNIVERSAL_ROUTER_KEY = `${path.normalize("contracts/UniversalRouter.sol")}:UniversalRouter`;

// Migrator Specific
export const CACHE_FOLDER_NAME = "cache";
export const MIGRATE_STORAGE_FILE = ".migrate.storage.json";
