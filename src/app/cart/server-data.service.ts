import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { environment } from '../../environments/environment';


import  * as pageNames from '../data-models/page-names';

//test
import  { User } from '../data-models/user';

import { CheckStorageService } from '../cart/check-storage.service';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const httpOptionsCors = {
  headers: new HttpHeaders({
    //'Content-Type':  'application/json',
    //'Access-Control-Allow-Origin': '*',
  }),
  withCredentials: true,
}

@Injectable({
  providedIn: 'root'
})
export class ServerDataService {

  private basketUrl = "/api/v1/client/basket";
  private authUrl = "/api/v1/client/auth";  
  private bUrl = 'https://bill.hostkey.com'; // по умолчанию - боевой билинг
  //private bUrl = "https://bill.hostkey.com";

  

  constructor(private http: HttpClient, private checkStorageService: CheckStorageService) { 
      if (this.checkStorageService.forBillUrl()) {
        let u = localStorage.getItem("hKWhmcsUrl");
        if (u == null) {
          this.bUrl = 'https://bill.hostkey.com';
          //alert('bUrl по умолч' + this.bUrl);  
        }
        else {
          this.bUrl = u;
          //alert('bUrl из storage' + this.bUrl);  
        }        
      }
      else {
        this.bUrl = 'https://bill.hostkey.com';
        //alert('bUrl по умолч' + this.bUrl);
      }
  }


  // тестовая ф-ция
  // решить, (пока что) login или logined area показывать
  // shopping-cart/register
  // без shopping-cart/ - не работает
  // ф-цию можно вызывать и из cart (основной родительский компонент ) 
  // и из cart-ptoduct list - род компонет с точки зрения router для login/register/cl area
  setUrl() {
  	let url:string = pageNames.main + '/' + pageNames.clientarea; //clientarea 
  	return url;
  }


  

  getLogined(): Observable<any> {

      if (environment.production) {
        //console.log("environment", environment);

        return this.http.get(this.authUrl, httpOptions).pipe(
          //tap(res => console.log('fetched data', res)),
          map( res => res ),
          catchError(this.handleError('get Logined ', []))
         )        
      }
      else {
        return this.http.get("/assets/Unauthorized_client.json").pipe(
          //tap(res => console.log('fetched data', res)),
          map( res => res ),
          catchError(this.handleError('get Logined ', []))
        )
      }       
  };

  isLogined() {    
    return this.http.get(this.authUrl, httpOptions) 
  }

  //LOGIN
  // /api/v1/client/auth
  login(p) {
    let data = JSON.stringify({
          "Name": "Авторизация пользователя в биллинге",
          "Uri": "",
          "User": {
              "email": p.e,
              "password2": p.p
          } 
    });
    //console.log("email, password в put-запросе, login")
    return this.http.put(this.authUrl, data, httpOptions)
      //.pipe(
      //tap(res => console.log('ответ на login', res)),
      //map( res => res ),
      //catchError(this.handleError('ответ на login ', []))
      //)  
  }

  logout(p) {
    return this.http.delete(this.authUrl, httpOptions)     
  }


  // DO AUTH B BILLING (IMMEDIATELY AFTER LOGIN)
  // CORS !
  // https://dev.hostkey.com
  // работает
  doAuth(aD) {

    //console.log("dataAuth в СЕРВИСЕ", aD);    
    let params = 'payload=' + encodeURIComponent(aD);    
    return this.http.get(this.bUrl + '/doauth.php?' + params, httpOptionsCors);
  }

  // расширенная ф-ция DO AUTH
  // 1) payload = authData
  // 2) отправить токен twoFactor 
  //      payload = authData, smsСode
  // 3) отправить токен smsVerif:
  //     verifyCode   внимание - без payload = authData ?
  // 4) генерация нового токена (уточнить для twoFactor или smsVerif)
  //      ?resend
  // 5) обновление номера на этапе smsVerif
  //      payload = authData, newNumber=+  внимание - номер с "+"

