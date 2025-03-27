import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { IStatisticsData } from './header.interface';

@Injectable({providedIn: 'root'})
export class HeaderService {
  private _httpClient = inject(HttpClient);

  getStatisticsData(): Observable<IStatisticsData> {
    return this._httpClient
      .get<IStatisticsData>(`${environment.apiUrl}/v1/pessoas/aberto/estatistico`)
  }
}
