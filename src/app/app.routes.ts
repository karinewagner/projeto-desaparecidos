import { Routes } from '@angular/router';

import { HomeComponent } from '@modules/home/home.component';
import { DetailsComponent } from '@modules/details/details.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
  },
];
