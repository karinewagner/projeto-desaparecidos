import { Component, inject, OnInit } from '@angular/core';
import { MissingPersonsService } from '@services/missing-persons.service';

import { IContent } from '@services/missing-person.interface';

import { MatCardModule } from '@angular/material/card';
import { CardComponent } from '@modules/home/components/card/card.component';
import {
  SearchFormComponent
} from '@modules/home/components/search-form/search-form.component';

@Component({
  selector: 'home-component',
  imports: [MatCardModule, CardComponent, SearchFormComponent],
  templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit {
  private service = inject(MissingPersonsService);

  missingPersonListAll: IContent[] = [];

  ngOnInit() {
    this.service.getMissingPersonListAll().subscribe(
      res => {
        this.missingPersonListAll = res.content;
      }
    );
  }
}
