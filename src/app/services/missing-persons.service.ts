import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import {
  IMissingPersonByIdResponse, IMissingPersonList,
  IMissingPersonListResponse
} from './missing-person.interface';

@Injectable({providedIn: 'root'})
export class MissingPersonsService {
  private _httpClient = inject(HttpClient);

  getMissingPersonList(params: IMissingPersonList): Observable<IMissingPersonListResponse> {
    const filteredParams = Object.fromEntries(
      Object.entries(params)
        .filter(([_, value]) => value !== null && value !== undefined)
        .map(([key, value]) => [key, String(value)])
    );

    const httpParams = new HttpParams({ fromObject: filteredParams });

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
