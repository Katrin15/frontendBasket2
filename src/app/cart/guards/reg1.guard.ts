import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, } from '@angular/router';
import { Observable } from 'rxjs';

import { CanActivateLinkService }      from '../can-activate-link.service';
import  * as pageNames from '../../data-models/page-names';

@Injectable({
  providedIn: 'root'
})
export class Reg1Guard implements CanActivate {

	testtest = false;

	constructor(private canActivateLinkService: CanActivateLinkService, private router: Router) {}
	
	canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
	    return this.checkRegStep();
	}

	checkRegStep() {
		   
	    /*let dUrl = pageNames.main + '/' + pageNames.reg1; // 'basket/login' - relative  не работает
	    this.router.navigate([dUrl]);*/	    

	    return this.canActivateLinkService.isRegStep1();	
	}
}
