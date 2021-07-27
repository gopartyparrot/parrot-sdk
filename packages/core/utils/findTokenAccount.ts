import { Provider, web3 } from '@project-serum/anchor';
import { token } from '@project-serum/common';

export async function findTokenAccount(
  provider: Provider,
  owner: web3.PublicKey,
  tokenMint: web3.PublicKey
): Promise<web3.PublicKey | undefined> {
  const { value } = await provider.connection.getTokenAccountsByOwner(
    owner,
    { mint: tokenMint },
    'processed'
  );

  const tokenAccounts = value.map(i => ({
    ...i,
    data: token.parseTokenAccountData(i.account.data)
  }));

  tokenAccounts.sort((a, b) => b.data.amount - a.data.amount);

  return tokenAccounts.length ? tokenAccounts[0].pubkey : undefined;
}
