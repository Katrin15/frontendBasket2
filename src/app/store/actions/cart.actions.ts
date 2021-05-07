import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { Page } from '../../data-models/page.model'




// состояние из 2х свойств:
// логин\не логин и url 

// действие - польпоказать страницу И нажать кнопку
export const SHOW_LOGIN    = '[PAGE] Show_login'

export const IS_LOGINED            = '[PAGE] Is_logined'
export const SUCCESS_IS_LOGINED    = '[PAGE] Success_is_logined'
export const FAILURE_IS_LOGINED    = '[PAGE] Failure_is_logined'

export const GET_BASKET        = '[PAGE] Get_basket'
export const SUCCESS_BASKET    = '[PAGE] Success_basket'
export const FAILURE_BASKET    = '[PAGE] Failure_basket'

export const REMOVE_BASKET    = '[PAGE] Remove_basket'
export const SUCCESS_REMOVE_BASKET    = '[PAGE] Success_remove_basket'
export const FAILURE_REMOVE_BASKET    = '[PAGE] Failure_remove_basket'

export const SUBMIT_BUY    = '[PAGE] Submit_buy'
export const SUCCESS_BUY    = '[PAGE] Success_buy'
export const FAILURE_BUY    = '[PAGE] Failure_buy'
export const TO_BILLING_URL    = '[PAGE] To_billing_url'

export const SUBMIT_LOGIN    = '[PAGE] Submit_login'
export const SUCCESS_LOGIN    = '[PAGE] Success_login'
export const FAILURE_LOGIN    = '[PAGE] Failure_login'


export const SUBMIT_AUTH    = '[PAGE] Submit_auth'
export const SUCCESS_AUTH    = '[PAGE] Success_auth'
export const FAILURE_AUTH    = '[PAGE] Failure_auth'


export const SHOW_REG_1    = '[PAGE] Show_reg_1'
export const SUBMIT_REG_1    = '[PAGE] Submit_reg_1'
export const SUCCESS_REG_1    = '[PAGE] Success_reg_1'
export const FAILURE_REG_1    = '[PAGE] Failure_reg_1'


export const GET_PAY_M    = '[PAGE] Get_pay_m'
export const SUCCESS_PAY_M    = '[PAGE] Success_pay_m'
export const FAILURE_PAY_M    = '[PAGE] Failure_pay_m'


export const SHOW_REG_2    = '[PAGE] Show_reg_2'
export const SUBMIT_REG_2    = '[PAGE] Submit_reg_2'
export const SUCCESS_REG_2    = '[PAGE] Success_reg_2'
export const FAILURE_REG_2    = '[PAGE] Failure_reg_2'


export const SHOW_TWO_FACTOR  = '[PAGE] Show_two_factor'
export const SUBMIT_TWO_FACTOR  = '[PAGE] Submit_two_factor'
export const SUCCESS_TWO_FACTOR  = '[PAGE] Success_two_factor'
export const FAILURE_TWO_FACTOR  = '[PAGE] Failure_two_factor'
export const PASSED_TWO_FACTOR  = '[PAGE] Passed_two_factor'
export const NOT_PASSED_TWO_FACTOR  = '[PAGE] Not_Passed_two_factor'

export const SHOW_SMS_VERIFICATION = '[PAGE] Show_sms_verification'
export const SUBMIT_SMS_VERIFICATION = '[PAGE] Submit_sms_verification'
export const SUCCESS_SMS_VERIFICATION = '[PAGE] Success_sms_verification'
export const FAILURE_SMS_VERIFICATION = '[PAGE] Failure_sms_verification'


export const SHOW_CLIENTAREA = '[PAGE] Clientarea'

export const SUBMIT_LOGOUT = '[PAGE] Submit_Logout'
export const SUCCESS_LOGOUT = '[PAGE] Success_Logout'
export const FAILURE_LOGOUT = '[PAGE] Failure_Logout'

export const SUBMIT_AUTH_LOGOUT = '[PAGE] Submit_Auth_Logout'
export const SUCCESS_AUTH_LOGOUT = '[PAGE] Success_Auth_Logout'
export const FAILURE_AUTH_LOGOUT = '[PAGE] Failure_Auth_Logout'

//export const SHOW_LOGOUT 	= '[PAGE] Logout'

