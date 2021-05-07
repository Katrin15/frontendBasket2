import { Action } from '@ngrx/store'
import { Page } from '../../data-models/page.model'
import * as PageActions from './../actions/cart.actions'


const initialState: Page = {
    url: 'login',

    errorServerMessageLogin:'',
    errorServerMessageReg1:'',
    errorServerMessageReg2:'',


    logined: false,
    authData: '',
    name: '',
    billingAuth: false,

    failureLogin: false,
    failureReg1: false,
    failureReg2: false,
    failureBuy: false,

    smsNumber: '',

    password: '',
    email: '',

    reg1: false,
    reg2: false,

    errorServerMessagePayM:'',
    paymentMethods: '',

    errorMessageSmsVerification: false,
    errorMessageNewPhone: false,
    errorMessageNewToken: false,

    // выбор страницы - login, reg1, reg2
    // либо reg1 показывается, либо reg2. 
    // После перехода на sms verif - reg1 и reg2 запрещается до нажатия logout
    regStep: 1,


    // при запросе корзины - true, при получении ответа - false
    // для loader
    getBasket: false,

}

// сначала происходит EFFECTS
export function reducer(state: Page = initialState, action: PageActions.Actions) {

    
    // здесь не все действия, часть в effects
    switch(action.type) {

        case PageActions.SUCCESS_IS_LOGINED:
            /*console.log("A) reducer SUCCESS_IS_LOGINED");
            console.log("B) reducer payload", action.payload);
            console.log("C) reducer returns", { ...state, name: action.payload.res.Content.fullname, });*/
            return {
                ...state,      
                name: action.payload.res.Content.fullname,          
        };

        case PageActions.GET_BASKET:
            /*console.log("A) reducer GET_BASKET");
            console.log("B) reducer payload", action.payload);
            console.log("C) reducer returns", { ...state,     
                getBasket: true, });*/
            return {
                ...state,     
                getBasket: true,           
        };

        case PageActions.SUCCESS_BASKET:
            /*console.log("A) reducer SUCCESS_BASKET");
            console.log("B) reducer payload", action.payload);
            console.log("C) reducer returns", { ...state,
                basketContent: action.payload,
                getBasket: false,});*/
            return {
                ...state,
                basketContent: action.payload,
                getBasket: false,
        };

        case PageActions.FAILURE_BASKET:
            /*console.log("A) reducer FAILURE_BASKET");
            console.log("B) reducer payload", action.payload);
            console.log("C) reducer returns", { ...state,
                errorServerMessageBasket: action.payload,
                getBasket: false,});*/
            return {
                ...state,
                errorServerMessageBasket: action.payload,
                getBasket: false,
        };

        case PageActions.REMOVE_BASKET:
            /*console.log("A) reducer REMOVE_BASKET");
            console.log("B) reducer payload", action.payload);
            console.log("C) reducer returns", { ...state });*/
            return {
                ...state,                
        };

        /*case PageActions.SUCCESS_REMOVE_BASKET:
            console.log("A) reducer SUCCESS_REMOVE_BASKET");
            console.log("B) reducer payload", action.payload);
            console.log("C) reducer returns", { ...state});
            return {
                ...state,
        };*/

        case PageActions.FAILURE_REMOVE_BASKET:
            /*console.log("A) reducer FAILURE_REMOVE_BASKET");
            console.log("B) reducer payload", action.payload);
            console.log("C) reducer returns", { ...state, errorServerMessageRemoveBasket: action.payload});*/
            return {
                ...state,
                errorServerMessageRemoveBasket: action.payload,
        };


        case PageActions.SUBMIT_BUY:
            /*console.log("A) reducer SUBMIT_BUY");
            console.log("B) reducer payload", action.payload);
            console.log("C) reducer returns", { ...state });*/
            return {
                ...state, 
                //failureBuy: false,               
        };

        case PageActions.SUCCESS_BUY:
            /*console.log("A) reducer SUCCESS_BUY");
            console.log("B) reducer payload", action.payload);
            console.log("C) reducer returns", { ...state });*/
            return {
                ...state,
                failureBuy: false,
        };

        case PageActions.FAILURE_BUY:
            /*console.log("A) reducer FAILURE_BUY");
            console.log("B) reducer payload", action.payload);
            console.log("C) reducer returns", { ...state, errorServerMessageBuy: action.payload });*/
            return {
                ...state,
                errorServerMessageBuy: action.payload,
                failureBuy: true,
        };


        case PageActions.SHOW_LOGIN:
            return { url: 'login' }; //[...state, action.payload]; payload - где-то нужен

        case PageActions.SHOW_REG_1:
            /*console.log("reducer show reg 1");
            console.log("reducer returns", { ...state, url: 'register1' });*/
            return {
                ...state,
                url: 'register1'
            };

        // tested
        case PageActions.FAILURE_LOGIN:
            /*console.log("A) reducer FAILURE_LOGIN");
            console.log("B) reducer payload", action.payload);
            console.log("C) reducer returns", { ...state,
                errorServerMessageLogin: action.payload, //'Incorrect email and/or password.' // если сервер не отвечает - udefined
                failureLogin: true,

                logined: false,
                billingAuth: false,});*/
            return {
                ...state,
                errorServerMessageLogin: action.payload, //'Incorrect email and/or password.' // если сервер не отвечает - udefined
                failureLogin: true,

                logined: false,
                billingAuth: false,
            };

        // 
        case PageActions.SUCCESS_LOGIN:
            /*console.log("A) reducer SUCCESS_LOGIN");
            console.log("B) reducer payload", action.payload);
            console.log("C) reducer returns", {...state,
                errorServerMessageLogin:'',

                logined: true,
                billingAuth: false,

                failureLogin: false,

                authData: action.payload.res.Content.authData,
                name: action.payload.res.Content.user.firstName + ' ' + action.payload.res.Content.user.lastName, });*/
            return {
                ...state,
                errorServerMessageLogin:'',

                logined: true,
                billingAuth: false,

                failureLogin: false,

                authData: action.payload.res.Content.authData,
                name: action.payload.res.Content.user.firstName + ' ' + action.payload.res.Content.user.lastName,
            };

        // BILLING AUTH
        case PageActions.SUCCESS_AUTH:
            /*console.log("A) reducer SUCCESS_AUTH");
            console.log("B) reducer payload", action.payload);
            console.log("C) reducer returns", {...state,
                billingAuth: true,
                failureLogin: false,
                errorServerMessageAuth: '',
                smsNumber: action.payload.res1.smsNumber});*/
            return {
                ...state,
                billingAuth: true,
                failureLogin: false,
                errorServerMessageAuth: '',
                smsNumber: action.payload.res1.smsNumber
            };

        case PageActions.FAILURE_AUTH:
            /*console.log("A) reducer FAILURE_AUTH");
            console.log("B) reducer payload", action.payload);
            console.log("C) reducer returns", {...state,
                billingAuth: false,
                failureLogin: true,
                errorServerMessageAuth: 'auth server not responding', });*/
            return {
                ...state,
                billingAuth: false,
                failureLogin: true,
                errorServerMessageAuth: 'auth server not responding',
            };


        // save pass
        case PageActions.SUBMIT_REG_1:
            /*console.log("A) reducer SUBMIT_REG_1");
            console.log("B) reducer payload", action.payload);
            console.log("C) reducer returns", { ...state,
                password: action.payload.password,
                email: action.payload.email,
                errorServerMessageReg1:'', 
                failureReg1: false,  });*/
            return {
                ...state,
                password: action.payload.password,
                email: action.payload.email,
                errorServerMessageReg1:'',   
                failureReg1: false,             
            };

        case PageActions.SUCCESS_REG_1:
            /*console.log("A) reducer SUCCESS_REG_1");
            console.log("B) reducer payload", action.payload);
            console.log("C) reducer returns", { ...state,
                errorServerMessageReg1:'',
                reg1: true,
                failureReg1: false,

                regStep: 2, });*/
            return {
                ...state,
                errorServerMessageReg1:'',
                reg1: true,
                failureReg1: false,

                regStep: 2,
            };

        case PageActions.FAILURE_REG_1:
            /*console.log("reducer FAILURE_REG_1");
            console.log("reducer payload", action.payload);
            console.log("reducer returns", { ...state,
                errorServerMessageReg1: action.payload,
                reg1: false,
                failureReg1: true,

                password: "",
                email: "",

                regStep: 1, });*/
            return {
                ...state,
                errorServerMessageReg1: action.payload,
                reg1: false,
                failureReg1: true,

                password: "",
                email: "",

                regStep: 1,
            };

        case PageActions.SUCCESS_PAY_M:
            /*console.log("A) reducer SUCCESS_PAY_M");
            console.log("B) reducer payload", action.payload);
            console.log("C) reducer returns", { ...state, errorServerMessagePayM:'', paymentMethods: action.payload, });*/
            return {
                ...state,
                errorServerMessagePayM:'',
                paymentMethods: action.payload,                
            };

        case PageActions.FAILURE_PAY_M:
            /*console.log("A) reducer FAILURE_PAY_M");
            console.log("B) reducer payload", action.payload);
            console.log("C) reducer returns", { ...state, errorServerMessagePayM: action.payload, });*/
            return {
                ...state,
                errorServerMessagePayM: action.payload,
                //paymentMethods:                 
            };



        case PageActions.SUBMIT_REG_2:
            /*console.log("A) reducer SUBMIT_REG_2");
            console.log("B) reducer payload", action.payload);
            console.log("C) reducer returns", { ...state,               
                
                errorServerMessageReg2:'',   
                failureReg2: false,  });*/
            return {
                ...state,               
                
                errorServerMessageReg2:'',   
                failureReg2: false,             
            };
        case PageActions.SUCCESS_REG_2:
            /*console.log("reducer SUCCESS_REG_2");
            console.log("reducer payload", action.payload);
            console.log("reducer returns", 
                { ...state, errorServerMessageReg2:'', reg2: true, authData: action.payload.res.Content.authData, 
                name: action.payload.res.Content.user.firstName + ' ' + action.payload.res.Content.user.lastName, 
                password: "", email: "", regStep: 3,});*/
            return {
                ...state,
                errorServerMessageReg2:'',

                reg2: true,
                reg1: false,

                failureReg2: false, 

                authData: action.payload.res.Content.authData,
                name: action.payload.res.Content.user.firstName + ' ' + action.payload.res.Content.user.lastName,

                password: "",
                email: "",

                regStep: 3,
            };

        case PageActions.FAILURE_REG_2:
            /*console.log("reducer FAILURE_REG_2");
            console.log("reducer payload", action.payload);
            console.log("reducer returns", { ...state, errorServerMessageReg2: action.payload, reg2: false, failureReg2: true, regStep: 2,});*/
            return {
                ...state,
                errorServerMessageReg2: action.payload,
                reg2: false,

                failureReg2: true, 

                regStep: 2,

                //password: "", ОСТАЮТСЯ!
                //email: "",
            };


        case PageActions.SUBMIT_LOGOUT:
            /*console.log("A) SUBMIT_LOGOUT");
            console.log("B) reducer payload", action.payload);
            console.log("C) reducer returns", { ...state,
                logined: true, 
                failureLogout: false, });*/
            return {
                ...state,
                logined: true, 
                failureLogout: false,               
            };
        case PageActions.FAILURE_LOGOUT:
            /*console.log("A) FAILURE_LOGOUT");
            console.log("B) reducer payload", action.payload);
            console.log("C) reducer returns", { ...state,
                logined: true,
                errorServerMessageLogout: action.payload,
                failureLogout: true, });*/
            return {
                ...state,
                logined: true,
                errorServerMessageLogout: action.payload,
                failureLogout: true,               
            };
        case PageActions.FAILURE_AUTH_LOGOUT:
            /*console.log("A) FAILURE_AUTH_LOGOUT");
            console.log("B) reducer payload", action.payload);
            console.log("C) reducer returns", {...state,
                logined: true,  
                errorServerMessageLogout: action.payload,
                failureLogout: true, });*/
            return {
                ...state,
                logined: true,  
                errorServerMessageLogout: action.payload,
                failureLogout: true,            
            };
        

        case PageActions.SUCCESS_AUTH_LOGOUT:
            /*console.log("A) SUCCESS_AUTH_LOGOUT");
            console.log("B) reducer payload", action.payload);
            console.log("C) reducer returns", { ...state,
                logined: false,    
                failureLogout: false,

                reg1: false,
                reg2: false,

                authData: '',
                name: '',

                password: '',
                email: '', 

                errorServerMessageLogin: '',
                errorServerMessageReg1: '',
                errorServerMessageReg2: '',
                errorServerMessageLogout: '',

                paymentMethods:'',

                regStep:1, 

                chooseNextState: undefined,
            });*/
            return {
                ...state,
                logined: false,    
                failureLogout: false,

                reg1: false,
                reg2: false,

                authData: '',
                name: '',

                password: '',
                email: '', 

                errorServerMessageLogin: '',
                errorServerMessageReg1: '',
                errorServerMessageReg2: '',
                errorServerMessageLogout: '',

                paymentMethods:'',

                regStep:1,

                chooseNextState: undefined,
            };


        case PageActions.FAILURE_TWO_FACTOR:
            /*console.log("A) FAILURE_TWO_FACTOR");
            console.log("B) reducer payload", action.payload);
            console.log("C) reducer returns", { ...state, errorServerMessageTwoFactor: action.payload });*/
            return {
                ...state,
                errorServerMessageTwoFactor: action.payload // ВНИМАНИЕ! СЕРВЕР НЕ ПРИСЫЛАЕТ ОШИБКУ DOAUTH
                
            };
        case PageActions.SUCCESS_TWO_FACTOR:
            /*console.log("A) SUCCESS_TWO_FACTOR");
            console.log("B) reducer payload", action.payload);
            console.log("C) reducer returns", { ...state });*/
            return {
                ...state,              
            };

        case PageActions.CHOOSE_NEXT_PAGE:
            /*console.log("A) CHOOSE_NEXT_PAGE");
            console.log("B) reducer payload", action.payload);
            console.log("C) reducer returns", { ...state, chooseNextState: action.payload });*/
            return {
                ...state,
                chooseNextState: action.payload           
            };


        // SMS VERIFICATION
        // ДОПИСАТЬ !!!
        case PageActions.SUCCESS_SMS_VERIFICATION:
            /*console.log("A) SUCCESS_SMS_VERIFICATION");
            console.log("B) reducer payload", action.payload);
            console.log("C) reducer returns", { ...state, regStep: 4, });*/
            return {
                ...state,
                regStep: 4,
            };
        case PageActions.FAILURE_SMS_VERIFICATION:
            /*console.log("A) FAILURE_SMS_VERIFICATION");
            console.log("B) reducer payload", action.payload);
            console.log("C) reducer returns", { ...state, errorMessageSmsVerification: true });*/
            return {
                ...state,
                errorMessageSmsVerification: true
            };
        case PageActions.SUCCESS_NEW_PHONE:
            /*console.log("A) SUCCESS_NEW_PHONE");
            console.log("B) reducer payload", action.payload);
            console.log("C) reducer returns", {  ...state, smsNumber: action.payload.res.smsNumber, errorMessageNewPhone: false });*/
            return {
                ...state,  
                smsNumber: action.payload.res.smsNumber,
                errorMessageNewPhone: false
            };
        case PageActions.FAILURE_NEW_PHONE:
            /*console.log("A) FAILURE_NEW_PHONE");
            console.log("B) reducer payload", action.payload);
            console.log("C) reducer returns", { ...state, errorMessageNewPhone: true });*/
            return {
                ...state,
                errorMessageNewPhone: true
            };

        case PageActions.SUCCESS_NEW_TOKEN:
            /*console.log("A) SUCCESS_NEW_TOKEN");
            console.log("B) reducer payload", action.payload);
            console.log("C) reducer returns", {  ...state, errorMessageNewToken: false });*/
            return {
                ...state,  
                errorMessageNewToken: false
            };
        case PageActions.FAILURE_NEW_TOKEN:
            /*console.log("A) FAILURE_NEW_TOKEN");
            console.log("B) reducer payload", action.payload);
            console.log("C) reducer returns", { ...state, errorMessageNewToken: true });*/
            return {
                ...state,
                errorMessageNewToken: true
            };


        default:
            //console.log("reducer default");
            return state;
    }
}

