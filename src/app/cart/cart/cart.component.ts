import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../../store/app.states';
import { IsLogined } from '../../store/actions/cart.actions';

import { ServerDataService } from '../server-data.service';

import  * as pageNames from '../../data-models/page-names';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  storeObservable;
  

  constructor(
  	private serverDataService: ServerDataService,
  	private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
  ) {  }

  ngOnInit() {
  	// this.navigateToUrl();

    this.isLogined();

    let cP = window.location.pathname;
    console.log("cP ", cP);

    /*switch (cP) {
      case pageNames.main:

        this.isLogined();
        
      break;
      case pageNames.contactSupport:

        console.log("на странице contact support ");
        
      break;
      
      default:        
      break;
    }
    */
  }

  ngOnDestroy() {
    //this.storeObservable.unsubscribe();
  }

  navigateToUrl(){
  	let url = this.serverDataService.setUrl();
  	console.log("url for navigate", url);
  	this.router.navigate([url]);	
  }

  isLogined() {
    const payload = 1;
    this.store.dispatch(new IsLogined(payload));
  }
}
