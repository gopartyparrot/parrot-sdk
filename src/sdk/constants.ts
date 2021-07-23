import { web3 } from '@project-serum/anchor';
import BigNumber from 'bignumber.js';

export const SLOT_IN_YEAR = new BigNumber(60 * 60 * 24 * 365).multipliedBy(2);

export const WSOL_MINT_ADDRESS = new web3.PublicKey(
  'So11111111111111111111111111111111111111112'
);

export const STABLES_SYMBOLS = ['USDC', 'USDT', 'PAI'];
