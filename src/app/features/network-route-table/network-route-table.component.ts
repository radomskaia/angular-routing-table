import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import type { NetworkRoute } from '../../core/models/network-route.model';
import { NetworkRouteService } from '../../core/services/network-route.service';
import type { SortDirection, SortOrder } from '../../core/types/sort.types';
import { NgClass, NgForOf } from '@angular/common';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ICON_PATH } from '../../shared/constants/buttons-constants';
import { BehaviorSubject, combineLatest, switchMap } from 'rxjs';
import { FormatTableStringPipe } from '../../core/pipes/format-table-string.pipe';

const DEFAULT_PAGE_SIZE = 20;
const DEFAULT_PAGE = 1;

@Component({
  imports: [NgForOf, ButtonComponent, NgClass, FormatTableStringPipe],
  selector: 'app-network-route-table',
  styleUrl: './network-route-table.component.scss',
  templateUrl: './network-route-table.component.html',
})
export class NetworkRouteTableComponent implements OnInit {
  public networkRoutes: NetworkRoute[] = [];
  private networkRouteService = inject(NetworkRouteService);
  public sortOrder = new BehaviorSubject<SortOrder>('address');
  public sortDirection = new BehaviorSubject<SortDirection>('asc');
  public pageSize = new BehaviorSubject<number>(DEFAULT_PAGE_SIZE);
  public page = new BehaviorSubject<number>(DEFAULT_PAGE);

  protected sortButton = {
    alt: 'Toggle ascending or descending directions',
    path: ICON_PATH.SORT,
  };

  protected readonly tableColumns: SortOrder[] = [
    'address',
    'gateway',
    'interface',
  ];

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
      .subscribe((data) => (this.networkRoutes = data));
  }

  protected onHeaderClick(key: SortOrder): void {
    if (this.sortOrder.value === key) {
      return;
    }
    this.sortOrder.next(key);
    this.sortDirection.next('asc');
  }

  protected toggleSortDirections(): void {
    this.sortDirection.next(
      this.sortDirection.value === 'desc' ? 'asc' : 'desc',
    );
  }
}
