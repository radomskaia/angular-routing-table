import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import {
  BUTTON_TEXT,
  ICON_PATH,
} from '../../../../shared/constants/buttons-constants';
import { NgForOf } from '@angular/common';
import { PAGE_SIZES } from '../../../../shared/constants/pagination-constants';

type PageSizes = (typeof PAGE_SIZES)[keyof typeof PAGE_SIZES];

@Component({
  imports: [ButtonComponent, NgForOf],
  selector: 'app-pagination',
  styleUrl: './pagination.component.scss',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  protected firstPage = 1;
  public totalPages = this.firstPage;
  public _totalRoutes = this.firstPage;
  @Input() public currentPage = this.firstPage;
  @Input() public pageSize!: number;

  @Input()
  public set totalRoutes(value: number) {
    this._totalRoutes = value;
    this.updateTotalPages();
  }

  @Output() public pageChange = new EventEmitter<number>();
  @Output() public pageSizeChange = new EventEmitter<number>();

  protected pageSizes: PageSizes[] = [
    PAGE_SIZES.SMALL,
    PAGE_SIZES.MEDIUM,
    PAGE_SIZES.LARGE,
    PAGE_SIZES.ALL,
  ];

  protected buttonConfig = {
    firstPage: {
      alt: BUTTON_TEXT.FIRST,
      path: ICON_PATH.FIRST,
    },
    lastPage: {
      alt: BUTTON_TEXT.LAST,
      path: ICON_PATH.LAST,
    },
    nextPage: {
      alt: BUTTON_TEXT.NEXT,
      path: ICON_PATH.NEXT,
    },
    prevPage: {
      alt: BUTTON_TEXT.PREVIOUS,
      path: ICON_PATH.PREVIOUS,
    },
  };

  public onFirstPageClick(): void {
    if (this.currentPage === this.firstPage) {
      return;
    }

    this.pageChange.emit(this.firstPage);
  }

  public onLastPageClick(): void {
    if (this.currentPage === this.totalPages) {
      return;
    }
    this.pageChange.emit(this.totalPages);
  }

  public onPrevPageClick(): void {
    this.pageChange.emit(this.currentPage - 1);
  }

  public onNextPageClick(): void {
    this.pageChange.emit(this.currentPage + 1);
  }

  public onPageSizeChange(event: Event): void {
    if (!event.target || !(event.target instanceof HTMLSelectElement)) {
      return;
    }
    const size = event.target.value;
    if (size === PAGE_SIZES.ALL) {
      this.pageSize = this._totalRoutes;
    } else {
      this.pageSize = +size;
    }

    this.updateTotalPages();
    this.pageSizeChange.emit(this.pageSize);
  }

  protected getOptionValue(): PageSizes {
    const currantValue = this.pageSizes.find((size) => size === this.pageSize);
    return currantValue ? currantValue : PAGE_SIZES.ALL;
  }

  private updateTotalPages(): void {
    this.totalPages = Math.ceil(this._totalRoutes / this.pageSize);
    if (this.currentPage > this.totalPages) {
      this.pageChange.emit(this.totalPages);
    }
  }
}
