import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import  * as pageNames from './data-models/page-names';


//import { CartModule } from './cart/cart.module';

/*const routes: Routes = [
	{ path: 'shopping-cart', component: BasketComponent },
	{ path: '',   redirectTo: '/shopping-cart', pathMatch: 'full' },
	{ path: '**', component: PageNotFoundComponent }
];*/


/*{
    path: 'crisis-center',
    loadChildren: './crisis-center/crisis-center.module#CrisisCenterModule',
    data: { preload: true }
  },*/

//const pageNames = new PageNames();

const routes: Routes = [
	{ 	path: '', //pageNames.main,///'shopping-cart', 
		loadChildren: './cart/cart.module#CartModule', //component: BasketComponent  //#CartModule
		data: { preload: true }
	},
	// редирект в зависимости от авторизации клиента
	//{ path: '',   redirectTo: '/shopping-cart', pathMatch: 'full' },
	//{ path: '',   redirectTo: '/login', pathMatch: 'full' },
	{ path: '**', component: PageNotFoundComponent }
];




@NgModule({
  imports: [RouterModule.forRoot(routes, /*{ enableTracing: true }*/)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
