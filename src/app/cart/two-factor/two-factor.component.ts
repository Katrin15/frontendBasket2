import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild} from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { NgxSpinnerService } from 'ngx-spinner';

import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

import { AppState } from '../../store/app.states';
import { SubmitTwoFactor } from '../../store/actions/cart.actions';

import { TwoFactor } from '../../data-models/cart-data-models';

import  * as pageNames from '../../data-models/page-names';

import { CanActivateLinkService }      from '../can-activate-link.service';


@Component({
  selector: 'app-two-factor',
  templateUrl: './two-factor.component.html',
  styleUrls: ['./two-factor.component.scss', '../cart/cart.component.scss']
})
export class TwoFactorComponent implements OnInit, OnDestroy {
	userVerificationForm: FormGroup;
	verificationSummary = new TwoFactor();

	storeObservable;
	alreadySent:boolean = false;
	

	constructor(private fb: FormBuilder, private store: Store<AppState>, private spinner: NgxSpinnerService, private canActivateLinkService: CanActivateLinkService,) { 
		this.createUserVerificationForm();
	}

	ngOnInit() {

		this.verificationSummary.codeMessage = '';

		this.storeObservable = this.store.pipe(select('page')).subscribe(data => { 
	      		      
	      	if (data.chooseNextState != undefined) {
	      		if (data.chooseNextState.res1.twoFactorShow && this.alreadySent) {
	      			this.verificationSummary.codeMessage = this.verificationSummary.twoFactorNotPassed;
	      			this.spinner.hide();
	      		}
	      	}      
    	});

    	(<any>window).ga('set', 'page', '/' + pageNames.twoFactor + '.html');
      	(<any>window).ga('send', 'pageview');
  	}
	ngOnDestroy() {
	    this.storeObservable.unsubscribe();
	}

	createUserVerificationForm() {
		this.userVerificationForm = this.fb.group({
	    	token: ['', Validators.compose([Validators.required]) ]
		});
	}

	onSubmitCode() {
		const token = this.userVerificationForm.get('token');		

		// проверка на пустоту
    	if (token.valid) {
    		this.verificationSummary.setError('codeMessage', '')}
    	else {
    		this.verificationSummary.setError('codeMessage', this.verificationSummary.provideCode); 
    		return false;
    	}

    	this.alreadySent = true;
    	this.verificationSummary.codeMessage = '';
		this.spinner.show();
		this.sendTokenRequest(token.value);
		//this.rebuildForm();
	}
	sendTokenRequest(token) {	

		const payload = {
	    	t: token
	    };    
	    this.store.dispatch(new SubmitTwoFactor(payload));
	}

	//со страницы two factor нельзя было уйти кнопками назад
	canDeactivate() {
		return this.canActivateLinkService.canDeactivateTwoFactor();
	}

}
