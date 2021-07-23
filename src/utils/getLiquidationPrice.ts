import BigNumber from 'bignumber.js';

import { ZERO } from './constants';

export const getLiquidationPrice = (
  debtAmount: string,
  collateralAmount: string,
  liquidationRatio: string,
  debtTokenDecimals: number,
  collateralTokenDecimals?: number
): string => {
  const debtAmountBN = new BigNumber(debtAmount);
  const collateralAmountBN = new BigNumber(collateralAmount);
  const liquidationRatioBN = new BigNumber(liquidationRatio);

  if (
    !collateralTokenDecimals ||
    debtAmountBN.isZero() ||
    collateralAmountBN.isZero()
  ) {
    return ZERO.toString();
  }

  const collateralAmountFixed = collateralAmountBN.dividedBy(
    10 ** collateralTokenDecimals
  );

  const debtAmountFixed = debtAmountBN.dividedBy(10 ** debtTokenDecimals);

  const liquidationPrice = liquidationRatioBN
    .dividedBy(10000) // 15000 => 1.5%
    .multipliedBy(debtAmountFixed)
    .dividedBy(collateralAmountFixed);

  return BigNumber.max(liquidationPrice, ZERO).toString();
};