/*
какие есть действия, 
какие есть запросы, 
какие есть эффекты,
какие есть страницы

1)
КНОПКИ-ДЕЙСТВИЯ: 

submit_logIn

submit_reg1
submit_reg2

submit_twoFactor
submit_smsVerif

submit_logOut

submit_Buy

2)
СТРАНИЦЫ (состояния)

login

reg1
reg2

twoFactor
smsVerif

clientarea

3)


залогинен ли клиент? 
/api/v1/client/auth  GET - на сайт
    отправить: ничего
    получить: 
        - если не залогинен - ошибка, status code 409
        - если залогинен - имя клиента (fullName)


сделать логин
/api/v1/client/auth  PUT  - на сайт
    отправить: email, password2
    получить: имя клиента (firstName, lastName), authData***
    *** authData - сохранить в session storage


авторизироваться в билинге (сразу после успешного логина)
dev.hostkey.com/doauth  GET  
    отправить: payload = authData

    получить: что-то, от чего будет зависеть какую страницу дальше показать (twoFactor, smsVerif, clientArea)


отправить токен twoFactor
dev.hostkey.com/doauth
    отправить: payload = authData, smsСode

    получить: что-то

отправить токен smsVerif
dev.hostkey.com/doauth
    отправить: verifyCode   внимание - без payload = authData ?

    получить: что-то

генерация нового токена (уточнить для twoFactor или smsVerif)
dev.hostkey.com/doauth.php?resend
    отправить: ?resend


обновление номера на этапе smsVerif
dev.hostkey.com/doauth
    отправить: payload = authData, newNumber=+  внимание - номер с "+"


регистрация, шаг 1
/api/v1/client/auth  POST - на сайт
    отправить: user.email, type1. внимание, type1 вместо password, password запомнить отдельно
    получить: 
        - ошибку
        - без ошибки

регистрация, шаг 2**
/api/v1/client/auth  POST - на сайт
    отправить: user.email и все остальное, включая пароль, type2. внимание, type2
    получить: 
        - ошибку
        - без ошибки - authData, clientid, result = success, user.firstName, lastName
        {"Code":0,"Message":"","ErrorStatus":false,"Error":false,"Content":
        {"result":"success","clientid":13571,"user":{"firstName":"firstName","lastName":"lastName"},
        "authData":"xfP/uX2jJAElgz2P+t21EbhbImCKf9PxR+1FrAk6VZU+Hj3k3scbexRsRrCt6NNTgU4gS8TNcA=="}}

**авторизироваться в билинге (сразу после успешной регистрации)


payment method
api/v1/client/basket?act=PaymentMethods  GET - на сайт 


получить корзину
/api/v1/client/basket  GET - на сайт
    отправить: ничего
    получить:
    {"Code":0,"Message":"","ErrorStatus":false,"Error":false,"Content":{"totalPrice":0,"totalPriceWithTax":0,"items":[],"currency":"EUR"}}


выйти
/api/v1/client/auth DELETE - на сайт
    отправить: ничего
    получить:
    {"Code":0,"Message":"","ErrorStatus":false,"Error":false}


купить
/api/v1/client/basket
Name: "Оформление заказа в биллинге", Uri: "", Notes: ""}
Name: "Оформление заказа в биллинге"
Notes: ""
Uri: ""



*/