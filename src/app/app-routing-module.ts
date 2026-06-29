import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';

const routes: Routes = [
  // la route d'entrée ou par défaut
  {path:'', redirectTo:'login', pathMatch:'full'},

  // charger le module auth si la route est 'login'
  {path:'login', loadChildren:()=> import('./features/auth/auth-module').then(m => m.AuthModule)},

  // route sécurisée pour notre layout
  {path:'', component:MainLayout,
    children:[
      {path:'admin', loadChildren:()=> import('./features/admin/admin-module').then(m => m.AdminModule)},
      { path: 'analytics', loadChildren: () => import('./features/analytics/analytics-module').then(m => m.AnalyticsModule) },
      { path: 'clients', loadChildren: () => import('./features/clients/clients-module').then(m => m.ClientsModule) },
      { path: 'finance', loadChildren: () => import('./features/finance/finance-module').then(m => m.FinanceModule) },
      { path: 'members', loadChildren: () => import('./features/members/members-module').then(m => m.MembersModule) },
      { path: 'ticket', loadChildren: () => import('./features/ticket/ticket-module').then(m => m.TicketModule) }
    ]
  },

  // wildcardroute ( quand la routes est inconnue)
  {path:'**', redirectTo:'login'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }