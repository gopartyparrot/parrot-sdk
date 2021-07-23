import { Idl, Program, Provider, web3 } from '@project-serum/anchor';

import { getParrotConfig, ParrotConfig } from '../configs';

export const getParrotProgram = (provider: Provider, config?: ParrotConfig) => {
  const parrotConfig = config ?? getParrotConfig();
  return new Program(
    parrotConfig.programIdl as Idl,
    new web3.PublicKey(parrotConfig.programId),
    provider
  );
};

export * from './constants';
export * from './ParrotProgram';
export * from './type';
