import { Component, OnInit, OnDestroy, } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgxSpinnerService } from 'ngx-spinner';

import { environment } from '../../../environments/environment';

import { AppState } from '../../store/app.states';
import { SubmitLogin } from '../../store/actions/cart.actions';

import { Login } from '../../data-models/cart-data-models';
import  * as pageNames from '../../data-models/page-names';

// declare google analytics
declare const ga: any;





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../cart/cart.component.scss']
})
export class LoginComponent implements  OnInit, OnDestroy   {

  storeObservable;

  loginForm: FormGroup;
  loginSummary = new Login();

  serverMessage = '';

  constructor(private store: Store<AppState>, private fb: FormBuilder, private spinner: NgxSpinnerService) {
      this.createForm();

      
      
  }

  ngOnInit() {
    // просто привязка subscrib'a
    // сообщение об ошибке errorServerMessage - работает
    this.storeObservable = this.store.pipe(select('page')).subscribe(data => { 

      this.serverMessage = data.errorServerMessageLogin;

      // сервер не ответил, либо сообщил об ошибке
      if (data.failureLogin) {
          this.spinner.hide(); 
      }
      
    }); 


    //var 1
    if (environment.production) {
      (<any>window).ga('set', 'page', '/' + pageNames.login + '.html');
      (<any>window).ga('send', 'pageview');
    }

    //var 2
    //ga('set', 'page', '/' + pageNames.login + '.html');
    //ga('send', 'pageview');    
  }

  /*sendToGA() {
      (<any>window).ga('set', 'page', '/login.html');
        (<any>window).ga('send', 'pageview');
      (<any>window).dataLayer = (<any>window).dataLayer || [];
      (<any>window).dataLayer.push({
          'event': 'Buy_nl_sale'
      });
  }*/

  ngOnDestroy() {
    //console.log("Login component NG ON DESTROY");
    this.storeObservable.unsubscribe();
  }

  createForm() {
    this.loginForm = this.fb.group({
        email: ['', Validators.compose([Validators.required, Validators.email]) ], // <--- the FormControl called "login" //Validators.required,  Validators.compose([Validators.required, Validators.email)
        password: ['', Validators.required]//['', Validators.minLength]
    });
  }

  onSubmit() {
    this.login();
    //this.rebuildForm();
  }

  login() {
    const emailControl = this.loginForm.get('email');
    const passControl = this.loginForm.get('password');

    //this.loginSummary.message = [];
    this.loginSummary.setError("emailMessage", "");
    this.loginSummary.setError("passwordMessage","");
    
    if (emailControl.errors !== null || passControl.errors !== null) {      

      // email
      if (emailControl.errors !== null) {
        if ( emailControl.errors.required !== undefined) {
          
          this.loginSummary.setError("emailMessage", this.loginSummary.emailEmpty);
        }
        else if (emailControl.errors.email !== undefined) {
          this.loginSummary.message.push(this.loginSummary.emailFormatError);
          this.loginSummary.setError("emailMessage", this.loginSummary.emailFormatError);
        }
      }

      // password
      if (passControl.errors !== null) {
        if (passControl.errors.required !== undefined) {          
          this.loginSummary.setError("passwordMessage", this.loginSummary.passwordEmpty);
        }
      }

      return false
    }

    this.spinner.show();

    this.loginRequest(emailControl.value, passControl.value);

  }

  loginRequest(e, p) {

    const payload = {
      e: e,
      p: p
    };
    //console.log('loginRequest payload', payload);
    this.store.dispatch(new SubmitLogin(payload));
  }


  /*test(){
    console.log("root", document.querySelector('#root'));
    console.log("root", document.querySelector('.lc-4nhddd'));
    console.log("b-page__promo", document.querySelector('.b-page__promo'));
  }*/
}
