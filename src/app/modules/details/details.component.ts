import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IMissingPersonByIdResponse,
  IMissingPersonList
} from '@services/missing-person.interface';
import { MissingPersonsService } from '@services/missing-persons.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'details-component',
  imports: [JsonPipe],
  templateUrl: './details.component.html',
})

export class DetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(MissingPersonsService);

  personId: string = '';
  missingPersonDetails!: IMissingPersonByIdResponse;

  ngOnInit() {
    this.personId = this.route.snapshot.params['id'];
    this.getMissingPersonDetailsById(this.personId);
  }

  getMissingPersonDetailsById(id: string) {
    this.service.getMissingPersonDetailsById(id).subscribe(
      res => {
        this.missingPersonDetails = res;
      }
    );
  }
}
