import { EventEmitter, Input, Output } from '@angular/core';
import { Component } from '@angular/core';
import { NgClass, NgForOf } from '@angular/common';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import type { NetworkRoute } from '../../../../core/models/network-route.model';
import { ICON_PATH } from '../../../../shared/constants/buttons-constants';
import type {
  SortDirection,
  SortOrder,
} from '../../../../shared/types/sort.types';
import { FormatTableStringPipe } from '../../../../shared/pipes/format-table-string.pipe';

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

  protected sortButton = {
    alt: 'Toggle ascending or descending directions',
    path: ICON_PATH.SORT,
  };

  protected readonly tableColumns: SortOrder[] = [
    'address',
    'gateway',
    'interface',
  ];

  protected onHeaderClick(key: SortOrder): void {
    if (this.sortOrder === key) {
      return;
    }
    this.sortOrderChange.emit(key);
  }

  protected onToggleSort(): void {
    this.toggleDirection.emit();
  }
}
