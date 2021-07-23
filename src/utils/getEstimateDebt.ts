import BigNumber from 'bignumber.js';

import { SLOT_IN_YEAR } from '../sdk/constants';

export const getEstimateDebt = (
  interestRate: string,
  vaultTypeInterestAccum: string,
  vaultTypeInterestAccumUpdated: string,
  interestAccum: string,
  debtAmount: string,
  currentSlot: number
): string => {
  const interestRateBN = new BigNumber(interestRate);
  const vaultTypeInterestAccumBN = new BigNumber(vaultTypeInterestAccum);
  const interestAccumBN = new BigNumber(interestAccum);
  const debtAmountBN = new BigNumber(debtAmount);

  const estimatedVaultTypeInterestAccum = vaultTypeInterestAccumBN.plus(
    interestRateBN
      .dividedBy(SLOT_IN_YEAR)
      .multipliedBy(
        currentSlot - Number.parseInt(vaultTypeInterestAccumUpdated)
      )
  );

  const accruedInterests = estimatedVaultTypeInterestAccum
    .minus(interestAccumBN)
    .multipliedBy(debtAmountBN);

  return vaultTypeInterestAccumBN
    .plus(accruedInterests)
    .plus(debtAmountBN)
    .toString();
};
