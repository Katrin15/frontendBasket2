import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../store/app.states';

import { Page } from '../data-models/page.model'

@Injectable({
  providedIn: 'root'
})
export class CanActivateLinkService {
	data:Page = {
	    
	    billingAuth: false,	    

	    reg1: false,
	    reg2: false,

	    regStep: 1,

	}

  chooseNextState = {
      twoFactorShow: false,
      smsVerifShow: false,
      clientareaShow: false, // ??
      pageNameToShow: '',
      mustLogout: false,

      authNotValid: false,

      newUser: false,
  }

  	constructor(private store: Store<AppState>) { }

  	storeObservable = this.store.pipe(select('page')).subscribe(data => { 

    	this.data.billingAuth = data.billingAuth;
    	//this.data.reg1 = data.reg1;
    	this.data.regStep = data.regStep;

      if (data.chooseNextState != undefined) {
          this.chooseNextState.twoFactorShow =  data.chooseNextState.res1.twoFactorShow;
          this.chooseNextState.smsVerifShow =  data.chooseNextState.res1.smsVerifShow;
          this.chooseNextState.clientareaShow = data.chooseNextState.res1.clientareaShow;

          this.chooseNextState.pageNameToShow = data.chooseNextState.res1.pageNameToShow;
      }
      else {
          this.chooseNextState = {
              twoFactorShow: false,
              smsVerifShow: false,
              clientareaShow: false, // ??
              pageNameToShow: '',
              mustLogout: false,

              authNotValid: false,

              newUser: false,
          }
      }
  	});

  	/*isReg1() {
  		console.log("isReg1", this.data.reg1); 
  		return this.data.reg1;
  	}*/

  	isRegStep1() {

  		//alert(this.data.regStep);
  		if (this.data.regStep === 1) {
  			return true;
  		}
  		else {
  			return false;
  		}
  	}

  	isRegStep2() {
  		
  		//alert(this.data.regStep);
  		if (this.data.regStep === 2) {
  			return true;
  		}
  		else {
  			return false;
  		}
  	}

  	isBillingAuth() {
  		return this.data.billingAuth;
  	}

    // can deactivate sms verif, кнопками назад нельзя уйти со страницы
    canDeactivateSmsVerif() {
      if (this.chooseNextState.smsVerifShow) {
        return false;
      }
      else {
        return true;
      }
    }

    // can deactivate clientarea
    canDeactivateClientarea() {
      if (this.chooseNextState.clientareaShow) {
        return false;
      }
      else {
        return true;
      }
    }

    // can deactivate twoFactor
    canDeactivateTwoFactor() {
      if (this.chooseNextState.twoFactorShow) {
        return false;
      }
      else {
        return true;
      }
    }

}
