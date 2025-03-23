import { Component, inject, OnInit } from '@angular/core';
import { MissingPersonsService } from '../../services/missing-persons.service';

import { IContent } from '../../services/missing-person.interface';

import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'home-component',
  imports: [MatCardModule, MatButton],
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
