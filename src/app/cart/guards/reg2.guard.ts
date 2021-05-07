import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, } from '@angular/router';
import { Observable } from 'rxjs';

import { CanActivateLinkService }      from '../can-activate-link.service';
import  * as pageNames from '../../data-models/page-names';

@Injectable({
  providedIn: 'root'
})
export class Reg2Guard implements CanActivate {

	testtest = false;

	constructor(private canActivateLinkService: CanActivateLinkService, private router: Router) {}
	canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
	    return this.checkRegStep();
	}

	checkRegStep() {
		//console.log("CAN ACTIVATE REG2", this.canActivateLinkService.isRegStep2());
	    if (this.canActivateLinkService.isRegStep2()) { return true; }
	    return false;
	}
}
