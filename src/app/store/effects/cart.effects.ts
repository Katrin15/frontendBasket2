import { Injectable } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { tap, map, switchMap, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { ServerDataService } from '../../cart/server-data.service';
import { CheckStorageService } from '../../cart/check-storage.service';
import { ChoosePageService } from '../../cart/choose-page.service';

import  * as pageActions from '../actions/cart.actions';

import  * as pageNames from '../../data-models/page-names';

/*import {
  ShowLogin,
  SubmitLogin,
  ShowReg1,
  SubmitReg1,
  ShowReg2,
  SubmitReg2,
  ShowTwoFactor,
  SubmitTwoFactor,
  ShowSmsVerification,
  SubmitSmsVerification,
  ShowClientarea,
  SubmitLogout
} from '../actions/page.actions';*/


@Injectable()
export class CartEffects {

  constructor(
    private actions$: Actions,
    private router: Router,
    private route: ActivatedRoute,
    private serverDataService: ServerDataService,
    private checkStorageService: CheckStorageService,
    private choosePageService: ChoosePageService,
  ) {}


  /*@Effect()
  LogIn: Observable<any> = this.actions
    .ofType(AuthActionTypes.LOGIN)
    .map((action: LogIn) => action.payload)
    .switchMap(payload => {
      return this.authService.logIn(payload.email, payload.password)
        .map((user) => {
          return new LogInSuccess({token: user.token, email: payload.email});
        })
        .catch((error) => {
          return Observable.of(new LogInFailure({ error: error }));
        });
    });
  */

  // ПРОВЕРКА, ЗАЛОГИНЕН ЛИ КЛИЕНТ
  @Effect()
  isLogined$ = this.actions$
    .ofType(pageActions.IS_LOGINED).pipe(
    map( (action: pageActions.IsLogined) => action.payload),
    switchMap(payload => {
      return this.serverDataService.isLogined().pipe(        
        map( (res) => { return new pageActions.SuccessIsLogined({res: res}) } ), //email: payload.email
        catchError(error => of(new pageActions.FailureIsLogined(error.error.Message)) )

      )        
    })
    ); //pipe

  // если кл-т залогинен, то запрос на doauth чтобы определить следующую страницу для показа
  @Effect()
  SuccessIsLogined$ = this.actions$
    .ofType(pageActions.SUCCESS_IS_LOGINED).pipe(
    map( (action: pageActions.SuccessIsLogined) => action.payload),
    switchMap(payload => {
      let aD = this.checkStorageService.getDataAuth();

      return this.serverDataService.doAuthAllReq(pageActions.SUBMIT_AUTH, aD).pipe(
        //tap( res => console.log('ответ на doAuth после isLogined success', res) ),
        map( (res) => { return new pageActions.SuccessAuth({res1: res, res2:'currentPageIsLogin'}) } ), //email: payload.email
        catchError(error => of(new pageActions.FailureAuth(error.error.Message)) )
      )    
    })
  );
  @Effect({ dispatch: false })
  FailureIsLogined$ = this.actions$.pipe(
    ofType(pageActions.FAILURE_IS_LOGINED),
    tap((res) => {
      //console.log("FailureIsLogined$ res", res); 

      // В ЧЕМ РАЗНИЦА ???
      // this.router.navigateByUrl('/');
      this.router.navigate([pageNames.main + '/' + pageNames.login]);     
    })
  );


  // BASKET
  // *****************************************

  @Effect()
  getBasket$ = this.actions$
    .ofType(pageActions.GET_BASKET).pipe(
    map( (action: pageActions.GetBasket) => action.payload),
    switchMap(payload => {
      return this.serverDataService.getBasket().pipe(        
        map( (res) => { return new pageActions.SuccessBasket({res: res}) } ), //email: payload.email
        catchError(error => of(new pageActions.FailureBasket(error.error.Message)) )

      )        
    })
    ); //pipe


  @Effect({ dispatch: false })
  SuccessBasket$ = this.actions$.pipe(
    ofType(pageActions.SUCCESS_BASKET),
    tap((res) => {
      //console.log("SuccessBasket$ res", res);
      
    })
  );
  @Effect({ dispatch: false })
  FailureBasket$ = this.actions$.pipe(
    ofType(pageActions.FAILURE_BASKET),
    tap((res) => {
      //console.log("FailureBasket$ res", res);
      
    })
  );

  @Effect()
  removeBasket$ = this.actions$
    .ofType(pageActions.REMOVE_BASKET).pipe(
    map( (action: pageActions.GetBasket) => action.payload),
    switchMap(payload => {
      return this.serverDataService.removeBasketItem(payload).pipe(        
        map( (res) => { return new pageActions.SuccessRemoveBasket({res: res}) } ),
        catchError(error => of(new pageActions.FailureRemoveBasket(error.error.Message)) )
      )        
    })
  );
  // при условии удачного удаления - запросить корзину опять
  @Effect()
  SuccessRemoveBasket$ = this.actions$
    .ofType(pageActions.SUCCESS_REMOVE_BASKET).pipe(
    map( (action: pageActions.SuccessRemoveBasket) => action.payload),
    switchMap(payload => {
      return this.serverDataService.getBasket().pipe(        
        map( (res) => { return new pageActions.SuccessBasket({res: res}) } ),
        catchError(error => of(new pageActions.FailureBasket(error.error.Message)) )

      )        
    })
  );
  /*@Effect({ dispatch: false })
  SuccessRemoveBasket$ = this.actions$.pipe(
    ofType(pageActions.SUCCESS_REMOVE_BASKET),
    tap((res) => {
      console.log("SuccessRemoveBasket$ res", res);
      
    })
  );*/
  @Effect({ dispatch: false })
  FailureRemoveBasket$ = this.actions$.pipe(
    ofType(pageActions.FAILURE_REMOVE_BASKET),
    tap((res) => {
      //console.log("FailureRemoveBasket$ res", res);
      
    })
  );


// BUY
// ***************************
@Effect()
submitBuy$ = this.actions$
    .ofType(pageActions.SUBMIT_BUY).pipe(
    map( (action: pageActions.SubmitBuy) => action.payload),
    switchMap(payload => {
      return this.serverDataService.buy(payload).pipe(        
        map( (res) => { return new pageActions.SuccessBuy( {res: res}) }),
        catchError(error => of(new pageActions.FailureBuy(error.error.Message)) )

      )        
    })
); //pipe
@Effect({ dispatch: false })
FailureBuy$ = this.actions$.pipe(
    ofType(pageActions.FAILURE_BUY),
    tap((res) => {
      //console.log("FailureBuy$ res", res);
      
    })
  );

@Effect({ dispatch: false })
SuccessBuy$ = this.actions$.pipe(
    ofType(pageActions.SUCCESS_BUY),
    tap((res:any) => {
      //console.log("SuccessBuy$", res);
      let invoiceid = res.payload.res.Content.invoiceid;
      let bUrl = this.serverDataService.getBUrl();
      //this.router.navigate([pageNames.main + '/' + pageNames.reg2]); //, { relativeTo: this.route } - не работает
      
      // если есть invoiceid - о переход на него, если нет - то в билинг просто.
      // без invoiceid быть не может, запрещено в компоненте покупать с пустой корзиной
      // в случае new user переход сразу на билинг, без действия buy
      //alert(bUrl + '/viewinvoice.php?id=' + invoiceid);
      if (invoiceid != undefined) {
          location.href = bUrl + '/viewinvoice.php?id=' + invoiceid; ///this.bUrl
      }
      else {
          location.href = bUrl;  
      }           
    })
  );

@Effect({ dispatch: false })
ToBillingUrl$ = this.actions$.pipe(
    ofType(pageActions.TO_BILLING_URL),
    tap((res:any) => {
      //console.log("ToBillingUrl$", res);
      
      let bUrl = this.serverDataService.getBUrl();          
      location.href = bUrl;  
      })          
  );




// LOGIN
// **************************
@Effect()
submitLogin$ = this.actions$
    .ofType(pageActions.SUBMIT_LOGIN).pipe(
    map( (action: pageActions.SubmitLogin) => action.payload),
    switchMap(payload => {
      //return this.serverDataService.login(payload.email, payload.password).pipe(
      return this.serverDataService.login(payload).pipe(
        //tap( res => console.log('ответ на login', res) ),
        map( (res) => { return new pageActions.SuccessLogin({res: res}) } ), //email: payload.email
        catchError(error => of(new pageActions.FailureLogin(error.error.Message)) )

      )        
  })
  ); //pipe


@Effect()
SuccessLogin$ = this.actions$.pipe(
    ofType(pageActions.SUCCESS_LOGIN),
    map((action: pageActions.SuccessLogin) => action.payload),
    switchMap(payload => {

      //console.log("payload в SUCCESS_LOGIN", payload);
      //console.log(payload.res.Content.authData);
      //console.log(payload.res.Content.user.firstName + " " + payload.res.Content.user.lastName);

      this.checkStorageService.setDataAuth(payload.res.Content.authData);

      return this.serverDataService.doAuthAllReq(pageActions.SUBMIT_AUTH, payload.res.Content.authData).pipe(
        //tap( res => console.log('ответ на doAuth после Login', res) ),
        map( (res) => { return new pageActions.SuccessAuth({res1: res, res2:'currentPageIsLogin'}) } ), //email: payload.email
        catchError(error => of(new pageActions.FailureAuth(error.error.Message)) )
      )
  })
); //pipe


  // BILLING AUTHENTIFICATION
  // ************************************************************
  // вариант 1
  /*@Effect({ dispatch: false })
  SuccessAuth$ = this.actions$.pipe(
      ofType(pageActions.SUCCESS_AUTH),
      tap((res) => {
        console.log("SuccessAuth$ res", res);
        //localStorage.setItem('token', user.payload.token);
        //this.router.navigateByUrl('/');

        // РЕШАТЬ КАКУЮ СТРАНИЦУ ПОКАЗЫВАТЬ
        // CLEARLY LOGED IN КУДА-ТО ДЕЛСЯ


      })
    );
  */

  @Effect()
  SuccessAuth$ = this.actions$
  .pipe(
    ofType(pageActions.SUCCESS_AUTH),    
    map( (action: pageActions.SuccessAuth) =>  
      {
        
        //console.log("SuccessAuth$")
        //console.log("action.payload", action.payload);

        

        let b = this.choosePageService.check(action.payload.res1);
        return new pageActions.ChooseNextPage({res1: b, res2: action.payload.res2 }) //'currentPageIsLogin'     
                
      }
    ),
  ); //pipe

  // ВНИМАНИЕ! МОЖЕТ СДЕЛАТЬ LOGOUT (тогда убрать dispatch: false ) ? в PAYLOAD error.error.Message - может не подходит?? 
  @Effect({ dispatch: false })
  FailureAuth$ = this.actions$.pipe(
      ofType(pageActions.FAILURE_AUTH),
      tap((res) => {
        //console.log("FailureAuth res", res);
        //localStorage.setItem('token', user.payload.token);
        //this.router.navigateByUrl('/');
      })
    );
  


  @Effect({ dispatch: false })
  FailureLogin$ = this.actions$.pipe(
    ofType(pageActions.FAILURE_LOGIN),
    tap((res) => {
      //console.log("LoginFailure$ res", res);
      //localStorage.setItem('token', user.payload.token);
      //this.router.navigateByUrl('/');
    })
  );

  // LOGOUT
  // **************************************
  @Effect()
  submitLogout$ = this.actions$
    .ofType(pageActions.SUBMIT_LOGOUT).pipe(
    map( (action: pageActions.SubmitLogout) => action.payload),
    switchMap(payload => {
      return this.serverDataService.logout(payload).pipe(
        //tap( res =>  console.log('ответ на LOGOUT + PAYLOAD', res, payload)),
        map( (res) => { return new pageActions.SuccessLogout({res: res, currentPage: payload}) } ), 
        catchError(error => of(new pageActions.FailureLogout(error.error.Message)) )

      )        
    })
  ); //pipe

  @Effect()
  SuccessLogout$ = this.actions$.pipe(
    ofType(pageActions.SUCCESS_LOGOUT),
    map((action: pageActions.SuccessLogout) => action.payload),
    switchMap(payload => {

      //console.log("SuccessLogout$ payload", payload);

      //console.log("payload в SUCCESS_LOGIN", payload);
      //console.log(payload.res.Content.authData);
      //console.log(payload.res.Content.user.firstName + " " + payload.res.Content.user.lastName);

      //let aD = this.checkStorageService.getDataAuth();

      return this.serverDataService.doAuthAllReq(pageActions.SUBMIT_AUTH_LOGOUT).pipe(
        //tap( res => console.log('ответ на doAuth после Logout + PAYLOAD', res, payload) ),
        map( (res) => { return new pageActions.SuccessAuthLogout({res: res, currentPage: payload.currentPage}) } ),
        catchError(error => of(new pageActions.FailureAuthLogout(error.error.Message)) )
      )
    })
    ); //pipe

  // после успешного logOut - переход на url Login или не переход, в случае регистрации + запрос корзины
  @Effect()
  SuccessAuthLogout$ = this.actions$.pipe(
    ofType(pageActions.SUCCESS_AUTH_LOGOUT),
    map((action: pageActions.SuccessLogout) => action.payload),
    switchMap(payload => {

      //console.log("SuccessAuthLogout$ payload", payload);

      let aD = this.checkStorageService.setDataAuth('');
      // NAVIGATE на страницу Входа - только после успешного выхода из билинга
      // this.router.navigateByUrl('/');
      if (payload.currentPage === pageNames.reg1) {
          // ничего не делать, тк уже на странице регистрации 
          //this.router.navigate([pageNames.main + '/' + pageNames.reg1]);
      }
      else {
          this.router.navigate([pageNames.main + '/' + pageNames.login]); 
      }      

      return this.serverDataService.getBasket().pipe(        
        map( (res) => { return new pageActions.SuccessBasket({res: res}) } ), //email: payload.email
        catchError(error => of(new pageActions.FailureBasket(error.error.Message)) )
      )
    })
    ); //pipe

    /*@Effect({ dispatch: false })
    SuccessAuthLogout$ = this.actions$.pipe(
      ofType(pageActions.SUCCESS_AUTH_LOGOUT),
      tap((res:any) => {

        console.log('SuccessAuthLogout$ res ', res);
        
        let aD = this.checkStorageService.setDataAuth('');
        // NAVIGATE на страницу Входа - только после успешного выхода из билинга
        // this.router.navigateByUrl('/');
        if (res.payload.currentPage === pageNames.reg1) {
            // ничего не делать, тк уже на странице регистрации 
            //this.router.navigate([pageNames.main + '/' + pageNames.reg1]);
        }
        else {
            this.router.navigate([pageNames.main + '/' + pageNames.login]); 
        }     

      })
    );*/
    @Effect({ dispatch: false })
    FailureAuthLogout$ = this.actions$.pipe(
      ofType(pageActions.FAILURE_AUTH_LOGOUT),
      tap((res) => {
        //console.log("ERROR: failure auth logout");  
      })
    );




  // РЕГИСТРАЦИЯ
  // **************************************

  // register #1
  // ошибку не проверили тк сервер ее не присылает на уже существующего клиента ekodenko123@hostkey.ru
  @Effect()
  submitReg1$ = this.actions$
    .pipe(
    ofType(pageActions.SUBMIT_REG_1),    
    map( (action: pageActions.SubmitReg1) => action.payload),
    switchMap(payload => {
        //console.log("EFFECTS SUBMIT_REG_1 payload", payload);

        // сохраним pass в sessionStorage, либо в store(?)
        // пока в store

        return this.serverDataService.register(payload.email).pipe(
          //tap( res => console.log('ответ на register', res) ),
          map( (res) => { return new pageActions.SuccessReg1({res: res}) } ), //email: payload.email
          catchError(error => of(new pageActions.FailureReg1(error.error.Message)) )
        )        
    })
    ); //pipe


    // перейти на страницу REG-2 и запросить методы оплаты
  @Effect()
  SuccessReg1 = this.actions$
    .pipe(
    ofType(pageActions.SUCCESS_REG_1),
    tap((res) => {
        this.router.navigate([pageNames.main + '/' + pageNames.reg2]); //, { relativeTo: this.route } - не работает
    }), 
    map( (action: pageActions.GetPayM) => action.payload),
    switchMap(payload => {
        //console.log("EFFECTS GET_PAY_M payload", payload);

        // сохраним pass в sessionStorage, либо в store(?)
        // пока в store

        return this.serverDataService.payMethods().pipe(
          //tap( res => console.log('ответ на запрос методов оплаты', res) ),
          map( (res:any) => { return new pageActions.SuccessPayM({res: res}) } ),
          catchError(error => of(new pageActions.FailurePayM(error.error.Message)) )
        )        
    })
    ); //pipe

    /*
    // Успешная регистрация 1 - вариант 1
    @Effect({ dispatch: false })
    SuccessReg1 = this.actions$.pipe(
      ofType(pageActions.SUCCESS_REG_1),
      tap((res) => {
        console.log("EFFECTS SUCCESS_REG_1  res", res);
        //localStorage.setItem('token', user.payload.token);
        //this.router.navigateByUrl('/');
        //console.log("this.route ", this.route);
        this.router.navigate([pageNames.main + '/' + pageNames.reg2]); //, { relativeTo: this.route } - не работает  
      })
    );
    */

    
  // здесь не нужен эффект, это действие в store
  @Effect({ dispatch: false })
    FailureReg1$ = this.actions$.pipe(
    ofType(pageActions.FAILURE_REG_1),
    tap((res) => {
      //console.log("FailureReg1$ res", res);
      
    })
  );


  // register #2
  @Effect()
  submitReg2$ = this.actions$
    .pipe(
    ofType(pageActions.SUBMIT_REG_2),    
    map( (action: pageActions.SubmitReg2) => action.payload),
    switchMap(payload => {
        //console.log("EFFECTS SUBMIT_REG_2 payload", payload);

        // взять password и email из sessStorage или из Store
        // берем из store

        //console.log("ПЕРЕДАЕМ PASS, EMAIL B REGISTER FULL", e + " + " + p);
        

        //return this.serverDataService.registerFull(payload, e, p).pipe(
        return this.serverDataService.registerFull(payload).pipe(
          //tap( res => console.log('ответ на register Full', res) ),
          map( (res) => {
            //console.log("успешно REG2, получены dataAuth и имя кл-та") 
            return new pageActions.SuccessReg2({res: res}) 
          } ),
          catchError(error => of(new pageActions.FailureReg2(error.error.Message)) )
        )        
    })
    ); //pipe



  @Effect()
  SuccessReg2 = this.actions$.pipe(
    ofType(pageActions.SUCCESS_REG_2),
    map((action: pageActions.SuccessReg2) => action.payload),
    switchMap(payload => {

      //console.log("payload в EFFECTS SUCCESS_REG_2", payload);
      //console.log(payload.res.Content.authData);
      //console.log(payload.res.Content.user.firstName + " " + payload.res.Content.user.lastName);

      this.checkStorageService.setDataAuth(payload.res.Content.authData);

      return this.serverDataService.doAuthAllReq(pageActions.SUBMIT_AUTH, payload.res.Content.authData).pipe(
        //tap( res => console.log('ответ на doAuth после Success Reg 2', res) ),
        map( (res) => { return new pageActions.SuccessAuth({res1: res, res2: 'currentPageIsReg2'}) } ), //email: payload.email
        catchError(error => of(new pageActions.FailureAuth(error.error.Message)) )
      )
    })
    ); //pipe*/

  // здесь не нужен эффект, это действие в store
  @Effect({ dispatch: false })
  FailureReg2$ = this.actions$.pipe(
    ofType(pageActions.FAILURE_REG_2),
    tap((res) => {
      //console.log("FailureReg2$ res", res);
      
    })
  );


  // **************************************
  // TWO FACTOR
  
  @Effect()
  SubmitTwoFactor$ = this.actions$
  .pipe(
    ofType(pageActions.SUBMIT_TWO_FACTOR),    
    map( (action: pageActions.SubmitTwoFactor) => action.payload),
    switchMap(payload => {

        let aD = this.checkStorageService.getDataAuth();

        return this.serverDataService.doAuthAllReq(pageActions.SUBMIT_TWO_FACTOR, aD, payload.t).pipe(
          //tap( res => console.log('ответ на register Full', res) ),
          map( (res) => { 
            return new pageActions.SuccessTwoFactor({res: res}) 
          } ),
          catchError(error => of(new pageActions.FailureTwoFactor(error.error.Message)) )
        )        
    })
  ); //pipe

  @Effect()
  SuccessTwoFactor$ = this.actions$
  .pipe(
    ofType(pageActions.SUCCESS_TWO_FACTOR),    
    map( (action: pageActions.SuccessTwoFactor) =>  
      {
        

        /*if (a.twoFactorIsPassed) {
            return new pageActions.PassedTwoFactor({res: a.nextPage})      
        }
        else {
            // do nothing
            // приводит к ошибке
            return new pageActions.NotPassedTwoFactor({res: a.nextPage})
        }*/  

        let b = this.choosePageService.check(action.payload.res);
        return new pageActions.ChooseNextPage({res1: b, res2: 'currentPageIsTwoFactor' })      
                
      }
    ),
  ); //pipe

  // здесь не нужен эффект, это действие в store
  @Effect({ dispatch: false })
  FailureTwoFactor$ = this.actions$.pipe(
    ofType(pageActions.FAILURE_TWO_FACTOR),
    tap((res) => {
      //console.log("FailureTwoFactor$", res);
      
    })
  );


  // здесь не нужен эффект
  @Effect({ dispatch: false })
  ChooseNextPage$ = this.actions$.pipe(
    ofType(pageActions.CHOOSE_NEXT_PAGE),
    tap((res:any) => {

      //console.log('effects CHOOSE_NEXT_PAGE');
      //console.log('RES', res);
      //console.log('res.payload.res', res.payload.res);

      // 2 factor
      if (res.payload.res2 === 'currentPageIsTwoFactor' && res.payload.res1.twoFactorShow) {
        // ничего не делать
        //console.log("НИЧЕГО НЕ ДЕЛАТЬ, остаться на странице Two Factor");
      }
      else if (res.payload.res1.twoFactorShow) {
        // показать two factor
        //console.log("ПЕРЕЙТИ НА СТРАНИЦУ TWO FACTOR")
        this.router.navigate([pageNames.main + '/' + res.payload.res1.pageNameToShow]);
      }

      // sms verific
      if (res.payload.res2 === 'currentPageIsSmsVerification' && res.payload.res1.smsVerifShow) {
        // ничего не делать
        //console.log("НИЧЕГО НЕ ДЕЛАТЬ, осаться на смс верификации");
      }
      else if (res.payload.res1.smsVerifShow) {
        // показать sms verif
        //console.log("ПЕРЕЙТИ НА СТРАНИЦУ смс верификации")
        this.router.navigate([pageNames.main + '/' + res.payload.res1.pageNameToShow]);
      }

      // clientarea
      if (res.payload.res1.clientareaShow) {
          this.router.navigate([pageNames.main + '/' + res.payload.res1.pageNameToShow]); 
      }

      // что сдесь если не надо переходить на другую страницу
      //this.router.navigate([pageNames.main + '/' + res.payload.res]);      
      
    })
  );



  // здесь не нужен эффект, это действие в store
  /*@Effect({ dispatch: false })
  PassedTwoFactor$ = this.actions$.pipe(
    ofType(pageActions.PASSED_TWO_FACTOR),
    tap((res:any) => {

      console.log('effects PASSED_TWO_FACTOR');
      console.log('RES', res);
      //console.log('res.payload.res', res.payload.res);

      // что сдесь если не надо переходить на другую страницу
      this.router.navigate([pageNames.main + '/' + res.payload.res]);      
      
    })
  );*/

  


  /*@Effect({ dispatch: false })
  NotPassedTwoFactor$ = this.actions$.pipe(
    ofType(pageActions.NOT_PASSED_TWO_FACTOR),
    tap((res) => {
      console.log("NotPassedTwoFactor$", res);
      
    })
  );*/


  // **************************************
  // SMS VERIFICATION
  
  @Effect()
  SubmitSmsVerification$ = this.actions$
  .pipe(
    ofType(pageActions.SUBMIT_SMS_VERIFICATION),    
    map( (action: pageActions.SubmitSmsVerification) => action.payload),
    switchMap(payload => {

        let aD = this.checkStorageService.getDataAuth();

        return this.serverDataService.doAuthAllReq(pageActions.SUBMIT_SMS_VERIFICATION, payload.t).pipe(
          map( (res) => { 
            return new pageActions.SuccessSmsVerification({res: res}) 
          } ),
          catchError(error => of(new pageActions.FailureSmsVerification(error.error.Message)) )
        )        
    })
  ); //pipe

  @Effect()
  SuccessSmsVerification$ = this.actions$
  .pipe(
    ofType(pageActions.SUCCESS_SMS_VERIFICATION),    
    map( (action: pageActions.SuccessSmsVerification) =>  
      {
        /*if (a.twoFactorIsPassed) {
            return new pageActions.PassedTwoFactor({res: a.nextPage})      
        }
        else {
            // do nothing
            // приводит к ошибке
            return new pageActions.NotPassedTwoFactor({res: a.nextPage})
        }*/ 

        //console.log('SuccessSmsVerification$'); 

        let b = this.choosePageService.check(action.payload.res); 
        return new pageActions.ChooseNextPage({res1: b, res2: 'currentPageIsSmsVerification' })      
                
      }
    ),
  ); //pipe

  // здесь не нужен эффект, это действие в store
  @Effect({ dispatch: false })
  FailureSmsVerification$ = this.actions$.pipe(
    ofType(pageActions.FAILURE_TWO_FACTOR),
    tap((res) => {
      //console.log("FailureSmsVerification$", res);
      
    })
  );

  // UPDATE PHONE NUMBER  
  @Effect()
  SubmitNewPhone$ = this.actions$
  .pipe(
    ofType(pageActions.SUBMIT_NEW_PHONE),    
    map( (action: pageActions.SubmitNewPhone) => action.payload),
    switchMap(payload => {

        let aD = this.checkStorageService.getDataAuth();

        return this.serverDataService.doAuthAllReq(pageActions.SUBMIT_NEW_PHONE, aD, payload.s).pipe(
          map( (res) => { 
            return new pageActions.SuccessNewPhone({res: res}) 
          } ),
          catchError(error => of(new pageActions.FailureNewPhone(error.error.Message)) )
        )        
    })
  ); //pipe

  // здесь не нужен эффект, это действие в store
  @Effect({ dispatch: false })
  SuccessNewPhone$ = this.actions$.pipe(
    ofType(pageActions.SUCCESS_NEW_PHONE),
    tap((res) => {
      //console.log("SuccessNewPhone$", res);      
    })
  );

  // здесь не нужен эффект, это действие в store
  @Effect({ dispatch: false })
  FailureNewPhone$ = this.actions$.pipe(
    ofType(pageActions.FAILURE_NEW_PHONE),
    tap((res) => {
      //console.log("FailureNewPhone$", res);      
    })
  );


  // NEW TOKEN  
  @Effect()
  SubmitNewToken$ = this.actions$
  .pipe(
    ofType(pageActions.SUBMIT_NEW_TOKEN),    
    map( (action: pageActions.SubmitNewToken) => action.payload),
    switchMap(payload => {

        let aD = this.checkStorageService.getDataAuth();

        return this.serverDataService.doAuthAllReq(pageActions.SUBMIT_NEW_TOKEN).pipe(
          map( (res) => { 
            return new pageActions.SuccessNewToken({res: res}) 
          } ),
          catchError(error => of(new pageActions.FailureNewToken(error.error.Message)) )
        )        
    })
  ); //pipe

  // здесь не нужен эффект, это действие в store
  @Effect({ dispatch: false })
  SuccessNewToken$ = this.actions$.pipe(
    ofType(pageActions.SUCCESS_NEW_TOKEN),
    tap((res) => {
      //console.log("SuccessNewToken$", res);      
    })
  );

  // здесь не нужен эффект, это действие в store
  @Effect({ dispatch: false })
  FailureNewToken$ = this.actions$.pipe(
    ofType(pageActions.FAILURE_NEW_TOKEN),
    tap((res) => {
      //console.log("FailureNewToken$", res);      
    })
  );
}