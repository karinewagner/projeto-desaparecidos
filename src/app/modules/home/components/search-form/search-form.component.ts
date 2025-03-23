import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { JsonPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'search-form-component',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatIconModule,
    JsonPipe
  ],
  templateUrl: './search-form.component.html',
})
export class SearchFormComponent implements OnInit {
  private _fb = inject(FormBuilder);

  form!: FormGroup;

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.form = this._fb.group({
      nome: [''],
      faixaIdadeInicial: [0],
      faixaIdadeFinal: [0],
      sexo: [''],
      status: ['']
    })
  }
}
