import { Routes } from '@angular/router';

import { Dashboard } from './pages/dashboard/dashboard';
import { Policies } from './pages/policies/policies';
import { CreatePolicy } from './pages/create-policy/create-policy';
import { PolicyDetails } from './pages/policy-details/policy-details';
import { EditPolicy } from './pages/edit-policy/edit-policy';
import { RenewPolicy } from './pages/renew-policy/renew-policy';
import { CancelPolicy } from './pages/cancel-policy/cancel-policy';
import { ExpiringPolicies } from './pages/expiring-policies/expiring-policies';
import { Excel } from './pages/excel/excel';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  { path: 'dashboard', component: Dashboard },

  { path: 'policies', component: Policies },

  { path: 'policies/create', component: CreatePolicy },

  { path: 'policies/:policyNumber/edit', component: EditPolicy },

  { path: 'policies/:policyNumber/renew', component: RenewPolicy },

  { path: 'policies/:policyNumber/cancel', component: CancelPolicy },

  { path: 'policies/:policyNumber', component: PolicyDetails },

  { path: 'expiring', component: ExpiringPolicies },

  { path: 'excel', component: Excel },

  { path: '**', redirectTo: 'dashboard' }
];