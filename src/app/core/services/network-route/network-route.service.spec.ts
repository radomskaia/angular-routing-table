// network-route.service.spec.ts
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { NetworkRouteService } from './network-route.service';
import type { NetworkRoute } from '../../models/network-route.model';
import {
  SORT_DIRECTION,
  SORT_ORDER,
} from '../../../shared/constants/sort-constants';
import type {
  SortDirection,
  SortOrder,
} from '../../../shared/types/sort.types';
import { RouteSortService } from '../route-sort/route-sort.service';
import { MOCK_URL } from '../../../shared/constants/common-constants';

describe('NetworkRouteService', () => {
  let service: NetworkRouteService;
  let httpMock: HttpTestingController;

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
      interface: 'eth1',
      mask: '255.0.0.0',
      uuid: '2',
    },
    {
      address: '172.16.0.0',
      gateway: '172.16.0.1',
      interface: 'eth2',
      mask: '255.240.0.0',
      uuid: '3',
    },
  ];

  class MockRouteSortService {
    public sortRoutes(
      routes: NetworkRoute[],
      order: SortOrder,
      direction: SortDirection,
    ): NetworkRoute[] {
      if (!order && !direction) {
        throw new Error('Invalid sort order');
      }
      return routes;
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        NetworkRouteService,
        { provide: RouteSortService, useClass: MockRouteSortService },
      ],
    });

    service = TestBed.inject(NetworkRouteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch, sort, and paginate routes correctly', () => {
    service
      .getRoutes(SORT_ORDER.ADDRESS, SORT_DIRECTION.ASC, 1, 2)
      .subscribe((result) => {
        expect(result.routes.length).toBe(2);
        expect(result.routes[0].address).toBe('192.168.1.0');
        expect(result.routes[1].address).toBe('10.0.0.0');
        expect(result.total).toBe(3);
      });

    const request = httpMock.expectOne(MOCK_URL);
    expect(request.request.method).toBe('GET');
    request.flush(mockRoutes);
  });

  it('should return empty array on empty input', () => {
    service
      .getRoutes(SORT_ORDER.ADDRESS, SORT_DIRECTION.ASC, 1, 10)
      .subscribe((result) => {
        expect(result.routes.length).toBe(0);
        expect(result.total).toBe(0);
      });

    const request = httpMock.expectOne(MOCK_URL);
    request.flush([]);
  });

  it('should handle second page correctly', () => {
    service
      .getRoutes(SORT_ORDER.ADDRESS, SORT_DIRECTION.ASC, 2, 2)
      .subscribe((result) => {
        expect(result.routes.length).toBe(1); // Only one item remains
        expect(result.routes[0].address).toBe('172.16.0.0');
        expect(result.total).toBe(3);
      });

    const request = httpMock.expectOne(MOCK_URL);
    request.flush(mockRoutes);
  });
});
