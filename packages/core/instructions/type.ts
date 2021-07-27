import { Provider, web3 } from '@project-serum/anchor';
import { ParrotConfig } from '../configs';

export interface CreateInstructionFunctionResult<T extends unknown> {
  instructions: web3.TransactionInstruction[];
  cleanupInstructions: web3.TransactionInstruction[];
  signers: web3.Account[];
  extra: T;
}

export type CreateInstructionFunction<T, U = unknown> = (
  { provider, config }: { provider: Provider; config?: ParrotConfig },
  args: T,
  overrideConfig?: ParrotConfig
) => Promise<CreateInstructionFunctionResult<U>>;
