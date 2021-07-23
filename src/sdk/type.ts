import { BN, web3 } from '@project-serum/anchor';
import { MintInfo } from '@solana/spl-token';

export type DebtTypeAccount = {
  // Address of this account
  publicKey: web3.PublicKey;
  debtToken: web3.PublicKey;
  debtOriginator: web3.PublicKey;
  owner: web3.PublicKey;
  nonce: number;
};

export type VaultTypeAccount = {
  // Address of this account
  publicKey: web3.PublicKey;
  // belongs to this debt type.
  debtType: web3.PublicKey;
  // type of spl-token to accept as collateral.
  collateralToken: web3.PublicKey;
  // token account to hold the collaterals. A program account owns this token account.
  collateralTokenHolder: web3.PublicKey;
  // price oracle account to read
  priceOracle: web3.PublicKey;
  // signer nonce.
  nonce: number;
  // limit the max amount of debt a user can generate with borrow.
  minimumCollateralRatio: BN;
  // controls when the liquidator can liquidate this vault
  liquidationCollateralRatio: BN;
  // reward for liquidator
  liquidationPenalty: BN;
  // interest rate per slot per debt token, eg: 0.0001 debt_token/(slot*debt_token)
  interestRate: BN;
  // interest rate accumulation, interest_accum += interest_rate * slot_elapsed
  interestAccum: BN;
  // last updated at slot
  interestAccumUpdated: BN;
  //
  accruedInterests: BN;
  // maximum debt for this vault
  debtCeiling: BN;
  // total debt minted from this vault
  totalDebt: BN;
};

export type VaultAccount = {
  // Address of this account
  publicKey: web3.PublicKey;
  vaultType: web3.PublicKey;
  owner: web3.PublicKey;
  debtAmount: BN;
  collateralAmount: BN;
  interestAccum: BN;
};

export type MintInfoAccount = MintInfo & {
  // Address of this account
  publicKey: web3.PublicKey;
  name: string;
  symbol: string;
  logoURI: string;
};

export interface MintProps {
  debtType: web3.PublicKey;
  vaultType: web3.PublicKey;
  vault?: web3.PublicKey;
  debtAmount: string;
  collateralAmount: string;
  debtToken: web3.PublicKey;
  collateralToken: web3.PublicKey;
  collateralTokenAccount?: web3.PublicKey;
}

export interface RepayProps {
  debtType: web3.PublicKey;
  vaultType: web3.PublicKey;
  vault: web3.PublicKey;
  repayAmount: string;
  collateralAmount: string;
  debtToken: web3.PublicKey;
  collateralToken: web3.PublicKey;
  debtTokenAccount?: web3.PublicKey;
}

export interface LiquidateProps {
  vault: web3.PublicKey;
  debtFrom: web3.PublicKey;
  debtFromAuthority: web3.PublicKey;
  liquidateAmount: string;
}
