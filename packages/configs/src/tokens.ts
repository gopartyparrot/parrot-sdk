export interface IToken {
  symbol: string;
  name: string;
  mint: string;
  decimals: number;
  priceOracleInUSD?: string;
  parrot?: {
    displaySymbol: string;
    nameDetail?: string;
    displayDecimals: number;
  };
}

export const tokens: Record<string, IToken> = {
  Ea5SjE2Y6yvCeW5dYTn7PYMuW5ikXkvbGdcmSnXeaLjS: {
    symbol: "PAI",
    name: "Parrot Stable",
    decimals: 6,
    mint: "Ea5SjE2Y6yvCeW5dYTn7PYMuW5ikXkvbGdcmSnXeaLjS",
    parrot: {
      displaySymbol: "PAI",
      displayDecimals: 2,
    },
  },
  EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: {
    symbol: "USDC",
    name: "USD Coin",
    decimals: 6,
    mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    parrot: {
      displaySymbol: "USDC",
      displayDecimals: 2,
    },
  },
  Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB: {
    symbol: "USDT",
    name: "USD Tether",
    decimals: 6,
    mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    parrot: {
      displaySymbol: "USDT",
      displayDecimals: 2,
    },
  },
  So11111111111111111111111111111111111111111: {
    symbol: "SOL",
    name: "Solana",
    decimals: 9,
    mint: "So11111111111111111111111111111111111111111",
    priceOracleInUSD: "6C8dCcYDd7ykNT2EFU6drGAhJhoGqbEBU5kNowHox34p",
    parrot: {
      displaySymbol: "SOL",
      displayDecimals: 4,
    },
  },
  So11111111111111111111111111111111111111112: {
    symbol: "wSOL",
    name: "Solana",
    decimals: 9,
    mint: "So11111111111111111111111111111111111111112",
    priceOracleInUSD: "6C8dCcYDd7ykNT2EFU6drGAhJhoGqbEBU5kNowHox34p",
    parrot: {
      displaySymbol: "SOL",
      displayDecimals: 4,
    },
  },
  DYDWu4hE4MN3aH897xQ3sRTs5EAjJDmQsKLNhbpUiKun: {
    symbol: "pBTC",
    name: "Parrot BTC",
    decimals: 8,
    mint: "DYDWu4hE4MN3aH897xQ3sRTs5EAjJDmQsKLNhbpUiKun",
    priceOracleInUSD: "5XHsK3Jmj8LfkvWaWEPNb7Mm4UguodREtixrc9F65FRK",
    parrot: {
      displaySymbol: "pBTC",
      displayDecimals: 8,
    },
  },
  SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt: {
    symbol: "SRM",
    name: "Serum",
    decimals: 6,
    mint: "SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt",
    priceOracleInUSD: "GwbKzS7V9bpk2vx7o2g35vU9a2yawsWPc5hq317MHF7z",
    parrot: {
      displaySymbol: "SRM",
      displayDecimals: 4,
    },
  },
  CDJWUqTcYTVAKXAVXoQZFes5JUFc7owSeq7eMQcDSbo5: {
    symbol: "renBTC",
    name: "renBTC",
    decimals: 8,
    mint: "CDJWUqTcYTVAKXAVXoQZFes5JUFc7owSeq7eMQcDSbo5",
    priceOracleInUSD: "5XHsK3Jmj8LfkvWaWEPNb7Mm4UguodREtixrc9F65FRK",
    parrot: {
      displaySymbol: "renBTC",
      displayDecimals: 8,
    },
  },
  "57h4LEnBooHrKbacYWGCFghmrTzYPVn8PwZkzTzRLvHa": {
    symbol: "MER LP",
    name: "Mercurial LP Token (USDC-USDT-UST) + yield strategy",
    mint: "57h4LEnBooHrKbacYWGCFghmrTzYPVn8PwZkzTzRLvHa",
    decimals: 9,
    parrot: {
      displaySymbol: "MER LP+Earn",
      nameDetail: "USDC-USDT-UST",
      displayDecimals: 2,
    },
  },
  "2poo1w1DL6yd2WNTCnNTzDqkC6MBXq7axo77P16yrBuf": {
    symbol: "SBR LP",
    name: "Saber LP Token (USDC-USDT) + yield strategy ",
    mint: "2poo1w1DL6yd2WNTCnNTzDqkC6MBXq7axo77P16yrBuf",
    decimals: 6,
    parrot: {
      displaySymbol: "SBR LP+Earn",
      nameDetail: "USDC-USDT",
      displayDecimals: 2,
    },
  },
  UST32f2JtPGocLzsL41B3VBBoJzTm1mK1j3rwyM3Wgc: {
    symbol: "SBR LP",
    name: "Saber LP Token (UST-USDC) + yield strategy ",
    mint: "UST32f2JtPGocLzsL41B3VBBoJzTm1mK1j3rwyM3Wgc",
    decimals: 9,
    parrot: {
      displaySymbol: "SBR LP+Earn",
      nameDetail: "UST-USDC",
      displayDecimals: 2,
    },
  },
  SoLEao8wTzSfqhuou8rcYsVoLjthVmiXuEjzdNPMnCz: {
    symbol: "SBR LP",
    name: "Saber LP Token (mSOL-SOL) + yield strategy ",
    mint: "SoLEao8wTzSfqhuou8rcYsVoLjthVmiXuEjzdNPMnCz",
    decimals: 9,
    priceOracleInUSD: "6C8dCcYDd7ykNT2EFU6drGAhJhoGqbEBU5kNowHox34p",
    parrot: {
      displaySymbol: "SBR LP+Earn",
      nameDetail: "mSOL-SOL",
      displayDecimals: 4,
    },
  },
  "9EaLkQrbjmbbuZG9Wdpo8qfNUEjHATJFSycEmw6f1rGX": {
    symbol: "pSOL",
    name: "Parrot Staked SOL",
    decimals: 9,
    mint: "9EaLkQrbjmbbuZG9Wdpo8qfNUEjHATJFSycEmw6f1rGX",
    priceOracleInUSD: "6C8dCcYDd7ykNT2EFU6drGAhJhoGqbEBU5kNowHox34p",
    parrot: {
      displaySymbol: "pSOL",
      displayDecimals: 2,
    },
  },
  mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So: {
    symbol: "mSOL",
    name: "Marinade staked SOL",
    mint: "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
    decimals: 9,
    priceOracleInUSD: "6C8dCcYDd7ykNT2EFU6drGAhJhoGqbEBU5kNowHox34p",
    parrot: {
      displaySymbol: "mSOL",
      displayDecimals: 4,
    },
  },
  "8HoQnePLqPj4M7PUDzfw8e3Ymdwgc7NLGnaTUapubyvu": {
    symbol: "RAY LP",
    name: "Raydium LP Token (SOL-USDC)",
    mint: "8HoQnePLqPj4M7PUDzfw8e3Ymdwgc7NLGnaTUapubyvu",
    decimals: 9,
    priceOracleInUSD: "Bebd9BVRZKqJEMtZXVggiVZY6BDFdqW9WP9wzNMje3L",
    parrot: {
      displaySymbol: "RAY LP",
      nameDetail: "SOL-USDC",
      displayDecimals: 4,
    },
  },
  "3H9NxvaZoxMZZDZcbBDdWMKbrfNj7PCF5sbRwDr7SdDW": {
    symbol: "RAY LP",
    name: "Raydium LP Token (MER-USDC) + yield strategy",
    mint: "3H9NxvaZoxMZZDZcbBDdWMKbrfNj7PCF5sbRwDr7SdDW",
    decimals: 6,
    priceOracleInUSD: "72qcEpuDzAEytUeHy9YePmV5Nbf3aNSXCKw9u7XPS1NE",
    parrot: {
      displaySymbol: "RAY LP+Earn",
      nameDetail: "MER-USDC",
      displayDecimals: 2,
    },
  },
  "9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E": {
    symbol: "BTC",
    name: "Wrapped Bitcoin (Sollet)",
    decimals: 6,
    mint: "9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E",
    priceOracleInUSD: "5XHsK3Jmj8LfkvWaWEPNb7Mm4UguodREtixrc9F65FRK",
    parrot: {
      displaySymbol: "BTC",
      displayDecimals: 6,
    },
  },
  SLPbsNrLHv8xG4cTc4R5Ci8kB9wUPs6yn6f7cKosoxs: {
    symbol: "SBR LP",
    name: "Saber LP Token (BTC-renBTC) + yield strategy",
    mint: "SLPbsNrLHv8xG4cTc4R5Ci8kB9wUPs6yn6f7cKosoxs",
    decimals: 8,
    priceOracleInUSD: "5XHsK3Jmj8LfkvWaWEPNb7Mm4UguodREtixrc9F65FRK",
    parrot: {
      displaySymbol: "SBR LP+Earn",
      nameDetail: "BTC-renBTC",
      displayDecimals: 8,
    },
  },
  BdZPG9xWrG3uFrx2KrUW1jT4tZ9VKPDWknYihzoPRJS3: {
    symbol: "prtSOL",
    name: "Parrot Staked SOL",
    mint: "BdZPG9xWrG3uFrx2KrUW1jT4tZ9VKPDWknYihzoPRJS3",
    decimals: 9,
    priceOracleInUSD: "6C8dCcYDd7ykNT2EFU6drGAhJhoGqbEBU5kNowHox34p",
    parrot: {
      displaySymbol: "prtSOL",
      displayDecimals: 4,
    },
  },
  PrsVdKtXDDf6kJQu5Ff6YqmjfE4TZXtBgHM4bjuvRnR: {
    symbol: "SBR LP",
    name: "Saber LP Token (prtSOL-SOL) + yield strategy",
    mint: "PrsVdKtXDDf6kJQu5Ff6YqmjfE4TZXtBgHM4bjuvRnR",
    decimals: 9,
    priceOracleInUSD: "6C8dCcYDd7ykNT2EFU6drGAhJhoGqbEBU5kNowHox34p",
    parrot: {
      displaySymbol: "SBR LP+Earn",
      nameDetail: "prtSOL-SOL",
      displayDecimals: 2,
    },
  },
  GHhDU9Y7HM37v6cQyaie1A3aZdfpCDp6ScJ5zZn2c3uk: {
    symbol: "MER LP",
    name: "Mercurial LP Token (SOL-pSOL) + yield strategy",
    mint: "GHhDU9Y7HM37v6cQyaie1A3aZdfpCDp6ScJ5zZn2c3uk",
    decimals: 9,
    priceOracleInUSD: "6C8dCcYDd7ykNT2EFU6drGAhJhoGqbEBU5kNowHox34p",
    parrot: {
      displaySymbol: "MER LP+Earn",
      nameDetail: "SOL-pSOL",
      displayDecimals: 2,
    },
  },
  "9s6dXtMgV5E6v3rHqBF2LejHcA2GWoZb7xNUkgXgsBqt": {
    symbol: "MER LP",
    name: "Mercurial LP Token (USDC-USDT-PAI)",
    mint: "9s6dXtMgV5E6v3rHqBF2LejHcA2GWoZb7xNUkgXgsBqt",
    decimals: 6,
    parrot: {
      displaySymbol: "MER LP",
      nameDetail: "USDC-USDT-PAI",
      displayDecimals: 2,
    },
  },
  "8wv2KAykQstNAj2oW6AHANGBiFKVFhvMiyyzzjhkmGvE": {
    symbol: "renLUNA",
    name: "renLUNA",
    mint: "8wv2KAykQstNAj2oW6AHANGBiFKVFhvMiyyzzjhkmGvE",
    decimals: 6,
  },
  MERt85fc5boKw3BW1eYdxonEuJNvXbiMbs6hvheau5K: {
    symbol: "MER",
    name: "Mercurial",
    mint: "MERt85fc5boKw3BW1eYdxonEuJNvXbiMbs6hvheau5K",
    decimals: 6,
  },
  PaiYwHYxr4SsEWox9YmyBNJmxVG7GdauirbBcYGB7cJ: {
    symbol: "SBR LP",
    name: "Saber LP Token (PAI-USDC)",
    mint: "PaiYwHYxr4SsEWox9YmyBNJmxVG7GdauirbBcYGB7cJ",
    decimals: 6,
    parrot: {
      displaySymbol: "SBR LP",
      nameDetail: "PAI-USDC",
      displayDecimals: 6,
    },
  },
  "4aEi4A91hRbERJVDYxRWbbSrBrsxoM1Hm33KRoRzWMht": {
    symbol: "Orca Aquafarm Token (ORCA/PAI)",
    name: "Orca Aquafarm Token (ORCA/PAI)",
    mint: "4aEi4A91hRbERJVDYxRWbbSrBrsxoM1Hm33KRoRzWMht",
    decimals: 6,
  },
  "8kWk6CuCAfaxhWQZvQva6qkB1DkWNHq9LRKKN6n9joUG": {
    symbol: "Orca Aquafarm Token (pSOL/USDC)",
    name: "Orca Aquafarm Token (pSOL/USDC)",
    mint: "8kWk6CuCAfaxhWQZvQva6qkB1DkWNHq9LRKKN6n9joUG",
    decimals: 6,
  },
};

export const tokenList = Object.keys(tokens).map((mint) => tokens[mint]);
