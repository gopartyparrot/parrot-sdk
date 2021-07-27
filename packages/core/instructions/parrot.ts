import { BN, web3 } from '@project-serum/anchor';
import { TokenInstructions } from '@project-serum/serum';

import { getParrotProgram } from '..';
import { getVaultTypeConfig } from '../configs';
import { CreateInstructionFunction } from './type';

export const createInitializeVaultInstrs: CreateInstructionFunction<
  {
    vaultType: web3.PublicKey;
    owner: web3.PublicKey;
  },
  { vaultPublicKey: web3.PublicKey }
> = async ({ provider, config }, { vaultType, owner }) => {
  const program = getParrotProgram(provider, config);
  const vaultPublicKey = await program.account.vault.associatedAddress(
    owner,
    vaultType
  );

  return {
    instructions: [
      await program.instruction.initVault({
        accounts: {
          vaultType,
          vault: vaultPublicKey,
          owner,
          rent: web3.SYSVAR_RENT_PUBKEY,
          clock: web3.SYSVAR_CLOCK_PUBKEY,
          systemProgram: web3.SystemProgram.programId
        }
      })
    ],
    cleanupInstructions: [],
    signers: [],
    extra: {
      vaultPublicKey
    }
  };
};

export const createStakeInstrs: CreateInstructionFunction<{
  vaultType: web3.PublicKey;
  vault: web3.PublicKey;
  collateralFrom: web3.PublicKey;
  collateralFromAuthority: web3.PublicKey;
  collateralAmount: BN;
}> = async (
  { provider, config },
  {
    vaultType,
    vault,
    collateralFrom,
    collateralFromAuthority,
    collateralAmount
  }
) => {
  const program = getParrotProgram(provider, config);
  const vaultTypeConfig = getVaultTypeConfig(vaultType, config);

  return {
    instructions: [
      await program.instruction.stake(collateralAmount, {
        accounts: {
          vaultType,
          vault,
          collateralFrom,
          collateralFromAuthority,
          collateralTo: vaultTypeConfig.collateralTokenHolder,
          tokenProgram: TokenInstructions.TOKEN_PROGRAM_ID,
          clock: web3.SYSVAR_CLOCK_PUBKEY
        }
      })
    ],
    cleanupInstructions: [],
    signers: [],
    extra: {}
  };
};

export const createUnstakeInstrs: CreateInstructionFunction<{
  vaultType: web3.PublicKey;
  vault: web3.PublicKey;
  vaultOwner: web3.PublicKey;
  receiver: web3.PublicKey;
  unstakeAmount: BN;
}> = async (
  { provider, config },
  { vaultType, vault, vaultOwner, receiver, unstakeAmount }
) => {
  const program = getParrotProgram(provider, config);
  const vaultTypeConfig = getVaultTypeConfig(vaultType, config);

  return {
    instructions: [
      await program.instruction.unstake(unstakeAmount, {
        accounts: {
          debtType: vaultTypeConfig.debtTypeAddress,
          vaultType,
          vault,
          oracle: vaultTypeConfig.priceOracle,
          vaultOwner,
          receiver,
          debtToken: vaultTypeConfig.debtTokenAddress,
          collateralToken: vaultTypeConfig.collateralTokenAddress,
          collateralTokenHolder: vaultTypeConfig.collateralTokenHolder,
          collateralTokenHolderAuthority:
            vaultTypeConfig.collateralTokenHolderAuthority,
          tokenProgram: TokenInstructions.TOKEN_PROGRAM_ID,
          clock: web3.SYSVAR_CLOCK_PUBKEY
        }
      })
    ],
    cleanupInstructions: [],
    signers: [],
    extra: {}
  };
};

