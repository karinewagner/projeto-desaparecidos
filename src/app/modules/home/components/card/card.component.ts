import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';

import {
  IContent,
} from '@services/missing-person.interface';

@Component({
  selector: 'card-component',
  imports: [
    MatCardModule,
    MatButton,
    RouterLink,
    DatePipe
  ],
  templateUrl: './card.component.html',
})

export class CardComponent {
  @Input() missingPerson: IContent = {
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
      ocoId: 0,
    }
  };
}
