import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductGridComponent } from '../product-grid/product-grid.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  imports: [
    CommonModule
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() currentPage = 1
  @Input() totalPages = 1
  @Output() pageChange = new EventEmitter<number>()

  getVisiblePages(): (number | string)[] {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (this.totalPages <= maxVisible) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (this.currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(this.totalPages)
      } else if (this.currentPage >= this.totalPages - 2) {
        pages.push(1)
        pages.push("...")
        for (let i = this.totalPages - 3; i <= this.totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push("...")
        for (let i = this.currentPage - 1; i <= this.currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(this.totalPages)
      }
    }

    return pages
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page)
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1)
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1)
    }
  }

  trackByPage(index: number, page: number | string): number | string {
    return page
  }
}
