import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
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
export class AuthModule {
}
