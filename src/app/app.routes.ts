import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { CarInsuranceFlowComponent } from './pages/car-insurance-flow/car-insurance-flow.component';
import { OnboardCorpComponent } from './pages/onboard-corp/onboard-corp.component';
import { PendingCompaniesComponent } from './pages/pending-companies/pending-companies.component';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.routes').then(
            (m) => m.UiComponentsRoutes,
          ),
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./pages/extra/extra.routes').then((m) => m.ExtraRoutes),
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes,
          ),
      },
    ],
  },
  {
    path: 'car-insurance-flow', // Add this new route
    component: CarInsuranceFlowComponent, // Point to the new component
  },
  {
    path: 'corp-form', // Add this new route
    component: OnboardCorpComponent, // Point to the new component
  },
  {
    path: 'pending', // Add this new route
    component: PendingCompaniesComponent, // Point to the new component
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];
