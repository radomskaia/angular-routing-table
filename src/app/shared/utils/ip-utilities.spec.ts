import { getPrefixLength } from './ip-utilities';
import {
  BINARY_RADIX,
  BIT_0,
  BIT_1,
  BITS_PER_OCTET,
  MAX_OCTET_VALUE,
  MIN_OCTET_VALUE,
  OCTET_COUNT,
} from '../constants/ip-constants';

describe('IP Utilities', () => {
  describe('getPrefixLength', () => {
    it('should return correct prefix length for standard subnet masks', () => {
      expect(getPrefixLength('255.255.255.255')).toBe(32);
      expect(getPrefixLength('255.255.255.0')).toBe(24);
      expect(getPrefixLength('255.255.0.0')).toBe(16);
      expect(getPrefixLength('255.0.0.0')).toBe(8);
      expect(getPrefixLength('0.0.0.0')).toBe(0);
    });

    it('should return correct prefix length for non-standard subnet masks', () => {
      expect(getPrefixLength('255.255.255.252')).toBe(30);
      expect(getPrefixLength('255.255.255.248')).toBe(29);
      expect(getPrefixLength('255.255.255.240')).toBe(28);
      expect(getPrefixLength('255.255.255.224')).toBe(27);
      expect(getPrefixLength('255.255.255.192')).toBe(26);
      expect(getPrefixLength('255.255.255.128')).toBe(25);
      expect(getPrefixLength('255.255.240.0')).toBe(20);
      expect(getPrefixLength('255.128.0.0')).toBe(9);
    });

    it('should return 0 for invalid subnet masks', () => {
      expect(getPrefixLength('255.255.255')).toBe(0);
      expect(getPrefixLength('255.255.255.255.0')).toBe(0);

      expect(getPrefixLength('256.255.255.0')).toBe(0);
      expect(getPrefixLength('255.256.255.0')).toBe(0);
      expect(getPrefixLength('255.255.256.0')).toBe(0);
      expect(getPrefixLength('255.255.255.256')).toBe(0);

      expect(getPrefixLength('-1.255.255.0')).toBe(0);

      expect(getPrefixLength('abc.255.255.0')).toBe(0);
      expect(getPrefixLength('255.abc.255.0')).toBe(0);
      expect(getPrefixLength('255.255.abc.0')).toBe(0);
      expect(getPrefixLength('255.255.255.abc')).toBe(0);

      expect(getPrefixLength('')).toBe(0);
    });

    it('should return 0 for subnet masks with non-contiguous bits', () => {
      expect(getPrefixLength('255.255.254.1')).toBe(0);

      expect(getPrefixLength('255.254.255.0')).toBe(0);

      expect(getPrefixLength('255.0.255.0')).toBe(0);

      expect(getPrefixLength('254.255.255.0')).toBe(0);
    });

    it('should handle edge cases properly', () => {
      expect(getPrefixLength('0.0.0.0')).toBe(0);
      expect(getPrefixLength('255.255.255.254')).toBe(31);

      expect(getPrefixLength('128.0.0.0')).toBe(1);
      expect(getPrefixLength('192.0.0.0')).toBe(2);
      expect(getPrefixLength('224.0.0.0')).toBe(3);
      expect(getPrefixLength('240.0.0.0')).toBe(4);
      expect(getPrefixLength('248.0.0.0')).toBe(5);
      expect(getPrefixLength('252.0.0.0')).toBe(6);
      expect(getPrefixLength('254.0.0.0')).toBe(7);
    });

    it('should use IP constants correctly', () => {
      expect(OCTET_COUNT).toBe(4);
      expect(BITS_PER_OCTET).toBe(8);
      expect(MIN_OCTET_VALUE).toBe(0);
      expect(MAX_OCTET_VALUE).toBe(255);
      expect(BINARY_RADIX).toBe(2);
      expect(BIT_0).toBe('0');
      expect(BIT_1).toBe('1');

      const validMask = '255.255.0.0';
      const octets = validMask.split('.');
      expect(octets.length).toBe(OCTET_COUNT);

      for (const octet of octets) {
        const number_ = Number(octet);
        expect(
          number_ >= MIN_OCTET_VALUE && number_ <= MAX_OCTET_VALUE,
        ).toBeTrue();
      }
    });
  });
});
