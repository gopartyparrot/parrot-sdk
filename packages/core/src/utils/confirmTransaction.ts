import { Idl, Provider, web3 } from '@project-serum/anchor';

import { ParrotConfig } from '../configs';
import { parseInstructionError } from '../errors';

export const confirmTransaction = async (
  provider: Provider,
  txId: string,
  transaction: web3.Transaction,
  programIdl: Idl,
  commitment: web3.Commitment = 'confirmed',
  config?: ParrotConfig
) => {
  const res = await provider.connection.confirmTransaction(txId, commitment);

  if (res?.value?.err) {
    throw parseInstructionError(
      transaction,
      txId,
      programIdl,
      res.value.err,
      config
    );
  }
  return txId;
};
