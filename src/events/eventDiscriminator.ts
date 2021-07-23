import crypto from 'crypto';

export function eventDiscriminator(name: string): Buffer {
  // return Buffer.from(sha256.digest(`event:${name}`)).slice(0, 8);
  return crypto
    .createHash('sha256')
    .update(`event:${name}`)
    .digest()
    .slice(0, 8);
}