// запросить генерация нового токена
export const SUBMIT_NEW_TOKEN = '[PAGE] Submit_new_token'
export const SUCCESS_NEW_TOKEN = '[PAGE] Success_new_token'
export const FAILURE_NEW_TOKEN = '[PAGE] Failure_new_token'

// обновление номера на этапе smsVerif
export const SUBMIT_NEW_PHONE = '[PAGE] Submit_new_phone'
export const SUCCESS_NEW_PHONE = '[PAGE] Success_new_phone'
export const FAILURE_NEW_PHONE = '[PAGE] Failure_new_phone'


// выбрать следующую страницу
export const CHOOSE_NEXT_PAGE = '[PAGE] Choose_Next_Page'

//1
export class ShowLogin implements Action {
    readonly type = SHOW_LOGIN
    constructor(public payload: any) {}
    //constructor(public payload: Tutorial) {}
}

export class IsLogined implements Action { readonly type = IS_LOGINED; constructor(public payload: any) {} }
export class SuccessIsLogined implements Action { readonly type = SUCCESS_IS_LOGINED; constructor(public payload: any) {} }
export class FailureIsLogined implements Action { readonly type = FAILURE_IS_LOGINED; constructor(public payload: any) {} }

export class GetBasket implements Action { readonly type = GET_BASKET; constructor(public payload: any) {} }
export class SuccessBasket implements Action { readonly type = SUCCESS_BASKET; constructor(public payload: any) {} }
export class FailureBasket implements Action { readonly type = FAILURE_BASKET; constructor(public payload: any) {} }

export class RemoveBasket implements Action { readonly type = REMOVE_BASKET; constructor(public payload: any) {} }
export class SuccessRemoveBasket implements Action { readonly type = SUCCESS_REMOVE_BASKET; constructor(public payload: any) {} }
export class FailureRemoveBasket implements Action { readonly type = FAILURE_REMOVE_BASKET; constructor(public payload: any) {} }

export class SubmitBuy implements Action { readonly type = SUBMIT_BUY; constructor(public payload: any) {} }
export class SuccessBuy implements Action { readonly type = SUCCESS_BUY; constructor(public payload: any) {} }
export class FailureBuy implements Action { readonly type = FAILURE_BUY; constructor(public payload: any) {} }
export class ToBillingUrl implements Action { readonly type = TO_BILLING_URL; constructor(public payload: any) {} }

export class SubmitLogin implements Action { readonly type = SUBMIT_LOGIN; constructor(public payload: any) {} }
export class SuccessLogin implements Action { readonly type = SUCCESS_LOGIN; constructor(public payload: any) {} }
export class FailureLogin implements Action { readonly type = FAILURE_LOGIN; constructor(public payload: any) {} }

export class SubmitAuth implements Action { readonly type = SUBMIT_AUTH; constructor(public payload: any) {} }
export class SuccessAuth implements Action { readonly type = SUCCESS_AUTH; constructor(public payload: any) {} }
export class FailureAuth implements Action { readonly type = FAILURE_AUTH; constructor(public payload: any) {} }

//2
export class ShowReg1 implements Action {
    readonly type = SHOW_REG_1
    constructor(public payload: any) {}
}
export class SubmitReg1 implements Action { readonly type = SUBMIT_REG_1; constructor(public payload: any) {} }
export class SuccessReg1 implements Action { readonly type = SUCCESS_REG_1; constructor(public payload: any) {} }
export class FailureReg1 implements Action { readonly type = FAILURE_REG_1; constructor(public payload: any) {} }

//2a
export class GetPayM implements Action { readonly type = GET_PAY_M; constructor(public payload: any) {} }
export class SuccessPayM implements Action { readonly type = SUCCESS_PAY_M; constructor(public payload: any) {} }
export class FailurePayM implements Action { readonly type = FAILURE_PAY_M; constructor(public payload: any) {} }

//3
export class ShowReg2 implements Action {
    readonly type = SHOW_REG_2
    constructor(public payload: any) {}
}
export class SubmitReg2 implements Action {
    readonly type = SUBMIT_REG_2
    constructor(public payload: any) {}
}
export class SuccessReg2 implements Action { readonly type = SUCCESS_REG_2; constructor(public payload: any) {} }
export class FailureReg2 implements Action { readonly type = FAILURE_REG_2; constructor(public payload: any) {} }

