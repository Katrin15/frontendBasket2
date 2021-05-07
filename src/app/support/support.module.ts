import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SupportRoutingModule} from './support-routing.module';

import {ContactSupportComponent} from './contact-support/contact-support.component';
import {TicketModalComponent} from './ticket-modal/ticket-modal.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ModalModule} from "ngx-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    SupportRoutingModule,
    ReactiveFormsModule,

  ],
  declarations: [
    ContactSupportComponent,
    TicketModalComponent,
  ]
})
export class SupportModule {
}
