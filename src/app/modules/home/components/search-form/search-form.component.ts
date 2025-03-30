import {
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { HomeService } from '@modules/home/home.service';
import { IMissingPersonList } from '@modules/home/home.interface';

@Component({
  selector: 'search-form-component',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatIconModule,
  ],
  templateUrl: './search-form.component.html',
})
export class SearchFormComponent implements OnInit, OnDestroy {
  private _fb = inject(FormBuilder);
  private service = inject(HomeService);

  @Output() outputFilters = new EventEmitter<any>();

  form!: FormGroup;

  cacheSubscription!: Subscription;

  ngOnInit() {
    this.cacheSubscription = this.service.cacheSearch$.subscribe(
      res => this.createForm(res)
    );
  }

  createForm(initialValues: Partial<IMissingPersonList>) {
    this.form = this._fb.group({
      nome: [initialValues.nome || ''],
      faixaIdadeInicial: [initialValues.faixaIdadeInicial || 0],
      faixaIdadeFinal: [initialValues.faixaIdadeFinal || 0],
      sexo: [initialValues.sexo || ''],
      status: [initialValues.status || 'DESAPARECIDO']
    });
  }

  clearFilter() {
    const resetedValue: IMissingPersonList = {
      nome: '',
      faixaIdadeInicial: 0,
      faixaIdadeFinal: 0,
      sexo: '',
      status: 'DESAPARECIDO',
      pagina: 0,
      porPagina: 10,
    }

    this.service.cacheSearch$ = resetedValue

    this.outputFilters.emit(resetedValue);
  }

  sendOutputFilters() {
    this.service.cacheSearch$ = {
      ...this.service.cacheSearch,
      ...this.form.value,
    }

    this.outputFilters.emit(this.form.value);
  }

  ngOnDestroy() {
    this.cacheSubscription.unsubscribe();
  }
}
