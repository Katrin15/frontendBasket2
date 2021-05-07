export interface Page {
    url?: string;

    errorServerMessageLogin?:string;
    errorServerMessageReg1?:string;
    errorServerMessageReg2?:string;

    logined?:boolean; // залогинен ли? get или put() 
    authData?:string;
    name?:string;
    billingAuth?: boolean; // запросы на doauth без ошибок ??

    failureLogin?:boolean;
    failureReg1?:boolean;
    failureReg2?:boolean;
    failureBuy?:boolean;

    smsNumber?:string;

    password?:string;
    email?:string;

    reg1?:boolean;
    reg2?:boolean;

    errorServerMessagePayM?:string;
    paymentMethods?:string;

    errorMessageSmsVerification?: boolean;
    errorMessageNewPhone?: boolean;
    errorMessageNewToken?: boolean;


    // выбор страницы - login, reg1, reg2
    //loginPageShow?:boolean;
    //reg1PageShow?:boolean;
    //reg2PageShow?:boolean;

    // шаги регистрации для показа
    regStep?:number;

    // какую страницу показать - решение на основе doauth для залогиненного клиента
    // относится к страницам two-factor, sms-verification, clientarea
    chooseNextState?: {
        res1?: {
            twoFactorShow?: boolean,
            smsVerifShow?: boolean,
            clientareaShow?: boolean,
            pageNameToShow?:string,
            mustLogout?: boolean,

            authNotValid?: boolean,

            newUser?: boolean,

        };
        res2?:string;
    }

    // при запросе корзины - true, при получении ответа - false
    // для loader
    getBasket?: boolean;
}