import {
  ApplicationConfig,
  provideZoneChangeDetection,
  LOCALE_ID
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideHttpClient } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localPt from '@angular/common/locales/pt';
import { provideToastr } from 'ngx-toastr';
import {
  provideAnimationsAsync
} from '@angular/platform-browser/animations/async';

registerLocaleData(localPt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(),
    {provide: LOCALE_ID, useValue: 'PT-BR'},
    provideAnimationsAsync(),
    provideToastr(),
  ]
};
