import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';

import { RegisterComponent } from './register/register.component';
import { RegisterFullComponent } from './register-full/register-full.component';

import { CartProductListComponent } from './cart-product-list/cart-product-list.component';
import { AreaLoginedComponent } from './area-logined/area-logined.component';
import { SmsVerificationComponent } from './sms-verification/sms-verification.component';
import { TwoFactorComponent } from './two-factor/two-factor.component';

import { AuthGuard }  from './guards/auth.guard';
import { Reg2Guard }  from './guards/reg2.guard';
import { Reg1Guard }  from './guards/reg1.guard';
import { Reg2deGuard }  from './guards/reg2de.guard';
import { SmsdeGuard }  from './guards/smsde.guard';
import { ClientareadeGuard }  from './guards/clientareade.guard';
import { TwofactdeGuard }  from './guards/twofactde.guard';

import  * as pageNames from '../data-models/page-names';



const cartRoutes: Routes = [
  {
    path: pageNames.main, // ''
    component: CartComponent,

    children: [
      {
        path: '',
        component: CartProductListComponent,
        //canActivate: [Reg1Guard],
        children: [
          {
            path: pageNames.login, //'login',
            component: LoginComponent,
            //canDeactivate: [CanDeactivateGuard],
            //resolve: {
            //  crisis: CrisisDetailResolverService
            //}
          },
          {
            path: pageNames.reg1, //'register',
            component: RegisterComponent,
            canActivate: [Reg1Guard],
            //canDeactivate: [CanDeactivateGuard],
            //resolve: {
            //  crisis: CrisisDetailResolverService
            //}
          },
          {
            path: pageNames.reg2, //'register',
            component: RegisterFullComponent,
            canActivate: [Reg2Guard],
            //canDeactivate: [Reg2deGuard],
            //resolve: {
            //  crisis: CrisisDetailResolverService
            //}
          },
          {
            path: pageNames.clientarea,
            component: AreaLoginedComponent,
            //canActivate: [AuthGuard], 
            canDeactivate: [ClientareadeGuard],
            //resolve: {
            //  crisis: CrisisDetailResolverService
            //}
          },
          {
             // ВНИМАНИЕ !!!!
            // ВСЕ СЛОЖНЕЕ ! НЕ ТОЛЬКО AUTH В БИЛИНГЕ НО И SMS_VERIFF.ISENABLED !!!
            path: pageNames.smsVerif,
            component: SmsVerificationComponent,
            canActivate: [AuthGuard], 
            canDeactivate: [SmsdeGuard],
            //resolve: {
            //  crisis: CrisisDetailResolverService
            //}
          },
          {
            path: pageNames.twoFactor,
            component: TwoFactorComponent,
            canActivate: [AuthGuard],
            canDeactivate: [TwofactdeGuard],
            //resolve: {
            //  crisis: CrisisDetailResolverService
            //}
          },
          // redirect по умолчанию не нужен, 
          // решать куда перенаправить взависимости от ответа сервера (кл уже авторизирован/нет, смс-вериф/2ф вериф и тп)
          // { path: '',   redirectTo: 'login', pathMatch: 'full' },  
        ]
      }
    ]
  },
  { path: pageNames.contactSupport, //pageNames.main,///'shopping-cart', 
    loadChildren: '../support/support.module#SupportModule', //component: BasketComponent  //#CartModule
    data: { preload: true }
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(cartRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CartRoutingModule { }