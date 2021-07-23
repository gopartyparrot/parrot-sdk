import BigNumber from 'bignumber.js';
import { ONE } from '.';

// debt_token_unit_price = 1 / collateral_token_price * decimals
export const getDebtTokenUnitPrice = (collateralTokenPrice: string) =>
  ONE.dividedBy(new BigNumber(collateralTokenPrice)).toString();
