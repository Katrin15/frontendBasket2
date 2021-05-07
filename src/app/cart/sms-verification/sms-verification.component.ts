import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild} from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

import { NgxSpinnerService } from 'ngx-spinner';

import { AppState } from '../../store/app.states';
import { SubmitSmsVerification } from '../../store/actions/cart.actions';
import { SubmitNewPhone } from '../../store/actions/cart.actions';
import { SubmitNewToken } from '../../store/actions/cart.actions';

import { TwoFactor } from '../../data-models/cart-data-models';
import  * as countryZipPhone from '../../data-models/country-zip-data-models';

import  * as pageNames from '../../data-models/page-names';

import { CanActivateLinkService }      from '../can-activate-link.service';

declare let jquery:any;
declare let $ :any;

@Component({
  selector: 'app-sms-verification',
  templateUrl: './sms-verification.component.html',
  styleUrls: ['./sms-verification.component.scss', '../cart/cart.component.scss']
})
export class SmsVerificationComponent implements OnInit, OnDestroy, AfterViewInit  {
	userVerificationForm: FormGroup;
	smsNumberUpdateForm: FormGroup;
	// timer
	timerStart:boolean = false;
	// sms number update 
	smsInputValidationResult = new countryZipPhone.InputValidationResult__Phone();
	updateFormHide:boolean = true; 

	verificationSummary = new TwoFactor();
	alreadySent:boolean = false;

	currentNumber = '+79150010101';
	@ViewChild('smsSelect') smsSelect;

	storeObservable;
	clientsName:string;

	constructor(private fb: FormBuilder, private store: Store<AppState>, private spinner: NgxSpinnerService, private canActivateLinkService: CanActivateLinkService,) {
  		this.createUserVerificationForm();
  		this.createSmsNumberUpdateForm();
 	}

	ngOnInit() {
		
		this.timerStart = true;   
	    this.storeObservable = this.store.pipe(select('page')).subscribe(data => { 
	    	
	    	if (data.smsNumber != undefined) {
	    		this.currentNumber = '+' + data.smsNumber;	
	    	}

	    	if (data.chooseNextState != undefined) {
	    		
	      		if (data.chooseNextState.res1.smsVerifShow && this.alreadySent) {
	      			this.verificationSummary.setError('codeMessage', this.verificationSummary.verificationError);
	      			this.spinner.hide();
	      		}
	      	}
	    });	    

	    (<any>window).ga('set', 'page', '/' + pageNames.smsVerif + '.html');
      	(<any>window).ga('send', 'pageview');
	}

	
  
  	ngOnDestroy() {
    	this.storeObservable.unsubscribe();
  	}

	ngAfterViewInit() {
		// изменение sms
    	this.smsNumberUpdateForm.controls['smsNumber'].valueChanges.subscribe((val) => {
        	let valid = this.smsSelect.isValidNumber();      
        	valid ? this.smsInputValidationResult.setVals('success', '', null) : this.smsInputValidationResult.setVals('error', '', val);       
    	});
    }

	createUserVerificationForm() {
		this.userVerificationForm = this.fb.group({
	    	token: ['', Validators.compose([Validators.required]) ] // <--- the FormControl called "login" //Validators.required,  Validators.compose([Validators.required, Validators.email)
		});
	}
	createSmsNumberUpdateForm() {
		this.smsNumberUpdateForm = this.fb.group({
	    	smsNumber: ['', Validators.compose([Validators.required]) ]
		});	
	}

	onSubmitCode() {

		const token = this.userVerificationForm.get('token');

		this.verificationSummary.setError('codeMessage', '');	
		this.alreadySent = true;	

		// проверка на пустоту
    	if (token.valid) {
    		this.verificationSummary.setError('codeMessage', '')}
    	else {
    		this.verificationSummary.setError('codeMessage', this.verificationSummary.provideCode); 
    		return false;
    	}

		this.spinner.show();
		this.sendTokenRequest(token.value);
		//this.rebuildForm();
	}
	sendTokenRequest(token) {
		const payload = {
	    	t: token
	    };
	    this.store.dispatch(new SubmitSmsVerification(payload));
	}



	// новый смс номер
	onSubmitUpdate() {

		const sms = this.smsNumberUpdateForm.get('smsNumber');
		let valid = this.smsSelect.isValidNumber();      
    	valid ? this.smsInputValidationResult.setVals('success', '', null) : this.smsInputValidationResult.setVals('error', '', '');

		// sms
	    // ошибки - пустой  или не правильный
	    if (sms.errors !== null || this.smsInputValidationResult.error !== null) {
	      if ( sms.errors.required !== undefined) {
	        //this.registerFullSummary.setError('smsMessage', this.registerFullSummary.smsEmpty);
	        this.smsInputValidationResult.setVals('error', this.verificationSummary.smsEmpty, sms.value);
	      }
	      else if (this.smsInputValidationResult.error !== null) {
	        //this.registerFullSummary.setError('smsMessage', this.registerFullSummary.unValidSmsError);
	        this.smsInputValidationResult.setVals('error', this.verificationSummary.unValidSmsError, sms.value);
	      }	   

	      return false;  
	      
	    }

	    // смс надо передать с кодом страны
	    // https://www.npmjs.com/package/ngx-phone-select
	    let s = $("#sms").intlTelInput("getNumber");

	    this.sendUpdateNumberRequest(s);

	}
	sendUpdateNumberRequest(s) {
		const payload = {
	    	s: s
	    };
	    this.store.dispatch(new SubmitNewPhone(payload));
	}

	onSubmitResend() {
		if (this.timerStart) {
			return false;
		}
		this.timerStart = true;
		//this.spinner.show();
		const payload = 1;
	    this.store.dispatch(new SubmitNewToken(payload));		
	}
	
	toggleUpdateForm() {		
		
		//this.smsInputValidationResult.setVals('success', '', null);
		this.smsInputValidationResult.setVals('', '', null);	

		$("#sms").intlTelInput();
		$("#sms").intlTelInput("setNumber", this.currentNumber); //'31612345678'; - не определяет страну

		this.updateFormHide = !this.updateFormHide;
	}


	onTimerFinish() {	this.timerStart = false;	}

	// чтобы со страницы смс верификации нельзя было уйти кнопками назад
	canDeactivate() {
		return this.canActivateLinkService.canDeactivateSmsVerif();
	}
}
