import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IMissingPersonListResponse } from './missing-person.interface';
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class MissingPersonsService {
  private _httpClient = inject(HttpClient);

  getMissingPersonList(): Observable<IMissingPersonListResponse> {
    return this._httpClient
      .get<IMissingPersonListResponse>(`${environment.apiUrl}/v1/pessoas/aberto/filtro`)  }
}
