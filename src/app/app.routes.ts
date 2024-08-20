import { Routes } from '@angular/router';

import { SearchInformationComponent } from './modules/search-information/search-information.component';
import { SummaryComponent } from './modules/summary/summary.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'consult',
    pathMatch: 'full',
  },
  {
    path: 'consult',
    component: SearchInformationComponent,
  },
  {
    path: 'summary',
    component: SummaryComponent,
  },
  {
    path: '**',
    redirectTo: 'consult',
  },
];
