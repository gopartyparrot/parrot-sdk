import { TokenInstructions } from '@project-serum/serum';
import { SystemProgram } from '@solana/web3.js';

export const KNOWN_PROGRAMS = {
  [TokenInstructions.TOKEN_PROGRAM_ID.toString()]: 'Token program',
  [SystemProgram.programId.toString()]: 'System program'
};

export const KNOWN_PROGRAMS_ERRORS = [
  {
    msg: 'Insufficient balance or debt celling reach. Check your SOL and collateral token balance and try again',
    name: 'InsufficientBalance',
    code: 1
  },
  {
    msg: 'Unknown', // TODO: find error details for 0x3
    name: 'Unknown',
    code: 3
  }
];
