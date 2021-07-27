import { BN, Idl, Program, Provider, utils, web3 } from '@project-serum/anchor';
import { getMintInfo } from '@project-serum/common';
import { TokenInstructions } from '@project-serum/serum';

import {
  createAssociatedTokenAccountInstrs,
  createInitializeVaultInstrs,
  createTempWSOLAccountInstrs,
  getParrotConfig,
  ParrotConfig
} from '..';
import {
  createBorrowInstrs,
  createLiquidateInstrs,
  createRepayInstrs,
  createStakeInstrs,
  createUnstakeInstrs
} from '../instructions';
import { findAssociatedTokenAccount } from '../utils';
import { confirmTransaction } from '../utils/confirmTransaction';
import { sendTransaction } from '../utils/sendTransaction';
import { WSOL_MINT_ADDRESS } from './constants';
import {
  DebtTypeAccount,
  LiquidateProps,
  MintInfoAccount,
  MintProps,
  RepayProps,
  VaultAccount,
  VaultTypeAccount
} from './type';

export class ParrotProgram {
  program: Program;
  debtTypes: web3.PublicKey[];
  vaultTypes: web3.PublicKey[];
  parrotConfig: ParrotConfig;

  constructor(private provider: Provider, config?: ParrotConfig) {
    this.parrotConfig = config ?? getParrotConfig();

    this.debtTypes = this.parrotConfig.debtTypes
      .filter(vault => vault['disabled'] !== true)
      .map(vault => new web3.PublicKey(vault.debtTypeAddress));

    this.vaultTypes = this.parrotConfig.vaultTypes
      .filter(vault => vault['disabled'] !== true)
      .map(vault => new web3.PublicKey(vault.address));

    this.program = new Program(
      this.parrotConfig.programIdl as Idl,
      new web3.PublicKey(this.parrotConfig.programId),
      provider
    );
  }

  get programId() {
    return this.program.programId;
  }

  async getCurrentSlot(): Promise<number> {
    return await this.provider.connection.getSlot('recent');
  }

  async confirmTransaction(
    transaction: web3.Transaction,
    txId: string
  ): Promise<string> {
    return await confirmTransaction(
      this.provider,
      txId,
      transaction,
      this.program.idl,
      'confirmed',
      this.parrotConfig
    );
  }

  async getTokenInfo(publicKey: web3.PublicKey): Promise<MintInfoAccount> {
    const mintInfo = await getMintInfo(this.provider, publicKey);
    const tokenInfo = this.parrotConfig.tokens.find(
      i => i.address === publicKey.toBase58()
    );
    return {
      ...mintInfo,
      publicKey,
      symbol: tokenInfo?.symbol || '-',
      name: tokenInfo?.name || '-',
      logoURI: '' // TODO: get the logo
    };
  }

  getDebtOriginator(vaultType: web3.PublicKey) {
    const vaultTypeConfig = this.parrotConfig.vaultTypes.find(
      i => i.address === vaultType.toBase58()
    );
    if (!vaultTypeConfig) {
      throw new Error(
        `Could not find debt token authority for vault type ${vaultType}`
      );
    }
    return {
      debtOriginator: new web3.PublicKey(vaultTypeConfig.debtOriginator),
      debtOriginatorAuthority: new web3.PublicKey(
        vaultTypeConfig.debtOriginatorAuthority
      )
    };
  }

  getCollateralTokenHolder(vaultType: web3.PublicKey) {
    const vaultTypeConfig = this.parrotConfig.vaultTypes.find(
      i => i.address === vaultType.toBase58()
    );
    if (!vaultTypeConfig) {
      throw new Error(
        `Could not find collateral token authority for vault type ${vaultType}`
      );
    }
    return {
      collateralTokenHolder: new web3.PublicKey(
        vaultTypeConfig.collateralTokenHolder
      ),
      collateralTokenHolderAuthority: new web3.PublicKey(
        vaultTypeConfig.collateralTokenHolderAuthority
      )
    };
  }

  getOracleAggregator(vaultType: web3.PublicKey): web3.PublicKey {
    const vaultTypeConfig = this.parrotConfig.vaultTypes.find(
      i => i.address === vaultType.toBase58()
    );
    if (!vaultTypeConfig) {
      throw new Error(`Could not find price oracle for ${vaultType}`);
    }
    return new web3.PublicKey(vaultTypeConfig.priceOracle);
  }

