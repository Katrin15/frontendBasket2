import { Component, OnInit, OnChanges,  SimpleChanges, OnDestroy, ViewChild} from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

import { NgxSpinnerService } from 'ngx-spinner';


import { AppState } from '../../store/app.states';
import { SubmitReg1 } from '../../store/actions/cart.actions';
import { SubmitLogout } from '../../store/actions/cart.actions';

import { bannedEmails } from '../../data-models/cart-data-models'; 
import { Register } from '../../data-models/cart-data-models';

import { passwordThresholds } from '../../data-models/cart-data-models';

import  * as pageNames from '../../data-models/page-names';

//test
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss','../cart/cart.component.scss']
})
export class RegisterComponent implements  OnInit, OnDestroy  {

  registerForm: FormGroup;
  bannedEmails = bannedEmails;   
  registerSummary = new Register(); 

  passwordThresholds = passwordThresholds;
  //passwordStrenghtCssClass:string = "";


  // подсказки и ошибки
  // на лету - popover
  // по нажатию на кнопку - span сверху
  // POPOVER
  @ViewChild('emailPopover') emailPopover;
  @ViewChild('passwordRepeatPopover') passwordRepeatPopover;

  //TEST !
  changeLog: string[] = [];
  storeObservable;

  constructor(private store: Store<AppState>, private fb: FormBuilder, private spinner: NgxSpinnerService, public router: Router) { 
    this.createForm();
  }

  ngOnInit() {
    // подписаться только на свою ошибку - как это сделать?!
  	 	this.storeObservable = this.store.pipe(select('page')).subscribe(data => { 
    
        this.registerSummary.setError('emailMessage', data.errorServerMessageReg1);

        // сервер не ответил, либо сообщил об ошибке
        if (data.failureReg1) {
            this.spinner.hide(); 
        }
    });

    // принудительный logout
    this.logoutRequest();

    // test
    /*this.router.events
            .pipe(filter((e: any) => e instanceof RoutesRecognized),
                pairwise()
            ).subscribe((e: any) => {
                console.log(e[0].urlAfterRedirects); // previous url
                alert(e[0].urlAfterRedirects);
            });*/

    (<any>window).ga('set', 'page', '/' + pageNames.reg1 + '.html');
    (<any>window).ga('send', 'pageview');  

  }

  logoutRequest() {
      const payload = pageNames.reg1;
      this.store.dispatch(new SubmitLogout(payload));
  }

  ngOnDestroy() {
    this.storeObservable.unsubscribe();
  }


  createForm() {
    this.registerForm = this.fb.group({
        email: ['', Validators.compose([Validators.required, Validators.email, this.bannedEmailsValidator(this.bannedEmails)]) ], // <--- the FormControl called "login" //Validators.required,  Validators.compose([Validators.required, Validators.email)
        autoPassword: [''],
        password: ['', Validators.compose( [ Validators.required, this.passwordStrenght()] )], //['', Validators.minLength]  forbiddenNameValidator(/bob/i)
        passwordRepeat: ['', Validators.compose( [ Validators.required, this.passwordRepeat()] )],
    });
  }

  // banned email
  bannedEmailsValidator(arr): ValidatorFn {
      return (control: AbstractControl): {[key: string]: any} => {

        const val = control.value;
        let i = val.indexOf("@");
          let j = val.indexOf(".");
          let host;
          if ( (i > 0) && (j > 0) ) {
              host = (val.substring((i+1), j)).toLowerCase();              
              if (arr.indexOf(host) > -1) {
                //this.registerMessage = `We do not allow anonimous registrations (${host}), sorry.`;
                //this.registerSummary.bannedEmail = host; 
                this.registerSummary.setBannedEmail(host);              
                this.emailPopover.show();
                return {'bannedEmail': {value: host}};  
              }
              else {
                
                this.emailPopover.hide();
                return null;  
              }              
          }
          if (j < 0 && this.emailPopover != undefined) {
              this.emailPopover.hide();
              return null; 
          }
          return null;        
      };
  }

  passwordGenerate() {
      let length = 4,
          charset = "abcdefghijklmnopqrstuvwxyz0123456789",
          retVal = "";
      for (let i = 0, n = charset.length; i < length; ++i) {
          retVal += charset.charAt(Math.floor(Math.random() * n));
      }

      length = 4;
      charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      for (let i = 0, n = charset.length; i < length; ++i) {
          retVal += charset.charAt(Math.floor(Math.random() * n));
      }

      length = 2;
      charset = "!@#$%^&*";
      for (let i = 0, n = charset.length; i < length; ++i) {
          retVal += charset.charAt(Math.floor(Math.random() * n));
      }

      //console.log("retVal ", retVal);

      this.registerForm.patchValue({
          password:    retVal,
          passwordRepeat: retVal
      });    
  }

  /*onKeyPasswordRepeat(event: any) { //, pop: HTMLElement
    const pR = event.target.value;
    const p = this.registerForm.get('password').value;

    this.passwordCompare(pR, p);
  }*/

  passwordRepeat(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => { 
      if (control.value == "") {
          return null;
      }

      if (this.registerForm != undefined) {
          const p = this.registerForm.get('password').value;
          const pR = control.value;
          return this.passwordCompare(pR, p);
      }
    }    
  }

