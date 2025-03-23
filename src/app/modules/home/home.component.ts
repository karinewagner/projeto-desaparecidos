import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { IContent } from '@services/missing-person.interface';
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
  pageSize: number = 10;
  pageIndex: number = 0;
  pageSizeOptions = [10, 20, 30];

  pageEvent!: PageEvent;

  ngOnInit() {
    this.getMissingPersonListAll({
      pagina: this.pageIndex,
      porPagina: this.pageSize,
    });
  }

  getMissingPersonListAll(params: {pagina: number, porPagina: number}) {
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
}
