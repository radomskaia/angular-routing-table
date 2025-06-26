import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { NetworkRouteTableComponent } from './components/network-route-table/network-route-table.component';
import type { NetworkRoute } from '../../core/models/network-route.model';
import { NetworkRouteService } from '../../core/services/network-route.service';
import { BehaviorSubject, combineLatest, switchMap } from 'rxjs';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PAGE_SIZES } from '../../shared/constants/pagination-constants';
import type { SortDirection, SortOrder } from '../../shared/types/sort.types';

const DEFAULT_PAGE = 1;

@Component({
  imports: [NetworkRouteTableComponent, PaginationComponent],
  selector: 'app-network-routes',
  styleUrl: './network-routes.component.scss',
  templateUrl: './network-routes.component.html',
})
export class NetworkRoutesComponent implements OnInit {
  private networkRouteService = inject(NetworkRouteService);

  public networkRoutes: NetworkRoute[] = [];
  public totalRoutes = 1;
  public sortOrder = new BehaviorSubject<SortOrder>('address');
  public sortDirection = new BehaviorSubject<SortDirection>('asc');
  public pageSize = new BehaviorSubject<number>(PAGE_SIZES.SMALL);
  public page = new BehaviorSubject<number>(DEFAULT_PAGE);

  public ngOnInit(): void {
    combineLatest([
      this.sortOrder,
      this.sortDirection,
      this.page,
      this.pageSize,
    ])
      .pipe(
        switchMap(([order, direction, page, pageSize]) =>
          this.networkRouteService.getRoutes(order, direction, page, pageSize),
        ),
      )
      .subscribe((data) => {
        this.networkRoutes = data.routes;
        this.totalRoutes = data.total;
      });
  }

  protected handleSortOrderChange(key: SortOrder): void {
    this.sortOrder.next(key);
  }

  protected handleSortDirectionToggle(): void {
    const next = this.sortDirection.value === 'asc' ? 'desc' : 'asc';
    this.sortDirection.next(next);
  }

  protected handlePageChange(page: number): void {
    this.page.next(page);
  }

  protected handlePageSizeChange(pageSize: number): void {
    this.pageSize.next(pageSize);
  }
}
