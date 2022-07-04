import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PublicLayoutComponent } from '../layout/components/public-layout/public-layout.component';

import { HomeComponent } from './components/home/home.component';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [],
      }
    ],
  },
];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    RouterModule.forChild(HOME_ROUTES),
    CommonModule
  ]
})
export class HomeModule { }