  async getDebtType(publicKey: web3.PublicKey): Promise<DebtTypeAccount> {
    const accountData: DebtTypeAccount = await this.program.account.debtType(
      publicKey
    );
    return {
      ...accountData,
      publicKey
    };
  }

  async getVaultType(publicKey: web3.PublicKey): Promise<VaultTypeAccount> {
    const accountData: VaultTypeAccount = await this.program.account.vaultType(
      publicKey
    );
    return {
      ...accountData,
      publicKey
    };
  }

  async getVault(publicKey: web3.PublicKey): Promise<VaultAccount> {
    const accountData: VaultAccount = await this.program.account.vault(
      publicKey
    );
    return {
      ...accountData,
      publicKey
    };
  }

  decodeVaultAccount(publicKey: web3.PublicKey, buffer: Buffer): VaultAccount {
    const accountData = this.program.coder.accounts.decode<VaultAccount>(
      'Vault',
      buffer
    );
    return {
      ...accountData,
      publicKey
    };
  }

  decodeVaultTypeAccount(
    publicKey: web3.PublicKey,
    buffer: Buffer
  ): VaultTypeAccount {
    const accountData = this.program.coder.accounts.decode<VaultTypeAccount>(
      'VaultType',
      buffer
    );
    return {
      ...accountData,
      publicKey
    };
  }

  async getVaultDebtAccum(
    vault: web3.PublicKey,
    vaultType: web3.PublicKey
  ): Promise<BN> {
    let listener: unknown;
    const debtAmount = await new Promise<BN>(resolve => {
      listener = this.program.addEventListener<any>(
        'VaultDebtAccumEvent',
        event => {
          resolve(event.data);
        }
      );
      const transaction = new web3.Transaction();
      transaction.add(
        this.program.instruction.vaultDebtAccum({
          accounts: {
            vaultType,
            vault,
            clock: web3.SYSVAR_CLOCK_PUBKEY
          }
        })
      );
      this.provider.connection.simulateTransaction(transaction);
    });
    await this.program.removeEventListener(listener as number);
    return debtAmount;
  }

  async getVaults(owner: web3.PublicKey): Promise<VaultAccount[]> {
    const vaultsAddress: web3.PublicKey[] = [];
    for await (const vaultType of this.vaultTypes) {
      vaultsAddress.push(
        await this.program.account.vault.associatedAddress(owner, vaultType)
      );
    }

    const vaultsAccounts = await utils.getMultipleAccounts(
      this.provider.connection,
      vaultsAddress
    );

    const userVaults = vaultsAccounts
      .filter(i => !!i)
      .map(account => {
        if (!account) {
          throw new Error('vault empty account');
        }
        return this.decodeVaultAccount(account.publicKey, account.account.data);
      });
    return userVaults;
  }

