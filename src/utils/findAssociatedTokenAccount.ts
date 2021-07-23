import { Provider, web3 } from '@project-serum/anchor';
import { getAssociatedTokenAddress } from '@project-serum/associated-token';

export async function findAssociatedTokenAccount(
  provider: Provider,
  owner: web3.PublicKey,
  tokenMint: web3.PublicKey
): Promise<web3.PublicKey | undefined> {
  const associatedAddress = await getAssociatedTokenAddress(owner, tokenMint);
  const associatedAccount = await provider.connection.getAccountInfo(
    associatedAddress
  );
  return associatedAccount ? associatedAddress : undefined;
}
