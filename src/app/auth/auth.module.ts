import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/components/dashboard/dashboard.component';
import { DASHBOARD_ROUTES } from '../dashboard/dashboard.module';
import { HomeComponent } from '../home/components/home/home.component';
import { PublicLayoutComponent } from '../layout/components/public-layout/public-layout.component';
import { LoginComponent } from './components/login/login.component';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        // TODO Should we prevent access to login page if logged in?
        path: 'login',
        component: LoginComponent,
        canActivate: [],
      }
    ],
  },
];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    RouterModule.forChild(AUTH_ROUTES),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