//4
export class ShowTwoFactor implements Action {
    readonly type = SHOW_TWO_FACTOR
    constructor(public payload: any) {}
}
export class SubmitTwoFactor implements Action { readonly type = SUBMIT_TWO_FACTOR; constructor(public payload: any) {} }
export class SuccessTwoFactor implements Action { readonly type = SUCCESS_TWO_FACTOR; constructor(public payload: any) {} }
// ПРОВЕРИТЬ - следующие 2 не нужны !!?
export class PassedTwoFactor implements Action { readonly type = PASSED_TWO_FACTOR; constructor(public payload: any) {} }
export class NotPassedTwoFactor implements Action { readonly type = NOT_PASSED_TWO_FACTOR; constructor(public payload: any) {} }
export class FailureTwoFactor implements Action { readonly type = FAILURE_TWO_FACTOR; constructor(public payload: any) {} }

//5
export class ShowSmsVerification implements Action {
    readonly type = SHOW_SMS_VERIFICATION
    constructor(public payload: any) {}
}
export class SubmitSmsVerification implements Action { readonly type = SUBMIT_SMS_VERIFICATION; constructor(public payload: any) {} }
export class SuccessSmsVerification implements Action { readonly type = SUCCESS_SMS_VERIFICATION; constructor(public payload: any) {} }
export class FailureSmsVerification implements Action { readonly type = FAILURE_SMS_VERIFICATION; constructor(public payload: any) {} }


export class SubmitNewToken implements Action { readonly type = SUBMIT_NEW_TOKEN; constructor(public payload: any) {} }
export class SuccessNewToken implements Action { readonly type = SUCCESS_NEW_TOKEN; constructor(public payload: any) {} }
export class FailureNewToken implements Action { readonly type = FAILURE_NEW_TOKEN; constructor(public payload: any) {} }



export class SubmitNewPhone implements Action { readonly type = SUBMIT_NEW_PHONE; constructor(public payload: any) {} }
export class SuccessNewPhone implements Action { readonly type = SUCCESS_NEW_PHONE; constructor(public payload: any) {} }
export class FailureNewPhone implements Action { readonly type = FAILURE_NEW_PHONE; constructor(public payload: any) {} }
//6
export class ShowClientarea implements Action {
    readonly type = SHOW_CLIENTAREA
    constructor(public payload: any) {}
}
export class SubmitLogout implements Action { readonly type = SUBMIT_LOGOUT; constructor(public payload: any) {} }
export class SuccessLogout implements Action { readonly type = SUCCESS_LOGOUT; constructor(public payload: any) {} }
export class FailureLogout implements Action { readonly type = FAILURE_LOGOUT; constructor(public payload: any) {} }

export class SubmitAuthLogout implements Action { readonly type = SUBMIT_AUTH_LOGOUT; constructor(public payload: any) {} }
export class SuccessAuthLogout implements Action { readonly type = SUCCESS_AUTH_LOGOUT; constructor(public payload: any) {} }
export class FailureAuthLogout implements Action { readonly type = FAILURE_AUTH_LOGOUT; constructor(public payload: any) {} }


export class ChooseNextPage implements Action { readonly type = CHOOSE_NEXT_PAGE; constructor(public payload: any) {} }



export type Actions = | IsLogined | SuccessIsLogined | FailureIsLogined
| GetBasket | SuccessBasket | FailureBasket
| RemoveBasket | SuccessRemoveBasket | FailureRemoveBasket
| SubmitBuy | SuccessBuy | FailureBuy | ToBillingUrl
| ShowLogin | SubmitLogin | SuccessLogin | FailureLogin
| SubmitAuth | SuccessAuth | FailureAuth
| ShowReg1 | SubmitReg1 | SuccessReg1 | FailureReg1
| GetPayM | SuccessPayM | FailurePayM
| ShowReg2 | SubmitReg2 | SuccessReg2 | FailureReg2
| ShowTwoFactor | SubmitTwoFactor | SuccessTwoFactor  | FailureTwoFactor  | PassedTwoFactor | NotPassedTwoFactor
| SubmitNewToken | SuccessNewToken | FailureNewToken 
| SubmitNewPhone | SuccessNewPhone | FailureNewPhone
| ShowSmsVerification | SubmitSmsVerification | SuccessSmsVerification | FailureSmsVerification
| ShowClientarea 
| SubmitLogout | SuccessLogout | FailureLogout
| SubmitAuthLogout | SuccessAuthLogout | FailureAuthLogout
| ChooseNextPage