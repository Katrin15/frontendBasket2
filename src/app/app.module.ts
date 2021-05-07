import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

//import { PopoverModule } from 'ngx-bootstrap/popover';

//ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './store/reducers/cart.reducers';
import { CartEffects } from './store/effects/cart.effects';

//import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { ServerDataService } from './cart/server-data.service';
import { CheckStorageService } from './cart/check-storage.service';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import {AlertModule} from "ngx-bootstrap";

// import { SupportModule }     from './support/support.module';
// import { CartModule } from './cart/cart.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    StoreModule.forRoot({
     page: reducer
    }),
    //EffectsModule.forRoot([AuthEffects]), PageEffects
    EffectsModule.forRoot([CartEffects]),
    HttpClientModule,
    // ModalModule.forRoot(),

    //PopoverModule.forRoot(),
    //ReactiveFormsModule,
    //CartModule
  ],
  providers: [ServerDataService,CheckStorageService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
