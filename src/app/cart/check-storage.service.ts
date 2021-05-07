import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckStorageService {

	storage:boolean|null = null;
  	constructor() { }				

	check() {
		let asdfqw = 'asdfqw';
		try {
			    localStorage.setItem(asdfqw, asdfqw);
			    localStorage.removeItem(asdfqw);
			    this.storage = true;
			    //alert(this.storage);
			    			        
			    //return true;
		} catch(e) {
			    //return false;
			    this.storage = false;
			    //alert(this.storage);
			   
		}
		
	}

	setDataAuth(a) {
		//console.log("data AUTH", a);
		//console.log("this.storage", this.storage);
		if (this.storage) {
			localStorage.setItem('hKWhmcsAd', a);
			return true;
		}
		else {
			return false;
		}
	}

	getDataAuth() {		
		if (this.storage) {			
			return localStorage.getItem('hKWhmcsAd');
		}
		else {
			return false;
		}
	}

	forBillUrl() {
		this.check();
		if (this.storage) {
			return true;
		}
		else {
			return false;
		}
	}

};


