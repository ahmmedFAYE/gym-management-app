import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing-module';
import { Login } from './pages/login/login';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home-component/home-component';

@NgModule({
  declarations: [Login, HomeComponent],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule],
})
export class AuthModule {}
