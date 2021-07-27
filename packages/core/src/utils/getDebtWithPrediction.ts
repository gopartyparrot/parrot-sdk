import BigNumber from 'bignumber.js';
import { ONE } from '.';
import { SLOT_IN_YEAR } from '../sdk';

export const getDebtWithPrediction = (
  debtAmount: string,
  durantionSlot: number,
  interestRatePerYear?: string
) => {
  if (!interestRatePerYear) {
    return debtAmount;
  }
  const debtAmountBN = new BigNumber(debtAmount);
  const interestRateBN = new BigNumber(interestRatePerYear);
  const durantionRate = interestRateBN
    .multipliedBy(durantionSlot)
    .dividedBy(SLOT_IN_YEAR);

  return debtAmountBN.multipliedBy(durantionRate.plus(ONE)).toString();
};
