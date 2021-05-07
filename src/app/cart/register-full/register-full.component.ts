import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild} from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

import { NgxSpinnerService } from 'ngx-spinner';

import { AppState } from '../../store/app.states';
import { SubmitReg2 } from '../../store/actions/cart.actions';

import { environment } from '../../../environments/environment';

import { RegisterFull } from '../../data-models/cart-data-models';
import { defaultPaymentMethod } from '../../data-models/cart-data-models';
import  * as countryZipPhone from '../../data-models/country-zip-data-models';

import  * as pageNames from '../../data-models/page-names';

//test
import { Router, RoutesRecognized, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';

declare let jquery:any;
declare let $ :any;

@Component({
  selector: 'app-register-full',
  templateUrl: './register-full.component.html',
  styleUrls: ['./register-full.component.scss', '../cart/cart.component.scss']
})
export class RegisterFullComponent implements OnInit, AfterViewInit, OnDestroy {

  registerFullForm: FormGroup;
  registerFullSummary = new RegisterFull(); 

  // Countries
  countries = countryZipPhone.countries;
  selectedCountryModel = countryZipPhone.initCountry; // страна при иниц
  currentCountryObj:countryZipPhone.Country =  countryZipPhone.initCountry;

  // почтовые коды
  countryZipCodeCheck = new countryZipPhone.CountryZipCodeCheck( );
  zipCodeInputValidationResult =  new countryZipPhone.InputValidationResult__zipCode();
  @ViewChild('zipCodePopover') zipCodePopover;

  // Phones
  @ViewChild('phoneSelect') phoneSelect;
  @ViewChild('smsSelect') smsSelect;
  phoneInputValidationResult = new countryZipPhone.InputValidationResult__Phone();
  smsInputValidationResult = new countryZipPhone.InputValidationResult__Phone();

  //методы оплаты
  payM = [];
  selectedPayMethModel = defaultPaymentMethod;// = 'paypal';

  // email, par
  regEmail:string;
  regPass:string;

  // сообщение об ошибке регистрации 2 от сервера
  errorServerMessageReg2:string;
  
  //
  storeObservable;

  // choose legal entity
  legalEntity = false;


  constructor(private fb: FormBuilder, private store: Store<AppState>, private spinner: NgxSpinnerService) {
    this.createForm();
  }

  ngOnInit() {
  	this.storeObservable = this.store.pipe(select('page')).subscribe(data => {
  
      this.registerFullSummary.payMethodsMessage = data.errorServerMessagePayM;
      // методы оплаты
      if (data.paymentMethods != undefined && data.paymentMethods !='') {
        if (data.paymentMethods.res.Error == false) {
            let arr = [];

            for (let entry of  data.paymentMethods.res.Content) {
            
              //if (entry.module == "newalipay") { 
              if (entry.module == this.selectedPayMethModel) {
                arr.unshift(entry);              
              }
              else {
                arr.push(entry);
              }
          }
          this.selectedPayMethModel = arr[0].module;
          this.payM = arr;
        }
      }

      // email, pass
      if (data.email != undefined) {
        this.regEmail = data.email
      }
      if (data.password != undefined) {
        this.regPass = data.password
      }

      // сообшение от сервера об ошибке регистрации
      if (data.errorServerMessageReg2 != undefined) {
        this.errorServerMessageReg2 = data.errorServerMessageReg2;  
      }  

      // сервер не ответил, либо сообщил об ошибке
      if (data.failureReg2) { 
          this.spinner.hide();
      }

      //this.onFormChanges();


    // test
    /*this.router.events
            .pipe(filter((e: any) => e instanceof RoutesRecognized),
                pairwise()
            ).subscribe((e: any) => {
                console.log(e[0].urlAfterRedirects); // previous url
                console.log('e[0]', e[0]);

                console.log(this.router.url);
                console.log(this.router);
            });
    */   

      if (environment.production) {
        (<any>window).ga('set', 'page', '/' + pageNames.reg2 + '.html');
        (<any>window).ga('send', 'pageview');
      }
      
    });
      
  }
  ngOnDestroy() {
    this.storeObservable.unsubscribe();
  }

  ngAfterViewInit() {
    // инициализировать страну для телефонов
    this.initPhonesWithCountry(this.selectedCountryModel.short);

    // изменение страны:
    // проверка zip code, 
    // установка страны у телефонов
    this.registerFullForm.controls['country'].valueChanges.subscribe((val) => {

        this.currentCountryObj = val;

        const zipcode = (this.registerFullForm.get('zipCode').value).toUpperCase();
         //if (zipcode != '') {
           this.zipCodeInputValidationResult = this.countryZipCodeCheck.func(zipcode, this.currentCountryObj);
           //this.zipPopoverMessage = this.zipCodeInputValidationResult.message;
           //this.content = this.zipPopoverMessage;
         //}
         

        // новое значение
        // console.log(val);
        // текущее значение
        // console.log(this.selectedCountryModel);

        //this.initPhonesWithCountry(this.selectedCountryModel.short);
        this.initPhonesWithCountry(val.short);         
    });

    // изменение телефона
    this.registerFullForm.controls['phone'].valueChanges.subscribe((val) => {

        let valid = this.phoneSelect.isValidNumber();      
        valid ? this.phoneInputValidationResult.setVals('success', '', null) : this.phoneInputValidationResult.setVals('error', '', val);    
    });

    // изменение sms
    this.registerFullForm.controls['sms'].valueChanges.subscribe((val) => {

        let valid = this.smsSelect.isValidNumber();      
        valid ? this.smsInputValidationResult.setVals('success', '', null) : this.smsInputValidationResult.setVals('error', '', val);       
    });
  }

  createForm() {
    this.registerFullForm = this.fb.group({
        
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        companyName: ['', Validators.required],
        country: ['', Validators.required],
        region: '',
        city: ['', Validators.required],
        zipCode: ['', Validators.compose( [ Validators.required, this.zipCodeCheck() ] ) ], //, this.zipCodeCheck()
        address: ['', Validators.compose( [ Validators.required, Validators.maxLength(100) ] ) ], // , this.addressCheck()
        address2: ['', Validators.maxLength(100)],
        phone: ['', Validators.compose( [ Validators.required ] ) ],   //, this.phoneSelect   Validators.pattern('/^\d+$/') Validators.required - для bugfix, а так -  не нужно
        sms: ['', Validators.compose( [ Validators.required  ] ) ],   //, this.smsSelect
        payM: '',
        vat: '',
        secretWord: ['', Validators.required],
        termsTick: ['', Validators.required]
    });
  }

  //onFormChanges(): void { // нужен unsubscribe!
  //  this.formChangesSubscription = this.registerFullForm.valueChanges.subscribe(val => {
  //    //alert('form changed');
  //  });
  //}

  


  // страна по умолчанию, сравнивает с NgModel
  setDefaultCountry(item1, item2) {
      if (item1 !== null && item2 !== null) {
        return item1.short === item2.short;  
      }
      else {
        return false;
      }      
  }

  // инициализировать страну + телефон
  initPhonesWithCountry(countryCode) {

    // при смене страны - очистить поля
    this.registerFullForm.patchValue({ phone: '' });
    this.registerFullForm.patchValue({ sms: ''   });

    this.phoneSelect.setCountry(countryCode);
    this.smsSelect.setCountry(countryCode);
  }

  // платежный метод по умолчанию, сравнивает с NgModel
  setDefaultPayMeth(item1, item2) {
      if (item1 !== null && item2 !== null) {
        return item1.module === item2.module;  
      }
      else {
        return false;
      }      
  }

  // на изменение zip
  zipCodeCheck() : ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {

      const zipcode = (control.value); //.toUpperCase();

      this.zipCodeInputValidationResult = this.countryZipCodeCheck.func(zipcode, this.currentCountryObj);

      if (this.zipCodePopover != undefined) {
         this.zipCodePopover.show();
      }      

      return this.zipCodeInputValidationResult.error;
    }
  }

  onSubmit() {    
    this.registerFull();
    //this.rebuildForm();
  }

  registerFull() {

    // необходимые поля
    // 1) валидность через Validator
    const firstName = this.registerFullForm.get('firstName');
  
    const lastName = this.registerFullForm.get('lastName');
    const city = this.registerFullForm.get('city');
    const secretWord = this.registerFullForm.get('secretWord');
    // companyName - если выбрана компания
    const companyName = this.registerFullForm.get('companyName'); 
    // проверка только на пустоту адреса и добавилась - не длинее 100 символов
    const address = this.registerFullForm.get('address');
    const address2 = this.registerFullForm.get('address2');

    // 1.1)
    const country = this.registerFullForm.get('country');
    const zipCode = this.registerFullForm.get('zipCode');
    //const address = this.registerFullForm.get('address');

    // 2) валидность проверяется через Subscriber + required(пустой)
    const sms = this.registerFullForm.get('sms');
    const phone = this.registerFullForm.get('phone'); // phone больше не является необходимым полем
    


    // НЕ необходимые поля
    const region = this.registerFullForm.get('region');

    // Галка Terms 
    const termsTick = this.registerFullForm.get('termsTick');

    // билинг дает сделать регистрацию с цифрами вместо имени ??

    this.registerFullSummary.resetErrors();
    // ЭТО ЧТО ???
    //this.phoneInputValidationResult.setVals('error', this.registerFullSummary.unValidPhoneError, phone.value); 


    // проверка на пустоту
    (firstName.valid) ? ( this.registerFullSummary.setError('firstNameMessage', '')) : (this.registerFullSummary.setError('firstNameMessage', this.registerFullSummary.firstNameEmpty));
    (lastName.valid) ? ( this.registerFullSummary.setError('lastNameMessage', '')) : (this.registerFullSummary.setError('lastNameMessage', this.registerFullSummary.lastNameEmpty));
    (city.valid) ? ( this.registerFullSummary.setError('cityMessage', '')) : (this.registerFullSummary.setError('cityMessage', this.registerFullSummary.cityEmpty));
    (secretWord.valid) ? ( this.registerFullSummary.setError('secretWordMessage', '')) : (this.registerFullSummary.setError('secretWordMessage', this.registerFullSummary.secretWordEmpty));
    (address.valid) ? ( this.registerFullSummary.setError('addressMessage', '')) : (this.registerFullSummary.setError('addressMessage', this.registerFullSummary.addressEmpty));
    // если компания - то название не пустое
    if (!this.legalEntity) {
      (companyName.valid) ? ( this.registerFullSummary.setError('companyNameMessage', '')) : (this.registerFullSummary.setError('companyNameMessage', this.registerFullSummary.companyNameEmpty));
    }


    let a1:string ='', a2:string = '';
    // адрес 64 символа + все остальное.
    if (address.value.length > 64) {
        a1 = address.value.substring(0 , 64);
        a2 = `${address.value.substring(64)} ${address2.value}`; //address.value.substring(64) + address2.value;
    }
    else {
        a1 = address.value; 
        a2 = address2.value;
    }

    // каждый адрес - не длинее 100 символов
    if (address.errors !== null) {
      if (address.errors.maxlength) {
        this.registerFullSummary.setError('addressMessage', this.registerFullSummary.maxLengthAddressError);
      }  
    }
    if (address2.errors !== null) {
      if (address2.errors.maxlength) {
        this.registerFullSummary.setError('addressMessage2', this.registerFullSummary.maxLengthAddressError);
      }
    }
    else {
      this.registerFullSummary.setError('addressMessage2', '');  
    }
    
    



    // zip code
    // ошибки - пустой  или не правильный
    this.zipCodeInputValidationResult = this.countryZipCodeCheck.func(zipCode.value, this.currentCountryObj);
    if (zipCode.errors !== null) {
      if ( zipCode.errors.required !== undefined) {
        this.registerFullSummary.setError('zipCodeMessage', this.registerFullSummary.zipEmpty);
        this.zipCodeInputValidationResult.setVals('error', this.registerFullSummary.zipEmpty, zipCode.value);
      }
      else if (zipCode.errors.unValidZip !== undefined) {
        this.registerFullSummary.setError('zipCodeMessage', this.registerFullSummary.unValidZipError);
        this.zipCodeInputValidationResult.setVals('error', this.registerFullSummary.unValidZipError, zipCode.value);
      }      
    }
    else {
      this.registerFullSummary.setError('zipCodeMessage', '');  
    }

    let telError:boolean = false;
    
    // проверка на пустоту + правильность
    // phone - пустой, тогда передать на сервер занчение из поля смс
    
    let valid = this.smsSelect.isValidNumber();      
    valid ? this.smsInputValidationResult.setVals('success', '', null) : this.smsInputValidationResult.setVals('error', '', '');
    valid = this.phoneSelect.isValidNumber();      
    valid ? this.phoneInputValidationResult.setVals('success', '', null) : this.phoneInputValidationResult.setVals('error', '', '');

    // phone
    // ошибки - не правильный, пустой - не ошибка
    let ph;
    if (phone.errors !== null || this.phoneInputValidationResult.error !== null) {
      if ( phone.errors.required !== undefined) {
        // phone - пустой, взять из sms
        // phone передадим с кодом страны $("#phone").intlTelInput("getNumber") = +91 8123456789
        // плюс дает ошибку в билинге, отсечь
        ph = ($("#sms").intlTelInput("getNumber")).substr(1);
        this.registerFullSummary.setError('phoneMessage', '');
        this.phoneInputValidationResult.setVals('', '', phone.value);
      }
      else if (this.phoneInputValidationResult.error !== null) {
        this.phoneInputValidationResult.setVals('error', this.registerFullSummary.unValidPhoneError, phone.value);    
        telError = true;   
      }
      
      
    }
    else {
      // плюс дает ошибку в билинге, отсечь
      ph = ($("#phone").intlTelInput("getNumber")).substr(1); 
      console.log('zdes3');
    }

    // sms
    // ошибки - пустой  или не правильный
    if (sms.errors !== null || this.smsInputValidationResult.error !== null) {
      if ( sms.errors.required !== undefined) {
        this.registerFullSummary.setError('smsMessage', this.registerFullSummary.smsEmpty);
        this.smsInputValidationResult.setVals('error', this.registerFullSummary.smsEmpty, sms.value);
      }
      else if (this.smsInputValidationResult.error !== null) {
        this.registerFullSummary.setError('smsMessage', this.registerFullSummary.unValidSmsError);
        this.smsInputValidationResult.setVals('error', this.registerFullSummary.unValidSmsError, sms.value);
      }
      
      telError = true;
    }

    // смс надо передать с кодом страны
    // https://www.npmjs.com/package/ngx-phone-select
    let s = $("#sms").intlTelInput("getNumber");    

    if (!termsTick.value) {
      this.registerFullSummary.setError('termsAgreeMessage', this.registerFullSummary.termsAgree);  
    }
  
    if (!firstName.valid || !lastName.valid || !city.valid || !secretWord.valid || !zipCode.valid || !address.valid || !address2.valid || telError || !termsTick.value) {
      return false;
    }
    let lE:string;
    this.legalEntity ? ( lE = 'individual') : (lE = 'company')
    if (!companyName.valid && lE == 'company') {
      return false;
    }

    this.spinner.show();

    

    this.registerFullRequest(this.registerFullForm.value, this.regEmail, this.regPass, s, ph, a1, a2, lE);
  }

  registerFullRequest(form, e, p, s, ph, a1, a2, lE) {
    // form, e, p, s, ph
    const payload = {
      form: form,      
      e: e,
      p: p,
      s: s,
      ph: ph,
      a1: a1,
      a2: a2,
      lE: lE,
    };
    this.store.dispatch(new SubmitReg2(payload));    
  }

  chooseLegalEntity(t) {
    // false - company; true - individual
    if (t === 'c') {
      this.legalEntity = false;  
    }
    else {
       this.legalEntity = true; 
    }
  }


  canDeactivate() {

    /*console.log("CAN DEACTIVATE");

    console.log(this.router.url);
    console.log(this.router);
    console.log("ActivatedRouteSnapshot", ActivatedRouteSnapshot);

    return false;*/

    //alert('i am navigating away');
    // if the editName !== this.user.name
    //if (this.user.name !== this.editName) {
    //  return window.confirm('Discard changes?');
    //}

    // 1
    // если поля не пустые - сообщить о потере данных
    //if (this.checkFormEmptyVal()){
    //    return window.confirm('Вы уходите со страницы, данные не будут сохранены. Чтобы сохранить нажмите кнопку Proceed.');
    //}
    //return true;    

    // 2
    // куда уходим?
    // если на рег1 - запретить
    

    //return false;

}

checkFormEmptyVal() {
  // необходимые поля
    // 1) валидность через Validator
    const firstName = this.registerFullForm.get('firstName');
  
    const lastName = this.registerFullForm.get('lastName');
    const city = this.registerFullForm.get('city');
    const secretWord = this.registerFullForm.get('secretWord');
    // проверка только на пустоту адреса
    const address = this.registerFullForm.get('address');

    // 1.1)
    const country = this.registerFullForm.get('country');
    const zipCode = this.registerFullForm.get('zipCode');
    //const address = this.registerFullForm.get('address');

    // 2) валидность проверяется через Subscriber + required(пустой)
    const sms = this.registerFullForm.get('sms');
    const phone = this.registerFullForm.get('phone'); // phone больше не является необходимым полем
    


    // НЕ необходимые поля
    const companyName = this.registerFullForm.get('companyName');
    const region = this.registerFullForm.get('region');

    // если поля не пустые - сообщить о потере данных
    if (firstName.value != '' || lastName.value != '' || city.value != '' || 
      secretWord.value != 0 || address.value != '' || sms.value != '' || phone.value != '' || companyName.value != '' || region.value != '') {
      return true;
    }
    else {
      return false;
    }
}



  // test function - create client 
  createClient() {
    this.registerFullForm.patchValue({
      firstName:    'firstName'
    });
    this.registerFullForm.patchValue({
      lastName: 'lastName'
    });
    this.registerFullForm.patchValue({
      city: 'city'
    });
    this.registerFullForm.patchValue({
      zipCode: '9999 aa'
    });
    this.registerFullForm.patchValue({
      address: 'lalal lalal'
    });

    /*this.registerFullForm.patchValue({
     phone: '0612345678'
    });*/
    /*this.registerFullForm.patchValue({
     sms: '0612345678'
    });*/

    this.registerFullForm.patchValue({
     payM: 'paypal'
    });

    this.registerFullForm.patchValue({
     secretWord: 'sword'
    });

    this.registerFullForm.patchValue({
     termsTick: true
    });
  }

}
