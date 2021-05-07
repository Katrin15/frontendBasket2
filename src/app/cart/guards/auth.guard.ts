import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { CanActivateLinkService }      from '../can-activate-link.service';
import  * as pageNames from '../../data-models/page-names';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(private canActivateLinkService: CanActivateLinkService, private router: Router, private route: ActivatedRoute,) {}

	canActivate(
	    next: ActivatedRouteSnapshot,
	    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

		//let url: string = state.url;
		//console.log('state', state);
	  	//console.log('AuthGuard#canActivate called');
	    return this.checkBillingAuth(); //(url)
	}

	checkBillingAuth(): boolean { //checkBillingAuth(url: string): boolean {
	    if (this.canActivateLinkService.isBillingAuth()) { return true; }

	    // Store the attempted URL for redirecting
	    //this.canActivateLinkService.redirectUrl = url;

	    // Navigate to the login page with extras
	    let dUrl = pageNames.main + '/' + pageNames.login; // 'basket/login' - relative  не работает
	    this.router.navigate([dUrl]);
	    return false;
	}
}
