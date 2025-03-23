import { Component, Input } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import {
  IContent,
} from '@services/missing-person.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'card-component',
  imports: [MatCardModule, MatButton, RouterLink],
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
