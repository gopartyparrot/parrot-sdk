import BigNumber from 'bignumber.js';

import { INFINITY, ZERO } from './constants';

export const getCollateralRatio = (
  debtAmount: string,
  collateralAmount: string,
  debtTokenDecimals: number,
  collateralTokenDecimals?: number,
  collateralTokenPrice?: string,
  percentMultiplier = 1
): string => {
  if (!collateralTokenDecimals || !collateralTokenPrice) {
    return ZERO.toString();
  }

  const debtAmountBN = new BigNumber(debtAmount);
  const collateralAmountBN = new BigNumber(collateralAmount);
  const collateralTokenPriceBN = new BigNumber(collateralTokenPrice);

  if (debtAmountBN.isZero()) {
    return INFINITY.toString();
  } else if (collateralAmountBN.isZero()) {
    return ZERO.toString();
  }

  const collateralAmountFixed = collateralAmountBN.dividedBy(
    10 ** collateralTokenDecimals
  );

  const debtAmountFixed = debtAmountBN.dividedBy(10 ** debtTokenDecimals);

  const collateralRatio = collateralAmountFixed
    .multipliedBy(collateralTokenPriceBN)
    .dividedBy(debtAmountFixed);

  return BigNumber.max(collateralRatio, ZERO)
    .multipliedBy(percentMultiplier)
    .toString();
};
