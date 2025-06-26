import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type {
  NetworkRoute,
  NetworkRouteResponse,
} from '../models/network-route.model';
import type { Observable } from 'rxjs';
import { map } from 'rxjs';
import { RouteSortService } from './route-sort.service';
import type { SortDirection, SortOrder } from '../../shared/types/sort.types';
import { MOCK_URL } from '../../shared/constants/common-constants';

@Injectable({
  providedIn: 'root',
})
export class NetworkRouteService {
  private mockUrl = MOCK_URL;
  private http = inject(HttpClient);
  private sortService = inject(RouteSortService);

  public getRoutes(
    order: SortOrder,
    direction: SortDirection,
    page: number,
    pageSize: number,
  ): Observable<NetworkRouteResponse> {
    return this.getDataSource().pipe(
      map((result) => {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const data = this.sortService.sortRoutes(result, order, direction);
        return { routes: data.slice(start, end), total: data.length };
      }),
    );
  }

  private getDataSource(): Observable<NetworkRoute[]> {
    return this.http.get<NetworkRoute[]>(this.mockUrl);
  }
}
