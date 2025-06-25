import { Injectable } from '@angular/core';
import type { NetworkRoute } from '../models/network-route.model';
import type { SortDirection, SortOrder } from '../types/sort.types';

export const BITS_PER_BYTE = 8;
export const BITS_PER_OCTET = 8;
export const OCTET_COUNT = 4;
export const MAX_OCTET_VALUE = 255;
export const MIN_OCTET_VALUE = 0;
export const BINARY_RADIX = 2;
export const BIT_0 = '0';
export const BIT_1 = '1';

@Injectable({
  providedIn: 'root',
})
export class RouteSortService {
  public sortRoutes(
    routes: NetworkRoute[],
    key: SortOrder,
    direction: SortDirection,
  ): NetworkRoute[] {
    const factor = direction === 'asc' ? 1 : -1;
    return this.filterValidRoutes(routes).sort(
      (a, b) => this.compare(a, b, key) * factor,
    );
  }

  private compare(a: NetworkRoute, b: NetworkRoute, key: SortOrder): number {
    if (key === 'address') {
      return this.compareIpThenMask(a, b);
    }

    if (key === 'gateway') {
      return this.compareIp(a.gateway, b.gateway);
    }

    if (key === 'interface') {
      return a.interface.localeCompare(b.interface);
    }

    return 0;
  }

  private compareIp(ipA: string, ipB: string): number {
    const bytesA = this.ipToNumber(ipA);
    const bytesB = this.ipToNumber(ipB);

    return bytesA - bytesB;
  }

  private compareIpThenMask(a: NetworkRoute, b: NetworkRoute): number {
    const result = this.compareIp(a.address, b.address);
    return result !== 0 ? result : this.comparePrefixMask(a.mask, b.mask);
  }

  private ipToNumber(ip: string): number {
    return ip
      .split('.')
      .reduce(
        (accumulator, octet) => (accumulator << BITS_PER_BYTE) + +octet,
        0,
      );
  }

  private comparePrefixMask(maskA: string, maskB: string): number {
    const lengthA = this.getPrefixLength(maskA);
    const lengthB = this.getPrefixLength(maskB);

    return lengthA - lengthB;
  }

  private getPrefixLength(mask: string): number {
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

  private filterValidRoutes(routes: NetworkRoute[]): NetworkRoute[] {
    return routes.filter((route) => {
      return this.isValidIp(route.address) && this.isValidIp(route.gateway);
    });
  }

  private isValidIp(ip: string): boolean {
    const octets = ip.split('.');
    return (
      octets.length === OCTET_COUNT &&
      octets.every((octet) => {
        const n = Number(octet);
        return !isNaN(n) && n >= MIN_OCTET_VALUE && n <= MAX_OCTET_VALUE;
      })
    );
  }
}
