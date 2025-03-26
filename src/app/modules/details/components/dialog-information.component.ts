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
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'dialog-information-component',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCardModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialog-information.component.html',
})
export class DialogInformationComponent implements OnInit {
  private _fb = inject(FormBuilder);
  private service = inject(MissingPersonsService);
  readonly dialogData = inject(MAT_DIALOG_DATA);

  formInfo!: FormGroup;

  selectedFiles: File[] = [];

  ngOnInit() {
    this.formInfo = this._fb.group({
      ocoId: [this.dialogData.ultimaOcorrencia.ocoId],
      informacao: [''],
      data: [''],
      id: [this.dialogData.id],
    });
  };

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFiles = Array.from(input.files);
    }
  }

  sendFormInformation(){
    const date = new Date(this.formInfo.value.data);
    const formattedDate = date.toISOString().split('T')[0];

    const formInfo = {
      ...this.formInfo.value,
      data: formattedDate,
    };

    this.service.postMoreInformation(formInfo, this.selectedFiles)
      .subscribe({
        next: res => {console.log(res)},
        error: err => {console.log(err)}
      });
  }
}
