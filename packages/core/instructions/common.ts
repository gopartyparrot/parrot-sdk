import { web3 } from '@project-serum/anchor';
import {
  createAssociatedTokenAccount as serumCreateAssociatedTokenAccountInstrs,
  getAssociatedTokenAddress as serumGetAssociatedTokenAddress
} from '@project-serum/associated-token';
import { createTokenAccountInstrs as serumCreateTokenAccountInstrs } from '@project-serum/common';
import { AccountLayout, Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';

import { WSOL_MINT_ADDRESS } from '..';
import { CreateInstructionFunction } from './type';

export const createRentFreeAccountInstruction: CreateInstructionFunction<{
  newPubicKey: web3.PublicKey;
  programID: web3.PublicKey;
  space: number;
}> = async ({ provider }, { newPubicKey, programID, space }) => {
  const balance = await provider.connection.getMinimumBalanceForRentExemption(
    space
  );

  return {
    instructions: [
      web3.SystemProgram.createAccount({
        fromPubkey: provider.wallet.publicKey,
        newAccountPubkey: newPubicKey,
        lamports: balance,
        space: space,
        programId: programID
      })
    ],
    cleanupInstructions: [],
    signers: [],
    extra: {}
  };
};

export const createTempWSOLAccountInstrs: CreateInstructionFunction<
  {
    lamports: number;
  },
  {
    tokenAccount: web3.Account;
  }
> = async ({ provider }, { lamports }) => {
  const tokenAccount = new web3.Account();
  const accountRentExempt =
    await provider.connection.getMinimumBalanceForRentExemption(
      AccountLayout.span
    );
  const createAccountInst = web3.SystemProgram.createAccount({
    fromPubkey: provider.wallet.publicKey,
    newAccountPubkey: tokenAccount.publicKey,
    lamports: lamports + accountRentExempt,
    space: AccountLayout.span as number,
    programId: TOKEN_PROGRAM_ID
  });

  const createInitAccountInst = Token.createInitAccountInstruction(
    TOKEN_PROGRAM_ID,
    WSOL_MINT_ADDRESS,
    tokenAccount.publicKey,
    provider.wallet.publicKey
  );

  const closeAccountInstruction = Token.createCloseAccountInstruction(
    TOKEN_PROGRAM_ID,
    tokenAccount.publicKey,
    provider.wallet.publicKey,
    provider.wallet.publicKey,
    []
  );

  return {
    instructions: [createAccountInst, createInitAccountInst],
    cleanupInstructions: [closeAccountInstruction],
    signers: [tokenAccount],
    extra: {
      tokenAccount
    }
  };
};

export const createTokenAccountInstrs: CreateInstructionFunction<
  {
    tokenMint: web3.PublicKey;
    owner: web3.PublicKey;
  },
  { tokenAccount: web3.Account }
> = async ({ provider }, { tokenMint, owner }) => {
  const tokenAccount = new web3.Account();
  return {
    instructions: await serumCreateTokenAccountInstrs(
      provider,
      tokenAccount.publicKey,
      tokenMint,
      owner
    ),
    cleanupInstructions: [],
    signers: [tokenAccount],
    extra: {
      tokenAccount
    }
  };
};

export const createAssociatedTokenAccountInstrs: CreateInstructionFunction<
  {
    tokenMint: web3.PublicKey;
    owner: web3.PublicKey;
  },
  { tokenAccount: web3.PublicKey }
> = async ({ provider }, { tokenMint, owner }) => {
  const tokenAccount = await serumGetAssociatedTokenAddress(owner, tokenMint);
  return {
    instructions: [
      await serumCreateAssociatedTokenAccountInstrs(
        provider.wallet.publicKey,
        owner,
        tokenMint
      )
    ],
    cleanupInstructions: [],
    signers: [],
    extra: {
      tokenAccount
    }
  };
};