export const createBorrowInstrs: CreateInstructionFunction<{
  vaultType: web3.PublicKey;
  vault: web3.PublicKey;
  vaultOwner: web3.PublicKey;
  receiver: web3.PublicKey;
  debtAmount: BN;
}> = async (
  { provider, config },
  { vaultType, vault, vaultOwner, receiver, debtAmount }
) => {
  const program = getParrotProgram(provider, config);
  const vaultTypeConfig = getVaultTypeConfig(vaultType, config);

  return {
    instructions: [
      await program.instruction.borrow(debtAmount, {
        accounts: {
          debtType: vaultTypeConfig.debtTypeAddress,
          vaultType,
          vault,
          oracle: vaultTypeConfig.priceOracle,
          vaultOwner,
          receiver,
          debtToken: vaultTypeConfig.debtTokenAddress,
          debtOriginator: vaultTypeConfig.debtOriginator,
          debtOriginatorAuthority: vaultTypeConfig.debtOriginatorAuthority,
          collateralTokenMint: vaultTypeConfig.collateralTokenAddress,
          tokenProgram: TokenInstructions.TOKEN_PROGRAM_ID,
          clock: web3.SYSVAR_CLOCK_PUBKEY
        }
      })
    ],
    cleanupInstructions: [],
    signers: [],
    extra: {}
  };
};

export const createRepayInstrs: CreateInstructionFunction<{
  vaultType: web3.PublicKey;
  vault: web3.PublicKey;
  debtFrom: web3.PublicKey;
  debtFromAuthority: web3.PublicKey;
  repayAmount: BN;
}> = async (
  { provider, config },
  { vaultType, vault, debtFrom, debtFromAuthority, repayAmount }
) => {
  const program = getParrotProgram(provider, config);
  const vaultTypeConfig = getVaultTypeConfig(vaultType, config);
  return {
    instructions: [
      await program.instruction.repay(repayAmount, {
        accounts: {
          debtType: vaultTypeConfig.debtTypeAddress,
          vaultType,
          vault,
          debtToken: vaultTypeConfig.debtTokenAddress,
          debtOriginator: vaultTypeConfig.debtOriginator,
          debtFrom,
          debtFromAuthority,
          tokenProgram: TokenInstructions.TOKEN_PROGRAM_ID,
          clock: web3.SYSVAR_CLOCK_PUBKEY
        }
      })
    ],
    cleanupInstructions: [],
    signers: [],
    extra: {}
  };
};

export const createLiquidateInstrs: CreateInstructionFunction<{
  vaultType: web3.PublicKey;
  vault: web3.PublicKey;
  debtFrom: web3.PublicKey;
  debtFromAuthority: web3.PublicKey;
  liquidatedCollateralReceiver: web3.PublicKey;
  liquidateAmount: BN;
}> = async (
  { provider, config },
  {
    vaultType,
    vault,
    debtFrom,
    debtFromAuthority,
    liquidatedCollateralReceiver,
    liquidateAmount
  }
) => {
  const program = getParrotProgram(provider, config);
  const vaultTypeConfig = getVaultTypeConfig(vaultType, config);

  return {
    instructions: [
      await program.instruction.liquidate(liquidateAmount, {
        accounts: {
          debtType: vaultTypeConfig.debtTypeAddress,
          vaultType,
          vault,
          oracle: vaultTypeConfig.priceOracle,
          tokenProgram: TokenInstructions.TOKEN_PROGRAM_ID,
          collateralToken: vaultTypeConfig.collateralTokenAddress,
          collateralTokenHolder: vaultTypeConfig.collateralTokenHolder,
          collateralTokenHolderAuthority:
            vaultTypeConfig.collateralTokenHolderAuthority,
          debtToken: vaultTypeConfig.debtTokenAddress,
          debtOriginator: vaultTypeConfig.debtOriginator,
          debtFrom,
          debtFromAuthority,
          liquidatedCollateralReceiver,
          clock: web3.SYSVAR_CLOCK_PUBKEY
        }
      })
    ],
    cleanupInstructions: [],
    signers: [],
    extra: {}
  };
};