  doAuthAllReq(action, param1?, param2?) {

    let authData = param1;
    let smsCode = param2;
    let verifyCode = param1;
    let newNumber = param2;

    let params:string;
    let dateTime = this.getTimeForCash();

    //console.log("doAuthAllReq ACTION", action);

    switch (action) {

      // 1
      case "[PAGE] Submit_auth":
          params = 'payload=' + encodeURIComponent(authData);    
          return this.http.get(this.bUrl + '/doauth.php?' + params, httpOptionsCors); 
      //break;

      // 2
      case "[PAGE] Submit_two_factor":
        params = 'payload=' + encodeURIComponent(authData) + '&smsCode=' + encodeURIComponent(smsCode) + '&cash=' + encodeURIComponent(dateTime);    
        return this.http.get(this.bUrl + '/doauth.php?' + params, httpOptionsCors); 
      

      // 3
      // authData тут не нужна почему-то
      case "[PAGE] Submit_sms_verification":
        params = 'verifyCode=' + encodeURIComponent(verifyCode);    
        return this.http.get(this.bUrl + '/doauth.php?' + params, httpOptionsCors);
      

      // 4
      case "[PAGE] Submit_new_token":
        params = 'resend';
        return this.http.get(this.bUrl + '/doauth.php?' + params, httpOptionsCors);      

      // 5
      case "[PAGE] Submit_new_phone":
        params = 'payload=' + encodeURIComponent(authData) + '&newNumber=' + encodeURIComponent(newNumber);
        return this.http.get(this.bUrl + '/doauth.php?' + params, httpOptionsCors);

      // 6
      case "[PAGE] Submit_Auth_Logout":
        params = 'logout';
        //console.log('zdes');
        return this.http.get(this.bUrl + '/doauth.php?' + params, httpOptionsCors);  
      
      default:
        // code...
      break;
    }

  }

  getTimeForCash() {
      let currentdate = new Date(); 
      let datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

      //console.log("datetime ", datetime);
      return datetime;
  }


  //REGISTER 1
  // /api/v1/client/auth
  register(e) {
    let data = JSON.stringify({
          "type": 1,
          "Name": "Регистрация нового пользователя в биллинге",
          "Uri": "",
          "User": {
              "email": e,
          } 
      });
    //console.log("email, type1, register")
    return this.http.post("/api/v1/client/auth", data, httpOptions)
  }

  // GET PAYMENT METHODS FOR REGISTER2
  payMethods() {    
    let url = '/api/v1/client/basket' + '?act=PaymentMethods';    
    return this.http.get(url, httpOptions);
  }


  //REGISTER 2
  // /api/v1/client/auth  POST   
  registerFull(pl) {  //pl, e, p
    //console.log("ДАННЫЕ ДЛЯ ПОЛНОЙ РЕГИСТРАЦИИ", pl);
    //console.log("ДАННЫЕ ДЛЯ ПОЛНОЙ РЕГИСТРАЦИИ", e);
    //console.log("ДАННЫЕ ДЛЯ ПОЛНОЙ РЕГИСТРАЦИИ", p);


    let data = JSON.stringify({
          "type": 2,
          "Name": "Регистрация нового пользователя в биллинге",
          "Uri": "",
          "User": {
              "email": pl.e,
              "password2": pl.p,

              "firstname": pl.form.firstName,
              "lastname": pl.form.lastName,

              //"address1": pl.form.address,
              "address1": pl.a1,
              "address2": pl.a2,
              "city": pl.form.city,
              "companyname": pl.form.companyName,
              
              "postcode": pl.form.zipCode,
              "country": pl.form.country.short,
              
              
              "secretword": pl.form.secretWord,
              "vatID": pl.form.vat,
              "paymentmethod": pl.form.payM,
              "groupid": 50,  // что это, где брать

              "phonenumber": pl.ph,
              "smsnumber": pl.s,

              "legalEntity": pl.lE,
          } 
      });
    
    return this.http.post("/api/v1/client/auth", data, httpOptions)
  }



// **
// BASKET
// пока НЕ через store
getBasket() {

    if (environment.production) {
        /*return this.http.get(this.basketUrl, httpOptions)
        .pipe(
          tap(res => console.log('содержимое корзины', res)),
          map( res => res),
          catchError(this.handleError('ответ на login ', []))
        )*/


      return this.http.get(this.basketUrl, httpOptions) 

    }
    else {
        /*return this.http.get("/assets/data/products_ok.json")
        .pipe(
          tap(res => console.log('содержимое корзины', res))
        )*/

        return this.http.get("/assets/data/products_ok2.json")
    }    
  }

  removeBasketItem(i) {
    //console.log('i', i);
    let params = '?key=' + i;
    return this.http.delete(this.basketUrl + params, httpOptions)
  }

  // вызывается из этого же сервиса
  buy(p) {
    let data = JSON.stringify({
          "Name": "Оформление заказа в биллинге",
          "Uri": "",
          "Notes": p.comments,
          "Promocode": p.promocode
    });
    //console.log("buy DATA", data);
    return this.http.post(this.basketUrl, data, httpOptions)
  }

  //
  getBUrl() {
    return this.bUrl;
  }






   /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