  async mint({
    vaultType,
    vault,
    debtAmount,
    collateralAmount,
    debtToken,
    collateralToken,
    collateralTokenAccount
  }: MintProps): Promise<{
    txId: string;
    transaction: web3.Transaction;
    vaultAddress: string;
    vaultAccountExist: boolean;
    debtTokenAccountExist: boolean;
  }> {
    const signers: web3.Account[] = [];
    const instructions: web3.TransactionInstruction[] = [];
    const cleanupInstructions: web3.TransactionInstruction[] = [];
    let vaultAccountExist = true;
    let debtTokenAccountExist = true;

    const bnDebtAmount = new BN(debtAmount);
    const bnCollateralAmount = new BN(collateralAmount);

    if (bnCollateralAmount.isZero() && bnDebtAmount.isZero()) {
      throw new Error('Ether a debt or collateral amount is required');
    }

    let collateralTokenAccountPk = collateralTokenAccount;

    // handle SOL token account
    if (collateralToken.equals(WSOL_MINT_ADDRESS)) {
      const {
        instructions: createTempWSOLAccountInstructions,
        cleanupInstructions: createTempWSOLAccountCleanupInstructions,
        signers: createTempWSOLAccountSigners,
        extra: { tokenAccount: wsolTokenAccount }
      } = await createTempWSOLAccountInstrs(
        { provider: this.provider, config: this.parrotConfig },
        {
          lamports: Number.parseInt(collateralAmount)
        }
      );
      collateralTokenAccountPk = wsolTokenAccount.publicKey;
      instructions.push(...createTempWSOLAccountInstructions);
      cleanupInstructions.push(...createTempWSOLAccountCleanupInstructions);
      signers.push(...createTempWSOLAccountSigners);
    }

    if (!collateralTokenAccountPk) {
      throw new Error(
        'Trying to deposit funds but user do not have a collateral token address'
      );
    }

    let debtTokenAccountPk = await findAssociatedTokenAccount(
      this.provider,
      this.provider.wallet.publicKey,
      debtToken
    );
    if (!debtTokenAccountPk) {
      debtTokenAccountExist = false;
      const {
        instructions: createTokenAccountInstructions,
        signers: createTokenAccountSigners,
        extra: { tokenAccount }
      } = await createAssociatedTokenAccountInstrs(
        { provider: this.provider, config: this.parrotConfig },
        {
          tokenMint: debtToken,
          owner: this.provider.wallet.publicKey
        }
      );
      debtTokenAccountPk = tokenAccount;
      instructions.push(...createTokenAccountInstructions);
      signers.push(...createTokenAccountSigners);
    }

    if (!debtTokenAccountPk) {
      throw new Error(
        'Trying to receive funds but user do not have a debt token address'
      );
    }

    let vaultPk: web3.PublicKey;
    if (!vault) {
      vaultAccountExist = false;
      // Create a new vault if I don't have vaultAddress
      const {
        instructions: createVaultInstructions,
        signers: createVaultSigners,
        extra: { vaultPublicKey }
      } = await createInitializeVaultInstrs(
        { provider: this.provider, config: this.parrotConfig },
        {
          vaultType,
          owner: this.provider.wallet.publicKey
        }
      );
      instructions.push(...createVaultInstructions);
      signers.push(...createVaultSigners);
      vaultPk = vaultPublicKey;
    } else {
      vaultPk = vault;
    }

    // Check if need to deposit collateral
    if (!bnCollateralAmount.isZero()) {
      const { instructions: stakeInstructions } = await createStakeInstrs(
        { provider: this.provider, config: this.parrotConfig },
        {
          vaultType,
          vault: vaultPk,
          collateralFrom: collateralTokenAccountPk,
          collateralFromAuthority: this.provider.wallet.publicKey,
          collateralAmount: bnCollateralAmount
        }
      );
      instructions.push(...stakeInstructions);
    }

    // Check if need to mint debt
    if (!bnDebtAmount.isZero()) {
      const { instructions: borrowInstructions } = await createBorrowInstrs(
        { provider: this.provider, config: this.parrotConfig },
        {
          vaultType,
          vault: vaultPk,
          vaultOwner: this.provider.wallet.publicKey,
          receiver: debtTokenAccountPk,
          debtAmount: bnDebtAmount
        }
      );

      instructions.push(...borrowInstructions);
    }
    const { txId, transaction } = await sendTransaction(
      this.provider,
      instructions,
      cleanupInstructions,
      signers,
      this.program.idl,
      true,
      this.parrotConfig
    );

    return {
      txId,
      transaction,
      vaultAddress: vaultPk.toBase58(),
      vaultAccountExist,
      debtTokenAccountExist
    };
  }

