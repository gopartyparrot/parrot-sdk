import { Idl, web3 } from '@project-serum/anchor';
import fs from 'fs';
import path from 'path';

import * as config from '.';

describe('Config module', () => {
  let testConfigContent: config.ParrotConfig;
  const testConfigFilePath = path.resolve(__dirname, 'config.test.json');
  const oldEnv = process.env;
  beforeAll(() => {
    jest.resetModules();
    process.env = {
      ...oldEnv,
      CHANNEL: 'test'
    };
    testConfigContent = {
      debtTypes: [
        {
          symbol: 'pai',
          debtOriginatorAuthority:
            'EiEvbPcs3nvBszLPRSA4AWvKUBk6ti41BowNvi3Uh1QK',
          debtTokenAddress: 'H8jceRKdKW7F2H7odgKctQZwtJnxxwuinzDhBY7vXDpp',
          debtTypeAddress: '43M5UXAkdrwPn6VFHkhmMqSrYMV88tmxbVstB62uB7NB',
          debtOriginator: 'AJYVtcEiNaH67FRfcViA421haMRVu9t44joLk8CUiUho',
          interestsHolder: '9csWyU9KZ1vv8Q3yqyej4ZowbmvqbjfKt18nzKXSMJ3n',
          initialMint: '110000000000000'
        }
      ],
      vaultTypes: [
        {
          name: 'BTC-PAI',
          address: 'HrWaa5EdcMRGKuL4p8GaqD4ah1aQoXBdZ5eRMoT9rgq',
          debtTypeAddress: '43M5UXAkdrwPn6VFHkhmMqSrYMV88tmxbVstB62uB7NB',
          debtTokenId: 'pai',
          debtTokenAddress: 'H8jceRKdKW7F2H7odgKctQZwtJnxxwuinzDhBY7vXDpp',
          debtOriginator: 'AJYVtcEiNaH67FRfcViA421haMRVu9t44joLk8CUiUho',
          debtOriginatorAuthority:
            'EiEvbPcs3nvBszLPRSA4AWvKUBk6ti41BowNvi3Uh1QK',
          interestsHolder: '9csWyU9KZ1vv8Q3yqyej4ZowbmvqbjfKt18nzKXSMJ3n',
          collateralTokenId: 'btc',
          collateralTokenAddress:
            'HucYPuwULdjQb1bur5uMbUZgYS7UZSwo8SqheNrMTDNE',
          collateralTokenHolder: '2FR78bfRnWewgZRzA7fgAZQU2S5uR1BNAXGPzfppKd67',
          collateralTokenHolderAuthority:
            'F5BT3ZNRVM7AmySrUTtpqXyVZQJtihA3qSJBdFY7iE6p',
          priceOracle: '56q8nUrG1VM61rryFUEV32Yf9XqyUeZxqPYJJefXdUL',
          params: {
            minimumCollateralRatio: '20000',
            liquidationCollateralRatio: '15000',
            liquidationPenalty: '500',
            interestRate: '500',
            debtCeiling: '50000000000000',
            maxDebtLimit: '100',
            maxDeposit: '150',
            oracle: 'btc:usd'
          }
        }
      ],
      tokens: [
        {
          id: 'pai',
          symbol: 'PAI',
          name: 'Parrot Stable',
          decimals: 6,
          displayDecimals: 2,
          address: 'H8jceRKdKW7F2H7odgKctQZwtJnxxwuinzDhBY7vXDpp',
          icon: 'pai.svg'
        }
      ],
      deployer: 'HFfiWqZi7ryNCLiyMUiteLS5oUzJkUnjJLco7mEztiEP',
      channel: 'test',
      programId: '6NDNsLbFcjmxo3BZ5A1MBRaNKig57XgfmGDj5bnX9Hmy',
      programIdl: {} as Idl
    };
    fs.writeFileSync(
      testConfigFilePath,
      JSON.stringify(testConfigContent, null, 2)
    );
  });

  afterAll(() => {
    fs.rmSync(testConfigFilePath);
    process.env = oldEnv;
  });

  describe('#getParrotConfig', () => {
    it('should get config correctly', () => {
      expect(process.env.CHANNEL).toBe('test');
      const parrotConfig = config.getParrotConfig();
      expect(parrotConfig).toEqual(testConfigContent);
    });
  });

  describe('#getDebtTypeConfig', () => {
    it('should get config correctly', () => {
      const debtType = testConfigContent.debtTypes[0];
      const debtTypeConfig = config.getDebtTypeConfig(
        new web3.PublicKey(debtType.debtTypeAddress)
      );

      expect(debtTypeConfig.debtOriginator.toBase58()).toEqual(
        debtType.debtOriginator
      );
      expect(debtTypeConfig.debtOriginatorAuthority.toBase58()).toEqual(
        debtType.debtOriginatorAuthority
      );
      expect(debtTypeConfig.debtTokenAddress.toBase58()).toEqual(
        debtType.debtTokenAddress
      );
      expect(debtTypeConfig.debtTypeAddress.toBase58()).toEqual(
        debtType.debtTypeAddress
      );
      expect(debtTypeConfig.interestsHolder.toBase58()).toEqual(
        debtType.interestsHolder
      );
    });
  });

  describe('#getVaultTypeConfig', () => {
    it('shoule get config correctly', () => {
      const vaultType = testConfigContent.vaultTypes[0];
      const vaultTypeConfig = config.getVaultTypeConfig(
        new web3.PublicKey(vaultType.address)
      );
      expect(vaultTypeConfig.address.toBase58()).toEqual(vaultType.address);
      expect(vaultTypeConfig.collateralTokenAddress.toBase58()).toEqual(
        vaultType.collateralTokenAddress
      );
      expect(vaultTypeConfig.collateralTokenHolder.toBase58()).toEqual(
        vaultType.collateralTokenHolder
      );
      expect(vaultTypeConfig.collateralTokenHolderAuthority.toBase58()).toEqual(
        vaultType.collateralTokenHolderAuthority
      );
      expect(vaultTypeConfig.debtOriginator.toBase58()).toEqual(
        vaultType.debtOriginator
      );
      expect(vaultTypeConfig.debtOriginatorAuthority.toBase58()).toEqual(
        vaultType.debtOriginatorAuthority
      );
      expect(vaultTypeConfig.debtTokenAddress.toBase58()).toEqual(
        vaultType.debtTokenAddress
      );
      expect(vaultTypeConfig.debtTypeAddress.toBase58()).toEqual(
        vaultType.debtTypeAddress
      );
      expect(vaultTypeConfig.interestsHolder.toBase58()).toEqual(
        vaultType.interestsHolder
      );
      expect(vaultTypeConfig.name).toEqual(vaultType.name);
      expect(vaultTypeConfig.params).toEqual(vaultType.params);
      expect(vaultTypeConfig.priceOracle.toBase58()).toEqual(
        vaultType.priceOracle
      );
    });
  });
});
