import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';

const routes: Routes = [
  // 1. Route pour le login (Hors layout général)
  {
    path: 'login',
    loadChildren: () => import('./features/auth/auth-module').then(m => m.AuthModule)
  },

  // 2. Route pour le layout et ses enfants
  {
    path: '', 
    component: MainLayout,
    children: [
      // Redirection automatique de '' vers 'dashboard' quand on arrive sur l'app
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      
      { path: 'dashboard', loadChildren: () => import('./features/admin/admin-module').then(m => m.AdminModule) },
      { path: 'analytics', loadChildren: () => import('./features/analytics/analytics-module').then(m => m.AnalyticsModule) },
      { path: 'clients', loadChildren: () => import('./features/clients/clients-module').then(m => m.ClientsModule) },
      { path: 'finance', loadChildren: () => import('./features/finance/finance-module').then(m => m.FinanceModule) },
      { path: 'members', loadChildren: () => import('./features/members/members-module').then(m => m.MembersModule) },
      // Attention ici : vérifie bien si ton dossier est 'ticket' ou 'tickets'
      { path: 'ticket', loadChildren: () => import('./features/ticket/ticket-module').then(m => m.TicketModule) }
    ]
  },

  // 3. Wild card route (doit toujours être en dernier)
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }