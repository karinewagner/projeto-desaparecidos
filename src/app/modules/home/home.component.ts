import { Component, inject, OnInit } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import {
  IContent,
  IMissingPersonList
} from '@modules/services/missing-person.interface';
import { MissingPersonsService } from '@modules/services/missing-persons.service';

import { CardComponent } from '@modules/home/components/card/card.component';
import {
  SearchFormComponent
} from '@modules/home/components/search-form/search-form.component';

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

export class HomeComponent implements OnInit {
  private service = inject(MissingPersonsService);

  missingPersonList: IContent[] = [];

  length!: number;
  pageIndex: number = 0;
  pageSize: number = 10;
  pageSizeOptions = [10, 20, 30];

  pageEvent!: PageEvent;

  ngOnInit() {
    this.getMissingPersonList({
      pagina: this.pageIndex,
      porPagina: this.pageSize,
      status: 'DESAPARECIDO',
    });
  }

  getMissingPersonList(params: IMissingPersonList) {
    this.service.getMissingPersonList(params).subscribe(
      res => {
        this.missingPersonList = res.content;
        this.length = res.totalElements;
        this.pageIndex = res.pageable.pageNumber;
      }
    );
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.getMissingPersonList({
      pagina: e.pageIndex,
      porPagina: e.pageSize,
    });
  }

  receiveOutputFilters(
    filters: Partial<IMissingPersonList>) {
    this.getMissingPersonList({
      ...filters,
      pagina: 0,
      porPagina: this.pageSize,
    });
  }
}
