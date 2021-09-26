export interface IToken {
  id: string;
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  priceOracleInUSD: string;
  parrot: {
    displaySymbol: string;
    nameDetail?: string;
    displayDecimals: number;
  };
}

export const tokens: Record<string, IToken> = {
  Ea5SjE2Y6yvCeW5dYTn7PYMuW5ikXkvbGdcmSnXeaLjS: {
    id: "pai",
    symbol: "PAI",
    name: "Parrot Stable",
    decimals: 6,
    address: "Ea5SjE2Y6yvCeW5dYTn7PYMuW5ikXkvbGdcmSnXeaLjS",
    priceOracleInUSD: "STABLEQRACLE1111111111111111111111111111111",
    parrot: {
      displaySymbol: "PAI",
      displayDecimals: 2,
    },
  },
  EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: {
    id: "usdc",
    symbol: "USDC",
    name: "USD Coin",
    decimals: 6,
    address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    priceOracleInUSD: "STABLEQRACLE1111111111111111111111111111111",
    parrot: {
      displaySymbol: "USDC",
      displayDecimals: 2,
    },
  },
  Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB: {
    id: "usdt",
    symbol: "USDT",
    name: "USD Tether",
    decimals: 6,
    address: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    priceOracleInUSD: "STABLEQRACLE1111111111111111111111111111111",
    parrot: {
      displaySymbol: "USDT",
      displayDecimals: 2,
    },
  },
  So11111111111111111111111111111111111111111: {
    id: "sol",
    symbol: "SOL",
    name: "Solana",
    decimals: 9,
    address: "So11111111111111111111111111111111111111111",
    priceOracleInUSD: "6C8dCcYDd7ykNT2EFU6drGAhJhoGqbEBU5kNowHox34p",
    parrot: {
      displaySymbol: "SOL",
      displayDecimals: 4,
    },
  },
  So11111111111111111111111111111111111111112: {
    id: "wsol",
    symbol: "wSOL",
    name: "Solana",
    decimals: 9,
    address: "So11111111111111111111111111111111111111112",
    priceOracleInUSD: "6C8dCcYDd7ykNT2EFU6drGAhJhoGqbEBU5kNowHox34p",
    parrot: {
      displaySymbol: "SOL",
      displayDecimals: 4,
    },
  },
  DYDWu4hE4MN3aH897xQ3sRTs5EAjJDmQsKLNhbpUiKun: {
    id: "pbtc",
    symbol: "pBTC",
    name: "Parrot BTC",
    decimals: 8,
    address: "DYDWu4hE4MN3aH897xQ3sRTs5EAjJDmQsKLNhbpUiKun",
    priceOracleInUSD: "5XHsK3Jmj8LfkvWaWEPNb7Mm4UguodREtixrc9F65FRK",
    parrot: {
      displaySymbol: "pBTC",
      displayDecimals: 8,
    },
  },
  SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt: {
    id: "srm",
    symbol: "SRM",
    name: "Serum",
    decimals: 6,
    address: "SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt",
    priceOracleInUSD: "GwbKzS7V9bpk2vx7o2g35vU9a2yawsWPc5hq317MHF7z",
    parrot: {
      displaySymbol: "SRM",
      displayDecimals: 4,
    },
  },
  CDJWUqTcYTVAKXAVXoQZFes5JUFc7owSeq7eMQcDSbo5: {
    id: "renbtc",
    symbol: "renBTC",
    name: "renBTC",
    decimals: 8,
    address: "CDJWUqTcYTVAKXAVXoQZFes5JUFc7owSeq7eMQcDSbo5",
    priceOracleInUSD: "5XHsK3Jmj8LfkvWaWEPNb7Mm4UguodREtixrc9F65FRK",
    parrot: {
      displaySymbol: "renBTC",
      displayDecimals: 8,
    },
  },
  "57h4LEnBooHrKbacYWGCFghmrTzYPVn8PwZkzTzRLvHa": {
    id: "mercuriallptokenusdcusdtustearn",
    symbol: "MER LP",
    name: "Mercurial LP Token (USDC-USDT-UST) + yield strategy",
    address: "57h4LEnBooHrKbacYWGCFghmrTzYPVn8PwZkzTzRLvHa",
    decimals: 9,
    priceOracleInUSD: "STABLEQRACLE1111111111111111111111111111111",
    parrot: {
      displaySymbol: "MER LP+Earn",
      nameDetail: "USDC-USDT-UST",
      displayDecimals: 2,
    },
  },
  "2poo1w1DL6yd2WNTCnNTzDqkC6MBXq7axo77P16yrBuf": {
    id: "saberlptokenusdcusdtearn",
    symbol: "SBR LP",
    name: "Saber LP Token (USDC-USDT) + yield strategy ",
    address: "2poo1w1DL6yd2WNTCnNTzDqkC6MBXq7axo77P16yrBuf",
    decimals: 6,
    priceOracleInUSD: "STABLEQRACLE1111111111111111111111111111111",
    parrot: {
      displaySymbol: "SBR LP+Earn",
      nameDetail: "USDC-USDT",
      displayDecimals: 2,
    },
  },
  UST32f2JtPGocLzsL41B3VBBoJzTm1mK1j3rwyM3Wgc: {
    id: "saberlptokenustusdcearn",
    symbol: "SBR LP",
    name: "Saber LP Token (UST-USDC) + yield strategy ",
    address: "UST32f2JtPGocLzsL41B3VBBoJzTm1mK1j3rwyM3Wgc",
    decimals: 9,
    priceOracleInUSD: "STABLEQRACLE1111111111111111111111111111111",
    parrot: {
      displaySymbol: "SBR LP+Earn",
      nameDetail: "UST-USDC",
      displayDecimals: 2,
    },
  },
  SoLEao8wTzSfqhuou8rcYsVoLjthVmiXuEjzdNPMnCz: {
    id: "saberlptokenmsolsolearn",
    symbol: "SBR LP",
    name: "Saber LP Token (mSOL-SOL) + yield strategy ",
    address: "SoLEao8wTzSfqhuou8rcYsVoLjthVmiXuEjzdNPMnCz",
    decimals: 9,
    priceOracleInUSD: "6C8dCcYDd7ykNT2EFU6drGAhJhoGqbEBU5kNowHox34p",
    parrot: {
      displaySymbol: "SBR LP+Earn",
      nameDetail: "mSOL-SOL",
      displayDecimals: 4,
    },
  },
  "9EaLkQrbjmbbuZG9Wdpo8qfNUEjHATJFSycEmw6f1rGX": {
    id: "psol",
    symbol: "pSOL",
    name: "Parrot Staked SOL",
    decimals: 9,
    address: "9EaLkQrbjmbbuZG9Wdpo8qfNUEjHATJFSycEmw6f1rGX",
    priceOracleInUSD: "6C8dCcYDd7ykNT2EFU6drGAhJhoGqbEBU5kNowHox34p",
    parrot: {
      displaySymbol: "pSOL",
      displayDecimals: 2,
    },
  },
  mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So: {
    id: "msol",
    symbol: "mSOL",
    name: "Marinade staked SOL",
    address: "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
    decimals: 9,
    priceOracleInUSD: "6C8dCcYDd7ykNT2EFU6drGAhJhoGqbEBU5kNowHox34p",
    parrot: {
      displaySymbol: "mSOL",
      displayDecimals: 4,
    },
  },
  "8HoQnePLqPj4M7PUDzfw8e3Ymdwgc7NLGnaTUapubyvu": {
    id: "raydiumlptokensolusdc",
    symbol: "RAY LP",
    name: "Raydium LP Token (SOL-USDC)",
    address: "8HoQnePLqPj4M7PUDzfw8e3Ymdwgc7NLGnaTUapubyvu",
    decimals: 9,
    priceOracleInUSD: "Bebd9BVRZKqJEMtZXVggiVZY6BDFdqW9WP9wzNMje3L",
    parrot: {
      displaySymbol: "RAY LP",
      nameDetail: "SOL-USDC",
      displayDecimals: 4,
    },
  },
  "3H9NxvaZoxMZZDZcbBDdWMKbrfNj7PCF5sbRwDr7SdDW": {
    id: "raydiumlptokenmerusdcearn",
    symbol: "RAY LP",
    name: "Raydium LP Token (MER-USDC) + yield strategy",
    address: "3H9NxvaZoxMZZDZcbBDdWMKbrfNj7PCF5sbRwDr7SdDW",
    decimals: 6,
    priceOracleInUSD: "72qcEpuDzAEytUeHy9YePmV5Nbf3aNSXCKw9u7XPS1NE",
    parrot: {
      displaySymbol: "RAY LP+Earn",
      nameDetail: "MER-USDC",
      displayDecimals: 2,
    },
  },
  "9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E": {
    id: "btc",
    symbol: "BTC",
    name: "Wrapped Bitcoin (Sollet)",
    decimals: 6,
    address: "9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E",
    priceOracleInUSD: "5XHsK3Jmj8LfkvWaWEPNb7Mm4UguodREtixrc9F65FRK",
    parrot: {
      displaySymbol: "BTC",
      displayDecimals: 6,
    },
  },
  SLPbsNrLHv8xG4cTc4R5Ci8kB9wUPs6yn6f7cKosoxs: {
    id: "saberlptokenbtcrenbtcearn",
    symbol: "SBR LP",
    name: "Saber LP Token (BTC-renBTC) + yield strategy",
    address: "SLPbsNrLHv8xG4cTc4R5Ci8kB9wUPs6yn6f7cKosoxs",
    decimals: 8,
    priceOracleInUSD: "5XHsK3Jmj8LfkvWaWEPNb7Mm4UguodREtixrc9F65FRK",
    parrot: {
      displaySymbol: "SBR LP+Earn",
      nameDetail: "BTC-renBTC",
      displayDecimals: 8,
    },
  },
  BdZPG9xWrG3uFrx2KrUW1jT4tZ9VKPDWknYihzoPRJS3: {
    id: "prtsol",
    symbol: "prtSOL",
    name: "Parrot Staked SOL",
    address: "BdZPG9xWrG3uFrx2KrUW1jT4tZ9VKPDWknYihzoPRJS3",
    decimals: 9,
    priceOracleInUSD: "6C8dCcYDd7ykNT2EFU6drGAhJhoGqbEBU5kNowHox34p",
    parrot: {
      displaySymbol: "prtSOL",
      displayDecimals: 4,
    },
  },
  PrsVdKtXDDf6kJQu5Ff6YqmjfE4TZXtBgHM4bjuvRnR: {
    id: "saberlptokenprtsolsolearn",
    symbol: "SBR LP",
    name: "Saber LP Token (prtSOL-SOL) + yield strategy",
    address: "PrsVdKtXDDf6kJQu5Ff6YqmjfE4TZXtBgHM4bjuvRnR",
    decimals: 9,
    priceOracleInUSD: "6C8dCcYDd7ykNT2EFU6drGAhJhoGqbEBU5kNowHox34p",
    parrot: {
      displaySymbol: "SBR LP+Earn",
      nameDetail: "prtSOL-SOL",
      displayDecimals: 2,
    },
  },
  GHhDU9Y7HM37v6cQyaie1A3aZdfpCDp6ScJ5zZn2c3uk: {
    id: "mercuriallptokensolpsolearn",
    symbol: "MER LP",
    name: "Mercurial LP Token (SOL-pSOL) + yield strategy",
    address: "GHhDU9Y7HM37v6cQyaie1A3aZdfpCDp6ScJ5zZn2c3uk",
    decimals: 9,
    priceOracleInUSD: "6C8dCcYDd7ykNT2EFU6drGAhJhoGqbEBU5kNowHox34p",
    parrot: {
      displaySymbol: "MER LP+Earn",
      nameDetail: "SOL-pSOL",
      displayDecimals: 2,
    },
  },
  "9s6dXtMgV5E6v3rHqBF2LejHcA2GWoZb7xNUkgXgsBqt": {
    id: "mercuriallptokenusdcusdtpai",
    symbol: "MER LP",
    name: "Mercurial LP Token (USDC-USDT-PAI)",
    address: "9s6dXtMgV5E6v3rHqBF2LejHcA2GWoZb7xNUkgXgsBqt",
    decimals: 6,
    priceOracleInUSD: "STABLEQRACLE1111111111111111111111111111111",
    parrot: {
      displaySymbol: "MER LP",
      nameDetail: "USDC-USDT-PAI",
      displayDecimals: 2,
    },
  },
};