  async repay({
    vaultType,
    vault,
    repayAmount,
    collateralAmount,
    debtTokenAccount,
    collateralToken
  }: RepayProps): Promise<{
    txId: string;
    transaction: web3.Transaction;
    collateralTokenAccountExist: boolean;
  }> {
    const bnDebtAmount = new BN(repayAmount);
    const bnCollateralAmount = new BN(collateralAmount);
    let collateralTokenAccountExist = true;

    if (!vault) {
      throw new Error('Trying to repay but user do not have a vault');
    }

    if (bnCollateralAmount.isZero() && bnDebtAmount.isZero()) {
      throw new Error('Ether a debt or collateral amount is required');
    }

    if (!debtTokenAccount) {
      throw new Error(
        'Trying to repay debt but user do not have a debt token address'
      );
    }

    const instructions: web3.TransactionInstruction[] = [];
    const signers: web3.Account[] = [];
    const cleanupInstructions: web3.TransactionInstruction[] = [];

    let collateralTokenAccountPk = await findAssociatedTokenAccount(
      this.provider,
      this.provider.wallet.publicKey,
      collateralToken
    );

    // handle SOL token account
    if (collateralToken.equals(WSOL_MINT_ADDRESS)) {
      const {
        instructions: createTempWSOLAccountInstructions,
        cleanupInstructions: createTempWSOLAccountCleanupInstructions,
        signers: createTempWSOLAccountSigners,
        extra: { tokenAccount: collateralTokenAccount }
      } = await createTempWSOLAccountInstrs(
        { provider: this.provider, config: this.parrotConfig },
        {
          lamports: 0
        }
      );
      collateralTokenAccountPk = collateralTokenAccount.publicKey;
      instructions.push(...createTempWSOLAccountInstructions);
      cleanupInstructions.push(...createTempWSOLAccountCleanupInstructions);
      signers.push(...createTempWSOLAccountSigners);
    } else if (!collateralTokenAccountPk) {
      collateralTokenAccountExist = false;
      const {
        instructions: createTokenAccountInstructions,
        signers: createTokenAccountSigners,
        extra: { tokenAccount }
      } = await createAssociatedTokenAccountInstrs(
        { provider: this.provider, config: this.parrotConfig },
        {
          tokenMint: collateralToken,
          owner: this.provider.wallet.publicKey
        }
      );
      collateralTokenAccountPk = tokenAccount;
      instructions.push(...createTokenAccountInstructions);
      signers.push(...createTokenAccountSigners);
    }

    if (!collateralTokenAccountPk) {
      throw new Error(
        'Trying to withdraw funds but user do not have a collateral token address'
      );
    }

    if (!bnDebtAmount.isZero()) {
      const { instructions: repayInstructions } = await createRepayInstrs(
        { provider: this.provider, config: this.parrotConfig },
        {
          vaultType,
          vault,
          debtFrom: debtTokenAccount,
          debtFromAuthority: this.provider.wallet.publicKey,
          repayAmount: bnDebtAmount
        }
      );

      instructions.push(...repayInstructions);
    }

    if (!bnCollateralAmount.isZero()) {
      const { instructions: unstakeInstrunctions } = await createUnstakeInstrs(
        { provider: this.provider, config: this.parrotConfig },
        {
          vaultType,
          vault,
          vaultOwner: this.provider.wallet.publicKey,
          receiver: collateralTokenAccountPk,
          unstakeAmount: bnCollateralAmount
        }
      );

      instructions.push(...unstakeInstrunctions);
    }

    const { txId, transaction } = await sendTransaction(
      this.provider,
      instructions,
      cleanupInstructions,
      signers,
      this.program.idl,
      true,
      this.parrotConfig
    );

    return { txId, transaction, collateralTokenAccountExist };
  }

  async liquidate({
    vault,
    debtFrom,
    debtFromAuthority,
    liquidateAmount
  }: LiquidateProps): Promise<{ txId: string; transaction: web3.Transaction }> {
    const vaultData = await this.getVault(vault);
    const vaultType = await this.getVaultType(vaultData.vaultType);

    const instructions: web3.TransactionInstruction[] = [];
    const signers: web3.Account[] = [];
    const cleanupInstructions: web3.TransactionInstruction[] = [];

    const bnLiquidateAmount = new BN(liquidateAmount);

    let liquidatedCollateralReceiver = await findAssociatedTokenAccount(
      this.provider,
      this.provider.wallet.publicKey,
      vaultType.collateralToken
    );

    if (!liquidatedCollateralReceiver) {
      const {
        instructions: createTokenAccountInstructions,
        signers: createTokenAccountSigners,
        extra: { tokenAccount }
      } = await createAssociatedTokenAccountInstrs(
        { provider: this.provider, config: this.parrotConfig },
        {
          tokenMint: vaultType.collateralToken,
          owner: this.provider.wallet.publicKey
        }
      );
      liquidatedCollateralReceiver = tokenAccount;
      instructions.push(...createTokenAccountInstructions);
      signers.push(...createTokenAccountSigners);
    }

    const { instructions: liquidateInstructions } = await createLiquidateInstrs(
      { provider: this.provider, config: this.parrotConfig },
      {
        vaultType: vaultType.publicKey,
        vault,
        debtFrom,
        debtFromAuthority,
        liquidatedCollateralReceiver,
        liquidateAmount: bnLiquidateAmount
      }
    );

    instructions.push(...liquidateInstructions);

    const { txId, transaction } = await sendTransaction(
      this.provider,
      instructions,
      cleanupInstructions,
      signers,
      this.program.idl,
      true,
      this.parrotConfig
    );

    return { txId, transaction };
  }
}
