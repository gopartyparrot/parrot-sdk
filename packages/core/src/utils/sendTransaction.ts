import { Idl, Provider, web3 } from '@project-serum/anchor';

import { ParrotConfig } from '../configs';
import { parseInstructionError } from '../errors';

export const sendTransaction = async (
  provider: Provider,
  instructions: web3.TransactionInstruction[],
  cleanUpInstructions: web3.TransactionInstruction[],
  signers: web3.Account[],
  programIdl: Idl,
  skipPreflight = true,
  config?: ParrotConfig
) => {
  let txId = '';
  const transaction = new web3.Transaction();
  try {
    transaction.add(...instructions, ...cleanUpInstructions);

    transaction.feePayer = provider.wallet.publicKey;
    transaction.recentBlockhash = (
      await provider.connection.getRecentBlockhash()
    ).blockhash;

    await provider.wallet.signTransaction(transaction);
    signers
      .filter(s => s !== undefined)
      .forEach(kp => {
        transaction.partialSign(kp);
      });

    const rawTx = transaction.serialize();

    txId = await provider.connection.sendRawTransaction(rawTx, {
      skipPreflight
    });
  } catch (error) {
    throw parseInstructionError(transaction, txId, programIdl, error, config);
  }
  return { txId, transaction };
};
