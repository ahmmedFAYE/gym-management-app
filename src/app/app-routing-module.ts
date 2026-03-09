import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './features/admin/admin-module';
import { MainLayout } from './layout/main-layout/main-layout';


const routes: Routes = [
    // Lazy loading pour chaque module
    {
      path:'admin',
      loadChildren : () =>
      import('./features/admin/admin-module')
      .then(m => m.AdminModule)
    },

    {
      path:'analytics',
      loadChildren: () =>
      import('./features/analytics/analytics-module')
      .then(m => m.AnalyticsModule)
    },

    {
      path:'auth',
      loadChildren:() =>
      import('./features/auth/auth-module')
      .then(m => m.AuthModule)
    },

    {
      path:'clients',
      loadChildren:() =>
      import('./features/clients/clients-module')
      .then(m => m.ClientsModule)
    },

    {
      path:'finance',
      loadChildren:() =>
      import('./features/finance/finance-module')
      .then(m => m.FinanceModule)
    },

    {
      path:'members',
      loadChildren:() =>
      import('./features/members/members-module')
      .then(m => m.MembersModule)
    },

    {
      path:'finance',
      loadChildren:() =>
      import('./features/finance/finance-module')
      .then(m => m.FinanceModule)
    },

    {
      path:'tickets',
      loadChildren:() =>
      import('./features/ticket/ticket-module')
      .then(m => m.TicketModule)
    },
    // route racine de l'application
   {path:'', component:MainLayout,
    children:[
      {path:'dashboard', loadChildren:() => import('./features/admin/admin-module').then(m => m.AdminModule)},
      {path:'members', loadChildren:() => import('./features/members/members-module').then(m => m.MembersModule)},
      {path:'finance', loadChildren:() => import('./features/finance/finance-module').then(m => m.FinanceModule)}
    ]
   },

   {path:'login', loadChildren: () => import('./features/auth/auth-module').then(m => m.AuthModule)},
   // Route par défaut
   {path:'**', redirectTo:'/dashboard'} 
  ];
 


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
