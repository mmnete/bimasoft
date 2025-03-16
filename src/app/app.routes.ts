import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { HomeComponent } from './pages/home/home.component';
import { CarInsuranceFlowComponent } from './pages/car-insurance-flow/car-insurance-flow.component';
import { OnboardCorpComponent } from './pages/onboard-corp/onboard-corp.component';
import { PendingCompaniesComponent } from './pages/pending-companies/pending-companies.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './services/auth/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
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
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];
