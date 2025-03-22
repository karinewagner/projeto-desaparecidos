import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MissingPersonsService } from './services/missing-persons.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private service = inject(MissingPersonsService)

  list: any;

  ngOnInit() {
    this.service.getMissingPersonList().subscribe(
      res => {
        this.list = res;
      }
    )
  }
}
