import { Component, OnInit, OnDestroy, } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgxSpinnerService } from 'ngx-spinner';

import { AppState } from '../../store/app.states';
import { GetBasket } from '../../store/actions/cart.actions';
import { SubmitBuy } from '../../store/actions/cart.actions';
import { ToBillingUrl } from '../../store/actions/cart.actions';

import { emptySC } from '../../data-models/cart-data-models';

import { ProductListService } from '../product-list.service';

import  * as pageNames from '../../data-models/page-names';

import { CanActivateLinkService }      from '../can-activate-link.service';

declare const fbq: any;

@Component({
  selector: 'app-area-logined',
  templateUrl: './area-logined.component.html',
  styleUrls: ['./area-logined.component.scss', '../cart/cart.component.scss']
})
export class AreaLoginedComponent implements OnInit, OnDestroy {

	products = [];
	descriptions = [];
  buyComments:string = '';
  newUser:boolean = false;

	storeObservable;
  message:string = '';

  promocodeForm: FormGroup;


	constructor(private store: Store<AppState>, private productListService: ProductListService, 
    private spinner: NgxSpinnerService, private canActivateLinkService: CanActivateLinkService, private fb: FormBuilder,) {
    this.createForm();
  }

	ngOnInit() { 	

    this.storeObservable = this.store.pipe(select('page')).subscribe(data => {          

        if (data.basketContent != undefined) {
        	this.products = this.productListService.processData(data.basketContent.res);
          //console.log("this.products", this.products);
          if (this.products.length > 0) {
              this.descriptions = this.products[0]['basketItemComment'];
          }        	  
        }
        else {
        	  
        } 

        // сервер не ответил, либо сообщил об ошибке
        if (data.failureBuy) {
            this.spinner.hide(); 
        }

        if (data.chooseNextState != undefined) {
          if (data.chooseNextState.res1 != undefined) {
            this.newUser = data.chooseNextState.res1.newUser;
          }
        }

        (<any>window).ga('set', 'page', '/' + pageNames.clientarea + '.html');
        (<any>window).ga('send', 'pageview');

    });

    // после входа в client area получить корзину
    let payload = 1;
    this.store.dispatch(new GetBasket(payload));
  }

   createForm() {
    this.promocodeForm = this.fb.group({
        promocode: ['', Validators.maxLength(15)]
    });
  }

  ngOnDestroy() {
    //console.log("Area Logined component NG ON DESTROY");
    this.storeObservable.unsubscribe();
  }

  onKey(event: any) {
    let val = event.target.value;
    this.buyComments = val;
  }

  onSubmit() {

    fbq('track', 'InitiateCheckout');

    const promocodeControl = this.promocodeForm.get('promocode');
    if (promocodeControl.errors !== null ) {
      return false;
    }
    this.buyRequest(promocodeControl.value);
    //this.rebuildForm();
  }

  buyRequest(p) {
    // ЕСЛИ КОРЗИНА ПУСТАЯ - ОТКЛОНИТЬ
    // внимание - если новый пользовтаель - то дать зарегистир

    //alert(this.newUser);

    // существ пользовтаель, с путой корзиной нельзя
    if ( this.products.length == 0 && !this.newUser ) {

        this.message = emptySC;
        return false;
    }

    // новый пользовтаель, с путой корзиной можно, сразу в clientarea билинга
    if (this.products.length == 0 && this.newUser) {
      this.spinner.show();

      this.store.dispatch(new ToBillingUrl(1));      
      //return false; 
    }

    // существ польз с непустой корзиной - запрос Buy
    if (this.products.length > 0) {
        this.spinner.show();

        const payload = {
          comments: this.buyComments,
          promocode: p
        }
        //console.log('buyRequest payload', payload);
        this.store.dispatch(new SubmitBuy(payload));  
    }   
  }

  // чтобы со страницы clientarea нельзя было уйти кнопками назад
  canDeactivate() {
    //alert('clientarea deact' + this.canActivateLinkService.canDeactivateClientarea());
    return this.canActivateLinkService.canDeactivateClientarea();
  }
}
