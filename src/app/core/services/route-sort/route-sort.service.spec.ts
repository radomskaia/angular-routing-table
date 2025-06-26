import { RouteSortService } from './route-sort.service';
import type { NetworkRoute } from '../../models/network-route.model';
import {
  SORT_ORDER,
  SORT_DIRECTION,
} from '../../../shared/constants/sort-constants';
import { TestBed } from '@angular/core/testing';

const mockRoutes: NetworkRoute[] = [
  {
    address: '192.168.1.0',
    gateway: '192.168.1.1',
    interface: 'eth0',
    mask: '255.255.255.0',
    uuid: '1',
  },
  {
    address: '10.0.0.0',
    gateway: '10.0.0.1',
    interface: 'eth2',
    mask: '255.0.0.0',
    uuid: '2',
  },
  {
    address: '172.16.0.0',
    gateway: '172.16.0.1',
    interface: 'vpn0',
    mask: '255.240.0.0',
    uuid: '3',
  },
  {
    address: 'invalid',
    gateway: '10.0.0.1',
    interface: 'eth3',
    mask: '255.0.0.0',
    uuid: '4',
  },
];

const routesWithSameAddress: NetworkRoute[] = [
  {
    address: '10.0.0.0',
    gateway: '10.0.0.1',
    interface: 'a',
    mask: '255.0.0.0',
    uuid: '1',
  },
  {
    address: '10.0.0.0',
    gateway: '10.0.0.2',
    interface: 'b',
    mask: '255.255.0.0',
    uuid: '2',
  },
];
let service: RouteSortService;

describe('RouteSortService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteSortService);
  });

  setupSortRoutesTests();
  setupIsValidIpTests();
  setupCompareIpTests();
});

const expectedSortResults = [
  ['10.0.0.0', '172.16.0.0', '192.168.1.0'],
  ['192.168.1.0', '172.16.0.0', '10.0.0.0'],
  ['10.0.0.1', '172.16.0.1', '192.168.1.1'],
  ['eth0', 'eth2', 'vpn0'],
];

function setupSortRoutesTests(): void {
  describe('sortRoutes()', () => {
    it('should sort by address ASC with mask prefix as tiebreaker', () => {
      const sorted = service.sortRoutes(
        mockRoutes,
        SORT_ORDER.ADDRESS,
        SORT_DIRECTION.ASC,
      );
      expect(sorted.map((r) => r.address)).toEqual(expectedSortResults[0]);
    });
    it('should sort by address DESC', () => {
      const sorted = service.sortRoutes(
        mockRoutes,
        SORT_ORDER.ADDRESS,
        SORT_DIRECTION.DESC,
      );
      expect(sorted.map((r) => r.address)).toEqual(expectedSortResults[1]);
    });
    it('should sort by gateway ASC', () => {
      const sorted = service.sortRoutes(
        mockRoutes,
        SORT_ORDER.GATEWAY,
        SORT_DIRECTION.ASC,
      );
      expect(sorted.map((r) => r.gateway)).toEqual(expectedSortResults[2]);
    });

    it('should sort by interface ASC', () => {
      const sorted = service.sortRoutes(
        mockRoutes,
        SORT_ORDER.INTERFACE,
        SORT_DIRECTION.ASC,
      );
      expect(sorted.map((r) => r.interface)).toEqual(expectedSortResults[3]);
    });
  });
}

const validCount = 3;
function setupIsValidIpTests(): void {
  describe('isValidIp()', () => {
    it('should exclude invalid IPs before sorting', () => {
      const filtered = service['filterValidRoutes'](mockRoutes);
      expect(filtered.length).toBe(validCount);
      expect(filtered.every((r) => r.address !== 'invalid')).toBeTrue();
    });
  });
}

function setupCompareIpTests(): void {
  describe('compareIp()', () => {
    it('should compare IPs numerically', () => {
      const result = service['compareIp']('192.168.1.1', '192.168.1.10');
      expect(result).toBeLessThan(0);
    });

    it('should sort by mask prefix when addresses are equal', () => {
      const sorted = service.sortRoutes(
        routesWithSameAddress,
        SORT_ORDER.ADDRESS,
        SORT_DIRECTION.DESC,
      );
      expect(sorted[0].mask).toBe('255.255.0.0');
    });
  });
}
