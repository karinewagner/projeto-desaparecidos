import { Component, inject, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import { provideNativeDateAdapter } from '@angular/material/core';

import { DetailsService } from '@modules/details/details.service';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';

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
    MatListModule,
    MatIconModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialog-information.component.html',
})
export class DialogInformationComponent implements OnInit {
  private _fb = inject(FormBuilder);
  private toast = inject(ToastrService);
  private service = inject(DetailsService);
  readonly dialogData = inject(MAT_DIALOG_DATA);

  isLoading: boolean = false;

  formInfo!: FormGroup;
  selectedFiles: File[] = [];

  ngOnInit() {
    this.formInfo = this._fb.group({
      ocoId: [this.dialogData.ultimaOcorrencia.ocoId],
      informacao: ['', Validators.required],
      data: ['', Validators.required],
      descricao: [`Foto de ${this.dialogData.nome}`],
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFiles = [...this.selectedFiles, ...input.files];
    }
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }

  sendFormInformation() {
    if (this.formInfo.invalid) {

      this.toast.warning('Por gentileza, preeencha todos os campos obrigatórios.');
      return;
    }

    const date = new Date(this.formInfo.value.data);
    const formattedDate = date.toISOString().split('T')[0];

    const formInfo = {
      ...this.formInfo.value,
      data: formattedDate,
    };

    this.isLoading = true;

    this.service.postMoreInformation(formInfo, this.selectedFiles)
      .subscribe({
        next: () => {
          this.toast.success('Dados enviados com sucesso!');
          this.isLoading = false;
        },
        error: err => {
          this.toast.error('Erro ao enviar dados: ' + err.message);
          this.isLoading = false;
        },
      });
  }
}
