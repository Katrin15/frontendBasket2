import { Component, OnInit } from '@angular/core';

import  * as pageNames from '../../data-models/page-names';

import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss', '../cart/cart.component.scss']
})
export class LoginRegisterComponent implements OnInit {

	loginUrl = '../' + pageNames.login;
  	reg1Url = '../' + pageNames.reg1;

	constructor(public router: Router) { }

	ngOnInit() {
	/*	this.router.events.subscribe((val) => {
        // see also 
        console.log(val instanceof NavigationStart);
        console.log(val instanceof NavigationEnd);

        //alert(val instanceof NavigationStart);
        //alert(val instanceof NavigationEnd);

        console.log(this.router);
    });
  */
	}

	/*test() {
		console.log("CLICK");
	}*/
}
