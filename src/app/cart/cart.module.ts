import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PopoverModule } from 'ngx-bootstrap/popover';
import { NgxPhoneSelectModule } from 'ngx-phone-select';
import { NgxSpinnerModule } from 'ngx-spinner';

import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { RegisterComponent } from './register/register.component';
import { CartProductListComponent } from './cart-product-list/cart-product-list.component';

import { CartRoutingModule } from './cart-routing.module';

import { ServerDataService } from './server-data.service';
import { ProductListService } from './product-list.service';
import { CheckStorageService } from './check-storage.service';

import { AreaLoginedComponent } from './area-logined/area-logined.component';
import { RegisterFullComponent } from './register-full/register-full.component';
import { SmsVerificationComponent } from './sms-verification/sms-verification.component';

import { TimerDirective } from './sms-verification/timer.directive';
import { MatchHeightDirective } from './match-height.directive';

import { TwoFactorComponent } from './two-factor/two-factor.component';
import { AddInfoComponent } from './add-info/add-info.component';
import { LoginRegisterComponent } from './login-register/login-register.component';

import { LivechatWidgetModule } from '@livechat/angular-widget';

// import { SupportModule } from '../support/support.module';

@NgModule({
  imports: [
    CommonModule,
    CartRoutingModule,
    ReactiveFormsModule,
    PopoverModule.forRoot(),
    NgxPhoneSelectModule,
    NgxSpinnerModule,
    LivechatWidgetModule,
    // SupportModule
  ],
  declarations: [LoginComponent, 
  CartComponent, 
  RegisterComponent, 
  CartProductListComponent, 
  AreaLoginedComponent, 
  RegisterFullComponent, 
  SmsVerificationComponent, 
  TimerDirective, 
  MatchHeightDirective,
  TwoFactorComponent, 
  AddInfoComponent, 
  LoginRegisterComponent],
  providers: [ServerDataService, ProductListService], // CheckStorageService - нельзя здесь регистрировать, будет 2 сервиса. см app.module.ts
})
export class CartModule { }
