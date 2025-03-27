import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import {
  IMissingPersonByIdResponse,
} from '@modules/details/details.interface';
import { DetailsService } from '@modules/details/details.service';

import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import {
  DialogInformationComponent
} from '@modules/details/components/dialog-information.component';

@Component({
  selector: 'details-component',
  imports: [
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    DatePipe,
  ],
  templateUrl: './details.component.html',
})

export class DetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(DetailsService);
  dialog = inject(MatDialog);

  personId: string = '';
  daysMissing: number = 0;
  missingPersonDetails: IMissingPersonByIdResponse = {
    id: 0,
    nome: '',
    idade: 0,
    sexo: '',
    vivo: true,
    urlFoto: '',
    ultimaOcorrencia: {
      dtDesaparecimento: '',
      encontradoVivo: true,
      localDesaparecimentoConcat: '',
      ocorrenciaEntrevDesapDTO: {
        informacao: '',
        vestimentasDesaparecido: '',
      },
      listaCartaz: [{
        urlCartaz: '',
        tipoCartaz: '',
      }],
      ocoId: 0,
    },
  };

  ngOnInit() {
    this.personId = this.route.snapshot.params['id'];
    this.getMissingPersonDetailsById(this.personId);
  }

  getMissingPersonDetailsById(id: string) {
    this.service.getMissingPersonDetailsById(id).subscribe(
      res => {
        this.missingPersonDetails = res;
        this.calculateDaysMissing();
      }
    );
  }

  calculateDaysMissing() {
    const disappearanceDate = new Date(this.missingPersonDetails.ultimaOcorrencia.dtDesaparecimento);
    const today = new Date();

    const diffTime = today.getTime() - disappearanceDate.getTime();

    this.daysMissing = Math.floor(diffTime / (1000 * 3600 * 24));
  }

  openDialogInformation(): void {
    this.dialog.open(DialogInformationComponent, {
      data: this.missingPersonDetails,
    })
  }

  shareOnWhatsApp() {
    const mensagem = encodeURIComponent(
      `🚨 DESAPARECIDO 🚨\n\n
      👤 Nome: ${this.missingPersonDetails.nome}\n
      📍Última localização: ${this.missingPersonDetails.ultimaOcorrencia.localDesaparecimentoConcat}\n
      📅 Desaparecido desde: ${new Date(this.missingPersonDetails.ultimaOcorrencia.dtDesaparecimento).toLocaleDateString()}\n
      👕 Vestimentas: ${this.missingPersonDetails.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.vestimentasDesaparecido}\n
      📢 Ajude a encontrar! Compartilhe!\n
      🔗 ${this.missingPersonDetails.urlFoto}`
    );

    window.open(`https://wa.me/?text=${mensagem}`, '_blank');
  }

  shareOnInstagram() {
    const mensagem =
      `🚨 DESAPARECIDO 🚨\n\n
      👤 Nome: ${this.missingPersonDetails.nome}\n
      📍 Última localização: ${this.missingPersonDetails.ultimaOcorrencia.localDesaparecimentoConcat}\n
      📅 Desaparecido desde: ${new Date(this.missingPersonDetails.ultimaOcorrencia.dtDesaparecimento).toLocaleDateString()}\n
      👕 Vestimentas: ${this.missingPersonDetails.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.vestimentasDesaparecido}\n
      📢 Ajude a encontrar! Compartilhe!`;

    alert('Copie esta mensagem e compartilhe no Instagram:\n\n' + mensagem);
  }
}
