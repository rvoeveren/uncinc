import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { PublicLayoutComponent } from './components/public-layout/public-layout.component';

@NgModule({
  declarations: [
    PublicLayoutComponent,
    AuthLayoutComponent,
  ],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [
    PublicLayoutComponent,
    AuthLayoutComponent,
  ]
})
export class LayoutModule { }
