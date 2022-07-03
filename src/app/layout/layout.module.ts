import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { PublicLayoutComponent } from './public-layout/public-layout.component';

@NgModule({
  declarations: [
    AuthLayoutComponent,
    PublicLayoutComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LayoutModule { }
