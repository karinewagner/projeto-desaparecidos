import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import {
  IMissingPersonList,
  IMissingPersonListResponse
} from '@modules/home/home.interface';

@Injectable({providedIn: 'root'})
export class HomeService {
  private _httpClient = inject(HttpClient);

  private _cacheSearch$ = new BehaviorSubject<IMissingPersonList>({
    nome: '',
    faixaIdadeInicial: 0,
    faixaIdadeFinal: 0,
    sexo: '',
    status: 'DESAPARECIDO',
    pagina: 0,
    porPagina: 10,
  });

  getMissingPersonList(
    params: IMissingPersonList
  ): Observable<IMissingPersonListResponse> {
    const newParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== null)
    );

    const httpParams = new HttpParams({fromObject: {...newParams}});

    return this._httpClient
      .get<IMissingPersonListResponse>(`${environment.apiUrl}/v1/pessoas/aberto/filtro`, {
        params: httpParams,
      });
  }

  // Getters and Setters
  get cacheSearch$(): Observable<IMissingPersonList> {
    return this._cacheSearch$.asObservable();
  }

  get cacheSearch(): IMissingPersonList {
    return this._cacheSearch$.value;
  }

  set cacheSearch$(value: IMissingPersonList) {
    this._cacheSearch$.next(value);
  }
}
