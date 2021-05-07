import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { ElementRef, HostListener, Input } from '@angular/core';

import { fromEvent } from 'rxjs';
import {TicketModalComponent} from "../ticket-modal/ticket-modal.component";

@Component({
  selector: 'app-contact-support',
  templateUrl: './contact-support.component.html',
  styleUrls: ['./contact-support.component.scss']
})
export class ContactSupportComponent implements OnInit, OnDestroy {
  clicks;
  @ViewChild(TicketModalComponent) child;
  constructor() { }

  ngOnInit() {
  	this.clickSubscribe();
  }

  clickSubscribe() {
  	this.clicks = fromEvent(document, 'click');
	this.clicks.subscribe((x) => {
		const targetId = x.target.id;
		if (targetId === 'supportCreateTicket') {
			this.child.openModal()
      window.scrollTo(0, 0)
		}
	});
  }

  ngOnDestroy() {
  	this.clicks.unsubscribe();
  }

}
