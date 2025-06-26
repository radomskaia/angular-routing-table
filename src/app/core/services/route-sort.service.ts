import { Injectable } from '@angular/core';
import type { NetworkRoute } from '../models/network-route.model';
import type { SortDirection, SortOrder } from '../types/sort.types';
import { getPrefixLength } from '../../shared/utils/ip-utilities';
import {
  BITS_PER_BYTE,
  MAX_OCTET_VALUE,
  MIN_OCTET_VALUE,
  OCTET_COUNT,
} from '../../shared/constants/ip-constants';

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
    return (
      ip
        .split('.')
        .reduce(
          (accumulator, octet) => (accumulator << BITS_PER_BYTE) + +octet,
          0,
        ) >>> 0
    );
  }

  private comparePrefixMask(maskA: string, maskB: string): number {
    const lengthA = getPrefixLength(maskA);
    const lengthB = getPrefixLength(maskB);

    return lengthA - lengthB;
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
