import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import {
  IMissingPersonList,
  IMissingPersonListResponse
} from '@modules/home/home.interface';

@Injectable({providedIn: 'root'})
export class HomeService {
  private _httpClient = inject(HttpClient);

  getMissingPersonList(params: IMissingPersonList): Observable<IMissingPersonListResponse> {
    const newParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== null)
    );

    const httpParams = new HttpParams({ fromObject: {...newParams} });

    return this._httpClient
      .get<IMissingPersonListResponse>(`${environment.apiUrl}/v1/pessoas/aberto/filtro`, {
        params: httpParams,
      })
    }
}
