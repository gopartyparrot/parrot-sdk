import { Idl } from '@project-serum/anchor';
import { Transaction } from '@solana/web3.js';

import { getParrotConfig, ParrotConfig } from '../configs';
import { KNOWN_PROGRAMS, KNOWN_PROGRAMS_ERRORS } from './constants';
import { TransactionError } from './TransactionError';

type CustomError = { Custom: number };
type InstructionError = [number, CustomError];

function extractInstructionError(error: unknown): InstructionError | null {
  const instructionError = `${error}`.split('"InstructionError":').pop();
  if (instructionError) {
    const content = instructionError.substring(
      0,
      instructionError.lastIndexOf(']') + 1
    );
    return JSON.parse(content);
  }
  return null;
}

export function parseInstructionError(
  transaction: Transaction,
  txId: string,
  programIdl: Idl,
  transactionError: any,
  config?: ParrotConfig
): TransactionError {
  const parrotConfig = config ?? getParrotConfig();
  console.log('TransactionError', transactionError);

  if (`${transactionError}`.includes('Transaction cancelled')) {
    return new TransactionError(
      'Transaction cancelled',
      'TransactionCancelled',
      9999,
      txId
    );
  }

  if (`${transactionError}`.includes('Transaction was not confirmed')) {
    return new TransactionError(
      'Transaction was not confirmed in 30.00 seconds. It is unknown if it succeeded or failed',
      'TransactionNotConfirmed',
      9998,
      txId
    );
  }

  try {
    const instructionErrorData =
      transactionError['InstructionError'] ||
      extractInstructionError(transactionError);
    const [failedInstructionIndex, customError] = instructionErrorData;
    const failedInstruction = transaction.instructions[failedInstructionIndex];

    if (failedInstruction.programId.toString() === parrotConfig.programId) {
      const programError =
        programIdl.errors?.find(i => i.code == customError['Custom']) ||
        KNOWN_PROGRAMS_ERRORS.find(i => i.code == customError['Custom']);
      return new TransactionError(
        programError?.msg || 'Unknown',
        programError?.name || 'Unknown',
        programError?.code || customError['Custom'],
        txId
      );
    } else if (failedInstruction.programId.toString() in KNOWN_PROGRAMS) {
      const programName =
        KNOWN_PROGRAMS[failedInstruction.programId.toString()];
      const programError = KNOWN_PROGRAMS_ERRORS.find(
        i => i.code == customError['Custom']
      );
      return new TransactionError(
        programError?.msg || `${programName} error ${customError['Custom']}`,
        programError?.name || programName,
        programError?.code || customError['Custom'],
        txId
      );
    } else {
      return new TransactionError(
        `Unknown program error ${customError['Custom']}`,
        failedInstruction.programId.toString(),
        customError['Custom'],
        txId
      );
    }
  } catch {
    return new TransactionError(
      `${transactionError}`,
      'TransactionError',
      10000,
      txId
    );
  }
}
