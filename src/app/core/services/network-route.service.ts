import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { SortDirection, SortOrder } from '../types/sort.types';
import type { NetworkRoute } from '../models/network-route.model';
import type { Observable } from 'rxjs';
import { map } from 'rxjs';
import { RouteSortService } from './route-sort.service';

@Injectable({
  providedIn: 'root',
})
export class NetworkRouteService {
  private mockUrl = 'mock-routes.json';
  private http = inject(HttpClient);
  private sortService = inject(RouteSortService);

  public getRoutes(
    order: SortOrder,
    direction: SortDirection,
    page: number,
    pageSize: number,
  ): Observable<NetworkRoute[]> {
    return this.getDataSource().pipe(
      map((result) => {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        return this.sortService
          .sortRoutes(result, order, direction)
          .slice(start, end);
      }),
    );
  }

  private getDataSource(): Observable<NetworkRoute[]> {
    return this.http.get<NetworkRoute[]>(this.mockUrl);
  }
}
