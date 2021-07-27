# Parrot program TypeScript sdk

Parrot Program 的 SDK

## Configs

根据 process.env.CHANNEL 获取对应的 parrot program 配置

### getParrotConfigPath

获取 channel 对应配置文件的绝对路径

```
// process.env.CHANNEL = 'dev'
const configPath = getParrotConfigPath() // /<path_to_config_folder>/config.dev.json
```

### getParrotConfig

获取 channel 对应配置文件的内容

```
// process.env.CHANNEL = 'dev'
const config = getParrotConfig() // { ... } config object
```

### getDebtTypeConfig

获取 channel 对应的某个 debt type

```
// process.env.CHANNEL = 'dev'
const config = getDebtTypeConfig() // { ... } debt type object or raise debt type not found error
```

### getVaultTypeConfig

获取 channel 对应的某个 vault type

```
// process.env.CHANNEL = 'dev'
const config = getVaultTypeConfig() // { ... } vault type object or raise vault type not found error
```

## Instructions

生成在与 Parrot 交互时需要用到的 instructions 的模块

输入参数类型定义:

```
{
  provider: Provider,
  args: T, // 输入参数类型定义的泛型
  overrideConfig?: ParrotConfig
}
```

返回参数类型定义:

```
{
  instructions: web3.TransactionInstruction[];
  cleanupInstructions: web3.TransactionInstruction[];
  signers: web3.Account[];
  extra: T; // 额外返回的数据定义
}
```

### Initial vault

初始化 vault account data

```
args: ({ vaultType: web3.PublicKey; owner: web3.PublicKey; })
extra: ({ vaultPublicKey: web3.PublicKey })
```

### Stake

向 vault 中存入 collateral token

```
args: ({
  vaultType: web3.PublicKey;
  vault: web3.PublicKey;
  collateralFrom: web3.PublicKey;
  collateralFromAuthority: web3.PublicKey;
  collateralAmount: BN;
})
extra: void
```

### Unstake

从 vault 中取出 collateral token

```
args: ({
  vaultType: web3.PublicKey;
  vault: web3.PublicKey;
  vaultOwner: web3.PublicKey;
  receiver: web3.PublicKey;
  unstakeAmount: BN;
})
extra: void
```

### Borrow

从 vault 中借出 debt token

```
args: ({
  vaultType: web3.PublicKey;
  vault: web3.PublicKey;
  vaultOwner: web3.PublicKey;
  receiver: web3.PublicKey;
  debtAmount: BN;
})
extra: void
```

### Repay

降 debt token 归还到 vault

```
args: ({
  vaultType: web3.PublicKey;
  vault: web3.PublicKey;
  debtFrom: web3.PublicKey;
  debtFromAuthority: web3.PublicKey;
  repayAmount: BN;
})
extra: void
```

### Liquidate

尝试清算指定的 vault

```
args: ({
  vaultType: web3.PublicKey;
  vault: web3.PublicKey;
  debtFrom: web3.PublicKey;
  debtFromAuthority: web3.PublicKey;
  liquidatedCollateralReceiver: web3.PublicKey;
  liquidateAmount: BN;
})
extra: void
```

## Parrot [WIP]

### getParrotProgram

通过 provider 和 process.env.CHANNEL 生成对应 channel 的 parrot sdk 对象

```
(provider: Anchor.Provider) -> ParrotProgram
```

### getCollateralRatio

通过参数计算 collateral ratio

```
(
  debtAmount: string,
  collateralAmount: string,
  debtTokenDecimals: number,
  collateralTokenDecimals?: number,
  collateralTokenPrice?: string
) -> string
```

### getEsimateDebtAmount

通过参数计算指定 slot 之后预计的 debt

```
(
  vaultTypeInterestAccum,
  interestAccum: string,
  debtAmount: string,
  currentSlot: number,
  targetSlot: number
) -> string
```

### getLiquidationPrice

根据参数计算清算价格

```
(
  debtAmount: string,
  collateralAmount: string,
  liquidationRatio: string
  debtTokenDecimals: number,
  collateralTokenDecimals: number,
) -> string
```
