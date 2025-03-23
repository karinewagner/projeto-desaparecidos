import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  IMissingPersonByIdResponse,
  IMissingPersonListResponse
} from './missing-person.interface';
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class MissingPersonsService {
  private _httpClient = inject(HttpClient);

  getMissingPersonList(params: any): Observable<IMissingPersonListResponse> {
    const httpParams = new HttpParams({
      fromObject: params
    });

    return this._httpClient
      .get<IMissingPersonListResponse>(`${environment.apiUrl}/v1/pessoas/aberto/filtro`, {
        params: httpParams,
      })
    }

  getMissingPersonDetailsById(id: string): Observable<IMissingPersonByIdResponse> {
    return this._httpClient
      .get<IMissingPersonByIdResponse>(`${environment.apiUrl}/v1/pessoas/${id}`)
  }
}
