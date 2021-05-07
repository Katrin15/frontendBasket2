import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactSupportComponent } from './contact-support/contact-support.component';

const supportRoutes: Routes = [
  {
    path: '',
    component: ContactSupportComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(supportRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SupportRoutingModule { }