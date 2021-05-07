export const defaultBasketCurrency: string = 'EUR';

export class Login {
	email = '';
	password = '';

	emailMessage = '';
	passwordMessage = '';

    message = [];

    readonly emailFormatError = 'You have entered wrong Email Address'; //введен неправильный формат email;
    readonly emailEmpty = 'Please provide your Email Address';
    readonly passwordEmpty = 'Please provide your Password';

    readonly loginSuccess = 'Authorization success';
    readonly loginError = 'Authorization error'; // общее сообщение

    setError(a:string, b:string) {
    	this[a] = b;
    	//console.log("this[a]", this[a]);
    	//console.log("b", b);
    }
}



export class Register {
    // email:
    // пустой - сверху, после submit
    // не формат  - сверху, после submit
    // забанен - всплывающая + сверху, после submit ***

    // password:
    // пустой  - сверху, после submit
    // слабый  - сверху, после submit

    // repeat password 2:
    // не совпадвет - сверху, после submit
    // пустой - сверху, после submit


    bannedEmail = '';   

    emailMessage = '';
    passwordMessage = ''; 
    //passwordWeakMessage = ''; 
    passwordRepeatMessage = ''; 
    bannedEmailMessage = '';

    isPasswordWeak:boolean = false;
    inputPasswordType:string = 'password';

    //message = [];

    readonly emailBannedError = 'We do not allow anonymous registrations, sorry'; // (' + this.bannedEmail + ')
    readonly emailEmpty = 'Please provide your Email Address';
    readonly emailFormatError = 'You have entered wrong Email Address';
    
    readonly passwordEmpty = 'Please provide your password';
    readonly passwordPrompt = "Use both upper and lowercase characters. Include at least one symbol (# $ ! % & etc...). Don't use dictionary words";
    readonly passwordWeak = 'Please provide more complex Password';

    readonly passwordRepeatNotSame = 'Passwords do not match';
    readonly passwordRepeatEmpty = 'Please repeat your Password';

    readonly autoPasswordPrompt = 'Пароль был сгенерирован автоматически и будет выслан на ваш email.';

    setError(a:string, b:string) {
        this[a] = b;
    }

    setBannedEmail(a:string) {
        this.bannedEmailMessage = `We do not allow anonimous registrations (${a}), sorry`;
    }
}
export const bannedEmails = [
    'hidemyass', 
    'anonym', 
    '2tor', 
    'mailnator', 
    'torguard',
    'guerrillamail',
    'secure-email',
    '5ymail',
    'cyberatlantis',
    'mytrashmail',
    'mailnesia',
    'spambog',
    'yopmail',
    'hushmail',
    'rapidmailer',
    'sigaint',
    'tuta',
    'protonmail'
];
export const passwordThresholds = {
    error: 50 as number,
    warning: 75 as number,
}

export const defaultPaymentMethod:string = 'paypal';
export class RegisterFull {

    
    firstNameMessage:string = '';
    lastNameMessage:string = '';
    countryMessage:string = '';    //не существует
    zipCodeMessage:string = '';
    addressMessage:string = '';
    addressMessage2:string = '';
    cityMessage:string = '';
    companyNameMessage:string = '';

    payMethodsMessage:string = '';

    phoneMessage:string = '';
    smsMessage:string = '';

    secretWordMessage:string = '';
    termsAgreeMessage:string = '';


    readonly firstNameEmpty = 'Please provide your First Name.';
    readonly lastNameEmpty = 'Please provide your Last Name.';
    readonly cityEmpty = 'Please provide your City.';
    readonly secretWordEmpty = 'Please provide your Secret Word.';

    readonly secretWordPrompt = 'Password for customer service authorization. It will be required for reinstall, password reset and any critical intervention.';
    readonly vatPrompt = 'EU VAT ID (if your company has it). The number should be written with the indication of the abbreviation of the country and do not use spaces. For example NL1234567D21.';
    readonly smsPrompt = 'You will receive mobile notifications on this number. Note: we will send a one-time verification code to this number.'
    
    readonly companyNameEmpty = 'Please provide your Company Name.';

    readonly zipEmpty = 'Please provide your Postal Code.';
    readonly unValidZipError = 'You entered wrong Postal Code. ';

    readonly addressEmpty = 'Please provide your Address.';
    readonly unValidAddressError = 'You entered wrong Address. Address must not be longer than 64 characters.';
    readonly maxLengthAddressError = 'Address must not be longer than 100 characters.';

    // если телефон пустой - туда вставить смс номер
    //readonly phoneEmpty = 'Please provide your Phone Number;';
    readonly unValidPhoneError = 'The Phone Number you entered was not valid.';

    readonly smsEmpty = 'Please provide your Mobile Number.';
    readonly unValidSmsError = 'The Mobile Number you entered was not valid.';

    readonly termsAgree = 'Please accept the terms of cooperation.';
    readonly authDataUndefined = 'Error, Authentication Data absent.'; 

    setError(a:string, b:string) {
        this[a] = b;
    }

    resetErrors() {
        this.firstNameMessage = '';
        this.lastNameMessage = '';
        this.countryMessage = '';
        this.zipCodeMessage = '';
        this.addressMessage = '';

        this.phoneMessage = '';
        this.smsMessage = '';

        this.secretWordMessage = '';    
        this.termsAgreeMessage = '';
    } 
}

/*export const twoFactMessage = {
    'provideCode':'Please provide your Verification SMS Code',
    'authError':'Authorization error',
    'verificationError': 'SMS Verification error',
}*/

export class TwoFactor  {

    codeMessage:string = '';
    smsNumberMessage:string = '';

    readonly smsPrompt = 'You will receive mobile notifications on this number. Note: we will send a one-time verification code to this number.';

    readonly provideCode ='Please provide your Verification Mobile Code';
    readonly smsEmpty = 'Please provide your Mobile Number.';
    readonly unValidSmsError = 'The Mobile Number you entered was not valid.';

    readonly authError = 'Authorization error';
    readonly verificationError = 'Mobile Verification error';

    readonly twoFactorNotPassed = 'Two factor verivication is not passed';

    setError(a:string, b:string) {
        this[a] = b;
    }
}

export const emptySC = 'Your shopping cart is empty';