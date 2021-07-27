import BigNumber from 'bignumber.js';

import { ZERO } from './constants';

export const getLiquidationPriceInDebtToken = (
  debtAmount: string = ZERO.toString(),
  collateralAmount: string = ZERO.toString(),
  debtTokenDecimals: number,
  collateralTokenDecimals: number,
  liquidationRatio: string = ZERO.toString()
) => {
  const debtAmountBN = new BigNumber(debtAmount);
  const collateralAmountBN = new BigNumber(collateralAmount);
  const liquidationRatioBN = new BigNumber(liquidationRatio);
  if (
    liquidationRatioBN.eq(ZERO) ||
    debtAmountBN.eq(ZERO) ||
    collateralAmountBN.eq(ZERO)
  ) {
    return undefined;
  }
  const debtAmountFixed = debtAmountBN.dividedBy(
    new BigNumber(10).pow(debtTokenDecimals)
  );

  const collateralAmountFixed = collateralAmountBN.dividedBy(
    new BigNumber(10).pow(collateralTokenDecimals)
  );

  // liquidation_price_in_debt = collateral_amount / debt_amount / liquidation_ratio * PERCENT_MULTIPLE (10000)
  const liquidationPriceInDebt = collateralAmountFixed
    .multipliedBy(10000)
    .dividedBy(debtAmountFixed)
    .dividedBy(liquidationRatioBN);
  return BigNumber.max(liquidationPriceInDebt, ZERO).toString();
};
