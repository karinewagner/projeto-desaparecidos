import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { HomeService } from '@modules/home/home.service';
import { IContent, IMissingPersonList } from '@modules/home/home.interface';

import { CardComponent } from '@modules/home/components/card/card.component';
import {
  SearchFormComponent
} from '@modules/home/components/search-form/search-form.component';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'home-component',
  imports: [
    MatCardModule,
    MatPaginatorModule,
    CardComponent,
    SearchFormComponent,
  ],
  templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit, OnDestroy {
  private service = inject(HomeService);
  private toast = inject(ToastrService);

  missingPersonList: IContent[] = [];

  length!: number;
  pageIndex: number = 0;
  pageSize: number = 10;
  pageSizeOptions = [10, 20, 30];

  pageEvent!: PageEvent;

  cacheSubscription!: Subscription;

  ngOnInit() {
    this.cacheSubscription = this.service.cacheSearch$.subscribe(
      res => this.getMissingPersonList(res)
    )
  }

  getMissingPersonList(params: IMissingPersonList) {
    this.service.getMissingPersonList(params).subscribe({
      next: res => {
        this.missingPersonList = res.content;
        this.length = res.totalElements;
        this.pageIndex = res.pageable.pageNumber;
      },
      error: err =>
        this.toast.error('Erro ao buscar dados: ' + err.message),
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;

    this.service.cacheSearch$ = {
      ...this.service.cacheSearch,
      pagina: e.pageIndex,
      porPagina: e.pageSize,
    };

    this.getMissingPersonList(this.service.cacheSearch);
  }

  receiveOutputFilters(
    filters: Partial<IMissingPersonList>) {
    this.getMissingPersonList({
      ...filters,
      pagina: 0,
      porPagina: this.pageSize,
    });
  }

  ngOnDestroy() {
    this.cacheSubscription.unsubscribe();
  }
}
