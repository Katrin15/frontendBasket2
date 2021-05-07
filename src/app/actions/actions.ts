import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { Page } from './../data-models/page.model'

export const DO_LOGIN    = '[PAGE] Login'
export const DO_REG_1    = '[PAGE] Reg_1'
export const DO_REG_2    = '[PAGE] Reg_2'
export const DO_TWO_FACTOR  = '[PAGE] Two_factor'
export const DO_SMS_VERIFICATION = '[PAGE] Sms_verification'
export const DO_LOGOUT 	= '[PAGE] Logout'


export class DoLogin implements Action {
    readonly type = DO_LOGIN
    constructor(public payload: any) {}
    //constructor(public payload: Tutorial) {}
}
export class DoReg1 implements Action {
    readonly type = DO_REG_1
    constructor(public payload: any) {}
}
export class DoReg2 implements Action {
    readonly type = DO_REG_2
    constructor(public payload: any) {}
}
export class DoTwoFactor implements Action {
    readonly type = DO_TWO_FACTOR
    constructor(public payload: any) {}
}
export class DoSmsVerification implements Action {
    readonly type = DO_SMS_VERIFICATION
    constructor(public payload: any) {}
}
export class DoLogOut implements Action {
    readonly type = DO_LOGOUT
    constructor(public payload: any) {}
}


export type Actions = DoLogin 
| DoReg1
| DoReg2
| DoTwoFactor
| DoSmsVerification
| DoLogOut