  passwordCompare(a:string, b:string) {


    // пароли не совпадают
    if (a.localeCompare(b) != 0) {
      //this.registerSummary.setError("passwordRepeatMessage", this.registerSummary.passwordRepeat); //красный border              
      this.passwordRepeatPopover.show();    
      return {'notSamePassword': {value: a}};  
    }
    else {
      //this.registerSummary.setError("passwordRepeatMessage", '');   //красный border 
      this.passwordRepeatPopover.hide();
      return null; 
    }
  }

  passwordStrenght(): ValidatorFn {
      return (control: AbstractControl): {[key: string]: any} => { 

        

        let passwordStrength = this.getPasswordStrength(control.value);        

        if (control.value == "") {
          return null;
        }

        // проверка на несовпадение паролей
        if (this.registerForm != undefined) {
          const pR = this.registerForm.get('passwordRepeat');
          const p = control.value;
          // установить ошибку у 
          pR.setErrors(this.passwordCompare(pR.value, p));
        }

        // слабый пароль
        if ( passwordStrength >= this.passwordThresholds.warning ) {
            //this.passwordStrenghtCssClass = "b-basket__password--success";
            //this.passwordPopover.hide();
            this.registerSummary.isPasswordWeak = false;
            return null;            
        } else if ( passwordStrength >= this.passwordThresholds.error ) {
            //this.passwordStrenghtCssClass = "b-basket__password--warning";
            //this.passwordPopover.show();
            this.registerSummary.isPasswordWeak = false;
            return null;
        } else {
            //this.passwordStrenghtCssClass = "b-basket__password--error";
            //this.passwordPopover.show();
            this.registerSummary.isPasswordWeak = true;
            return {'weakPassword': {value: control.value}};
        }
      }  
  }
  getPasswordStrength(pw):number {
      // вычисление сложности
      let pwlength = (pw.length);
      if ( pwlength > 5 ) pwlength = 5;

      let numnumeric=pw.replace(/[0-9]/g,"");
      let numeric=(pw.length-numnumeric.length);
      if ( numeric > 3 ) numeric = 3;

      let symbols = pw.replace(/\W/g,"");
      let numsymbols = ( pw.length - symbols.length );
      if ( numsymbols > 3) numsymbols = 3;

      let numupper = pw.replace(/[A-Z]/g,"");
      let upper = (pw.length-numupper.length);
      if ( upper > 3) upper=3;
      let pwstrength = ((pwlength*10) - 20) + (numeric*10) + (numsymbols*15) + (upper*10);

      if ( pwstrength < 0 ) { pwstrength = 0 }
      if ( pwstrength > 100 ) { pwstrength = 100 }

      return pwstrength;
  }

  togglePasswordVis(){
    (this.registerSummary.inputPasswordType === 'password') ? (this.registerSummary.inputPasswordType = 'text') : (this.registerSummary.inputPasswordType = 'password')
  } 

  disablePaste(e) {
    e.preventDefault();
  }


  onSubmit() {    
    this.register();
    //this.rebuildForm();
  }

  register() {
    const emailControl = this.registerForm.get('email');
    const passwordControl = this.registerForm.get('password');
    const passwordRepeatControl = this.registerForm.get('passwordRepeat');

    this.registerSummary.setError('emailMessage', '');
    this.registerSummary.setError('passwordMessage',''); 
    this.registerSummary.setError('passwordRepeatMessage','');

    if (emailControl.errors !== null || passwordControl.errors !== null || passwordRepeatControl.errors !== null) {    

      // email
      // ошибки - пустой, не правильный формат, забаненные имейлы
      if (emailControl.errors !== null) {
        if ( emailControl.errors.required !== undefined) {
          this.registerSummary.setError('emailMessage', this.registerSummary.emailEmpty);
        }
        else if (emailControl.errors.email !== undefined) {
          this.registerSummary.setError('emailMessage', this.registerSummary.emailFormatError);
        }
        else if (emailControl.errors.bannedEmail !== undefined) {
          this.registerSummary.setError('emailMessage', this.registerSummary.bannedEmailMessage);
        }
      }

      // password
      if (passwordControl.errors !== null) {
        if (passwordControl.errors.required !== undefined) {
          this.registerSummary.setError('passwordMessage', this.registerSummary.passwordEmpty);
        }
        if (passwordControl.errors.weakPassword !== undefined) {
          this.registerSummary.setError('passwordMessage', this.registerSummary.passwordWeak); 
        }
      }

      // password repeat
      if (passwordRepeatControl.errors !== null) {
        if (passwordRepeatControl.errors.required !== undefined) {
          this.registerSummary.setError('passwordRepeatMessage', this.registerSummary.passwordRepeatEmpty);
        }
        if (passwordRepeatControl.errors.notSamePassword !== undefined) {
          this.registerSummary.setError('passwordRepeatMessage', this.registerSummary.passwordRepeatNotSame); 
        }
      }

      if (passwordControl.value != passwordRepeatControl.value) {
        
      }

      return false;
    }

    this.spinner.show(); 
    this.registerRequest(emailControl.value, passwordControl.value);

  }

  registerRequest(e, p){

    const payload = {
      email: e, //"ekodenko123@hostkey.ru", //_lalala
      password: p //"12345"
    };
    this.store.dispatch(new SubmitReg1(payload));

  }
 
}
