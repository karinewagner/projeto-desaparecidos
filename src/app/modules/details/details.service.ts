import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import {
  IMissingPersonByIdResponse,
  IMoreInformation
} from './details.interface';

@Injectable({providedIn: 'root'})
export class DetailsService {
  private _httpClient = inject(HttpClient);

  getMissingPersonDetailsById(id: string): Observable<IMissingPersonByIdResponse> {
    return this._httpClient
      .get<IMissingPersonByIdResponse>(`${environment.apiUrl}/v1/pessoas/${id}`)
  }

  postMoreInformation(body: IMoreInformation, anexos: File[]): Observable<IMoreInformation> {
    const httpParams = new HttpParams({ fromObject: {...body} });

    const formData = new FormData();

    anexos.forEach((file) => {
      formData.append(`files`, file, file.name);
    });

    return this._httpClient
      .post<IMoreInformation>(
        `${environment.apiUrl}/v1/ocorrencias/informacoes-desaparecido`, formData, {
          params: httpParams,
        }
      )
  }
}
