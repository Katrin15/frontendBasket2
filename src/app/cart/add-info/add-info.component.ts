import { Component, OnInit, Input, OnChanges,  SimpleChanges, OnDestroy} from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { NgxSpinnerService } from 'ngx-spinner';

import { AppState } from '../../store/app.states';
import { SubmitLogout } from '../../store/actions/cart.actions';

@Component({
  selector: 'app-add-info',
  templateUrl: './add-info.component.html',
  styleUrls: ['./add-info.component.scss', '../cart/cart.component.scss']
})
export class AddInfoComponent implements OnInit, OnDestroy {
	//@Input() clientsName;
	clientsName:string = '';

	errorServerMessageLogout:string;

	storeObservable;

	constructor(private store: Store<AppState>, private spinner: NgxSpinnerService) { }

	ngOnInit() {

		this.storeObservable = this.store.pipe(select('page')).subscribe(data => { 
	    	//console.log("подписка на STORE в ADD-INFO", data); 
	    	//console.log(data.errorServerMessageLogin)

	    	// client's name for <add-info>
	    	if (data.name != undefined) {
	    		this.clientsName = data.name;
	    	}

	    	if (data.errorServerMessageLogout != undefined) {
	    		this.errorServerMessageLogout = data.errorServerMessageLogout;
	    	}	    	

	    	// сервер не ответил, либо сообщил об ошибке
		    if (data.failureLogout) {
		        this.spinner.hide(); 
		    }	    	

	    });

	}
	ngOnDestroy() {
    	//console.log(" ADD-INFO component NG ON DESTROY");
    	this.storeObservable.unsubscribe();
  	}

  	logoutRequest() {

	    this.spinner.show();

	    const payload = 1;

	    this.store.dispatch(new SubmitLogout(payload));
  }



}
