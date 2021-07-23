import { Idl, web3 } from '@project-serum/anchor';
import * as fs from 'fs';
import * as path from 'path';

export interface DebtTypeConfig {
  symbol: string;
  debtOriginatorAuthority: string;
  debtTokenAddress: string;
  debtTypeAddress: string;
  debtOriginator: string;
  interestsHolder: string;
  initialMint: string;
}

export interface VaultTypeConfig {
  name: string;
  address: string;
  debtTypeAddress: string;
  debtTokenId: string;
  debtTokenAddress: string;
  debtOriginator: string;
  debtOriginatorAuthority: string;
  interestsHolder: string;
  collateralTokenId: string;
  collateralTokenAddress: string;
  collateralTokenHolder: string;
  collateralTokenHolderAuthority: string;
  priceOracle: string;
  params: {
    minimumCollateralRatio: string;
    liquidationCollateralRatio: string;
    liquidationPenalty: string;
    interestRate: string;
    debtCeiling: string;
    maxDebtLimit: string;
    maxDeposit: string;
    oracle: string;
  };
}

export interface TokenConfig {
  id: string;
  symbol: string;
  displaySymbol?: string;
  name: string;
  address: string;
  decimals: number;
  displayDecimals: number;
  icon: string;
}

export interface ParrotConfig {
  deployer: string;
  debtTypes: DebtTypeConfig[];
  vaultTypes: VaultTypeConfig[];
  tokens: TokenConfig[];
  channel: string;
  programId: string;
  programIdl: Idl;
}

export const getParrotConfigPath = (): string => {
  const CHANNEL = process.env.CHANNEL ?? process.env.NEXT_PUBLIC_CHANNEL;
  if (!CHANNEL) {
    throw new Error(`Environment variable "CHANNEL" is required.`);
  }
  const configFilePath = path.resolve(__dirname, `config.${CHANNEL}.json`);
  if (!fs.existsSync(configFilePath)) {
    throw new Error(`Cannot found config file: ${configFilePath}`);
  }
  return configFilePath;
};

export const getParrotConfig = (): ParrotConfig => {
  const configFilePath = getParrotConfigPath();
  const programConfig = JSON.parse(fs.readFileSync(configFilePath).toString());
  return programConfig as ParrotConfig;
};

export const getDebtTypeConfig = (
  debtType: web3.PublicKey,
  overrideConfig?: ParrotConfig
) => {
  const parrotConfig = overrideConfig ?? getParrotConfig();
  const debtTypeConfig = parrotConfig.debtTypes.find(
    i => i.debtTypeAddress === debtType.toBase58()
  );

  if (!debtTypeConfig) {
    throw new Error(
      `Could not find debt type for vault type ${debtType.toBase58()}`
    );
  }

  return {
    ...debtType,
    debtOriginatorAuthority: new web3.PublicKey(
      debtTypeConfig.debtOriginatorAuthority
    ),
    debtTokenAddress: new web3.PublicKey(debtTypeConfig.debtTokenAddress),
    debtTypeAddress: new web3.PublicKey(debtTypeConfig.debtTypeAddress),
    debtOriginator: new web3.PublicKey(debtTypeConfig.debtOriginator),
    interestsHolder: new web3.PublicKey(debtTypeConfig.interestsHolder)
  };
};

export const getVaultTypeConfig = (
  vaultType: web3.PublicKey,
  overrideConfig?: ParrotConfig
) => {
  const parrotConfig = overrideConfig ?? getParrotConfig();
  const vaultTypeConfig = parrotConfig.vaultTypes.find(
    i => i.address === vaultType.toBase58()
  );
  if (!vaultTypeConfig) {
    throw new Error(`Could not find vault type: ${vaultType.toBase58()}`);
  }
  return {
    ...vaultTypeConfig,
    address: new web3.PublicKey(vaultTypeConfig.address),
    debtTypeAddress: new web3.PublicKey(vaultTypeConfig.debtTypeAddress),
    debtTokenAddress: new web3.PublicKey(vaultTypeConfig.debtTokenAddress),
    debtOriginator: new web3.PublicKey(vaultTypeConfig.debtOriginator),
    debtOriginatorAuthority: new web3.PublicKey(
      vaultTypeConfig.debtOriginatorAuthority
    ),
    interestsHolder: new web3.PublicKey(vaultTypeConfig.interestsHolder),
    collateralTokenAddress: new web3.PublicKey(
      vaultTypeConfig.collateralTokenAddress
    ),
    collateralTokenHolder: new web3.PublicKey(
      vaultTypeConfig.collateralTokenHolder
    ),
    collateralTokenHolderAuthority: new web3.PublicKey(
      vaultTypeConfig.collateralTokenHolderAuthority
    ),
    priceOracle: new web3.PublicKey(vaultTypeConfig.priceOracle)
  };
};
