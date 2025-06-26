import { EventEmitter, Input, Output } from '@angular/core';
import { Component } from '@angular/core';
import { NgClass, NgForOf } from '@angular/common';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import type { NetworkRoute } from '../../../../core/models/network-route.model';
import {
  BUTTON_TEXT,
  ICON_PATH,
} from '../../../../shared/constants/buttons-constants';
import type {
  SortDirection,
  SortOrder,
} from '../../../../shared/types/sort.types';
import { FormatTableStringPipe } from '../../../../shared/pipes/format-table-string.pipe';
import {
  SORT_DIRECTION,
  SORT_ORDER,
} from '../../../../shared/constants/sort-constants';

@Component({
  imports: [NgForOf, ButtonComponent, NgClass, FormatTableStringPipe],
  selector: 'app-network-route-table',
  styleUrl: './network-route-table.component.scss',
  templateUrl: './network-route-table.component.html',
})
export class NetworkRouteTableComponent {
  @Input() public networkRoutes: NetworkRoute[] = [];
  @Input() public sortOrder!: SortOrder;
  @Input() public sortDirection!: SortDirection;

  @Output() public sortOrderChange = new EventEmitter<SortOrder>();
  @Output() public toggleDirection = new EventEmitter<void>();

  protected ascDirection = SORT_DIRECTION.ASC;

  protected sortButton = {
    alt: BUTTON_TEXT.SORT,
    path: ICON_PATH.SORT,
  };

  protected readonly tableColumns: SortOrder[] = [
    SORT_ORDER.ADDRESS,
    SORT_ORDER.GATEWAY,
    SORT_ORDER.INTERFACE,
  ];

  protected onHeaderClick(key: SortOrder): void {
    if (this.sortOrder === key) {
      this.onToggleSort();
      return;
    }
    if (this.sortDirection !== SORT_DIRECTION.ASC) {
      this.onToggleSort();
    }
    this.sortOrderChange.emit(key);
  }

  protected onToggleSort(): void {
    this.toggleDirection.emit();
  }
}
