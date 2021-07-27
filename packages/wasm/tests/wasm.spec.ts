import { u128bits_to_u64f64 } from '../lib';

// TODO: add more tests

async function parseU128ToNumber(str) {
  const x = u128bits_to_u64f64(str);
  console.log(str, ' -> ', x);
}

parseU128ToNumber('123');
parseU128ToNumber('123a');
