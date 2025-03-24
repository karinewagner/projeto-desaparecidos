import { Component, inject, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MissingPersonsService } from '@services/missing-persons.service';
import { IMoreInformation } from '@services/missing-person.interface';

@Component({
  selector: 'dialog-information-component',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialog-information.component.html',
})
export class DialogInformationComponent implements OnInit {
  private _fb = inject(FormBuilder);
  private service = inject(MissingPersonsService);
  readonly dialogData = inject(MAT_DIALOG_DATA);

  formInfo!: FormGroup;

  ngOnInit() {
    this.formInfo = this._fb.group({
      ocoId: [0],
      informacao: [''],
      data: [''],
      id: [0],
      anexos: []
    });
  };

  createFormInformation(){
    this.service.postMoreInformation(this.formInfo.value).subscribe();
  }
}
