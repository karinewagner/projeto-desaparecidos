import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import {
  IContent,
  IMissingPersonList
} from '@services/missing-person.interface';
import { MissingPersonsService } from '@services/missing-persons.service';

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

  missingPersonListAll: IContent[] = [];

  length!: number;
  pageIndex: number = 0;
  pageSize: number = 10;
  pageSizeOptions = [10, 20, 30];

  pageEvent!: PageEvent;

  ngOnInit() {
    this.getMissingPersonListAll({
      pagina: this.pageIndex,
      porPagina: this.pageSize,
      status: 'DESAPARECIDO',
    });
  }

  getMissingPersonListAll(params: IMissingPersonList) {
    this.service.getMissingPersonListAll(params).subscribe(
      res => {
        this.missingPersonListAll = res.content;
        this.length = res.totalElements;
        this.pageIndex = res.pageable.pageNumber;
      }
    );
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.getMissingPersonListAll({
      pagina: e.pageIndex,
      porPagina: e.pageSize,
    });
  }

  receiveOutputFilters(
    filters: Partial<IMissingPersonList>) {
    this.getMissingPersonListAll({
      ...filters,
      pagina: 0,
      porPagina: this.pageSize,
    });
  }
}
