import { Component, OnInit, OnDestroy, AfterViewInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { GetBasket } from '../../store/actions/cart.actions';
import { RemoveBasket } from '../../store/actions/cart.actions';
/**/
import { AppState } from '../../app.state';
import { Page } from '../../data-models/page.model';

import { NgxSpinnerService } from 'ngx-spinner';

import { User } from '../../data-models/user';
//import { AppState } from '../../store/app.states';
//import { LogIn } from '../../store/actions/auth.actions';

import  * as pageNames from '../../data-models/page-names';

import { defaultBasketCurrency } from '../../data-models/cart-data-models';



import { ServerDataService } from '../server-data.service';
import { ProductListService } from '../product-list.service';
import { CheckStorageService } from '../check-storage.service';

//test
import { RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';




@Component({
  selector: 'app-cart-product-list',
  templateUrl: './cart-product-list.component.html',
  styleUrls: ['./cart-product-list.component.scss', '../cart/cart.component.scss']
})
export class CartProductListComponent implements OnInit, OnDestroy  { //AfterViewInit, AfterViewChecked

  mainUrl = pageNames.main;
  loginUrl = pageNames.login;
  reg1Url = pageNames.reg1;
  reg2Url = pageNames.reg2;
  smsVerif = pageNames.smsVerif;
  twoFactor = pageNames.twoFactor;
  clientarea = pageNames.clientarea;

  //@ViewChild('bTextPage') bTextPage: ElementRef;;
  //@ViewChild('cartProductList') cartProductList: ElementRef;;

  products = [];
  basketCurrency:string;
  tax:number = 0;
  subtotal:string = '0';
  grandTotal:string = '0';

  disableRemove = false;

  //showMoreLessText:string = 'Show More';
  //showMore:boolean[] = [];

  arr = [];

  storeObservable;

  // spinner, данные корзины получены
  getBasket: boolean = false;

  constructor(
  	private serverDataService: ServerDataService,
    private checkStorageService: CheckStorageService,
    private productListService: ProductListService,
  	private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    //private spinner: NgxSpinnerService
  ) {

  }

  ngOnInit() {
    this.checkStorageService.check();
    this.storeObservable = this.store.pipe(select('page')).subscribe(data => {

        if (data.basketContent != undefined) {

          this.basketCurrency = data.basketContent.res.Content.currency;

          this.products = this.productListService.processData(data.basketContent.res);
          this.tax = data.basketContent.res.Content.totalPriceWithTax - data.basketContent.res.Content.totalPrice;
          this.subtotal = data.basketContent.res.Content.totalPrice;
          this.grandTotal = data.basketContent.res.Content.totalPriceWithTax;
        }
        else {
          this.basketCurrency = defaultBasketCurrency;
        }

        // при sms verif и clienarea для нового польз - запретить кнопки remove тк заказ уже создан
        if ( data.chooseNextState != undefined ) {
          if ( data.chooseNextState.res1.newUser ) {
              this.disableRemove = true;
          }
          else {
              this.disableRemove = false;
          }
        }
    });

    let payload = 1;
    this.store.dispatch(new GetBasket(payload));
  }

  ngOnDestroy() {
    this.storeObservable.unsubscribe();
  }

  navigateToUrl() {
  	let url = this.serverDataService.setUrl();
  	this.router.navigate([url]);
  }

  // toggle Show More
  showMoreLess(i) {

    this.products[i].showMore = !this.products[i].showMore;
    if (this.products[i].showMore) {
      this.products[i].showMoreLessText = 'Show Less';
    }
    else {
      this.products[i].showMoreLessText = 'Show More';
    }
  }

  showMoreLessSeparetely(i) {
    let a = this.products[i].showMore;
    this.products[i].showMore = !this.products[i].showMore;
  }

  removeBasketItem(i) {
    this.store.dispatch(new RemoveBasket(i));
  }

}
