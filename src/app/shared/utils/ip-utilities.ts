import {
  BINARY_RADIX,
  BIT_0,
  BIT_1,
  BITS_PER_OCTET,
  MAX_OCTET_VALUE,
  MIN_OCTET_VALUE,
  OCTET_COUNT,
} from '../constants/ip-constants';

export function getPrefixLength(mask: string): number {
  const octets = mask.split('.');

  if (octets.length !== OCTET_COUNT) {
    return 0;
  }

  let binary = '';
  for (const octet of octets) {
    const number_ = Number(octet);
    if (
      isNaN(number_) ||
      number_ < MIN_OCTET_VALUE ||
      number_ > MAX_OCTET_VALUE
    ) {
      return 0;
    }
    binary += number_.toString(BINARY_RADIX).padStart(BITS_PER_OCTET, BIT_0);
  }

  const firstZero = binary.indexOf(BIT_0);
  const lastOne = binary.lastIndexOf(BIT_1);

  if (firstZero !== -1 && lastOne > firstZero) {
    return 0;
  }

  return binary.split(BIT_1).length - 1;
}
