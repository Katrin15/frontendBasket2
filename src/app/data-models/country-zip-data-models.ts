export class InputValidationResult {
    cssClass:string = '';
    message:string = '';
    prompt: string = '';  
    error:any = null;

    className = 'cart__inputValidation--';

    /*constructor(cssClass:string, message: string, error:any) {
        this.cssClass = cssClass;
        this.message = message;
        this.error = error;
    }*/
    /*setVal(cssClass:string, message:string, error:any) {
        this.prompt = prompt;
    }*/

   	setVals(cssClass, message, error) {
    	cssClass = this.className + cssClass;

        this.cssClass = cssClass;
        this.message = message;        
        this.error = error;
    }

    setZipPrompt(prompt) {
        this.prompt = prompt;   
    }
}

// address не используется
/*export class InputValidationResult__Address extends InputValidationResult {
    // подсказка не меняется
    prompt: string = 'Address must not be longer than 64 characters';
    promptRequired: string = 'Please, enter your Address';
    emptyRequired: boolean = false;
    promptWrongSubmit: string = 'You entered wrong Address. Address must not be longer than 64 characters'

    setVals(cssClass, message, error) {
        this.cssClass = cssClass;
        this.message = message;
        this.error = error;
    }
}*/

export class InputValidationResult__zipCode extends InputValidationResult {    

    // подсказка меняется
    prompt: string = '';
    promptRequired: string = 'Please, provide your Postal Code';
    emptyRequired: boolean = false;
    promptWrongSubmit: string = 'You entered wrong Postal Code. ' + this.message;

    setVals(cssClass,message, error) {
    	super.setVals(cssClass, message, error);
    }
    setZipPrompt(prompt) {
        super.setZipPrompt(prompt);
    }
}

export class InputValidationResult__Phone extends InputValidationResult {

    // подсказка меняется
    prompt: string = '';

    setVals(cssClass, message, error) {
    	super.setVals(cssClass, message, error);
    }    
}

export class Country  {
    full:string = '';
    short:string = '';
    callingCode:number = 0;
    regexp:any;
    regexp2:any;
    prompt:string;
}
export class CountryZipCodeCheck extends Country {
    func(zipcode, currentCountryObj) {

        zipcode = zipcode.toUpperCase();
    	
        let result: InputValidationResult__zipCode = new InputValidationResult__zipCode();
        /*{
            cssClass: '',
            message: '',
            error: null 
        };*/

        // если zip code - пусто. Дописано
       /*if (zipcode == '') {
            result.setVals('', '', null);
            return result;
        }*/

        if (typeof(currentCountryObj) !== 'undefined') {


                    let regexp = new RegExp(currentCountryObj.regexp);
                    let valid = regexp.test(zipcode);

                    //console.log("currentCountryObj", currentCountryObj);
                    //console.log("regexp", regexp);
                    
                    if (valid) {

                        result.setVals('success', '' , null);
                        result.setZipPrompt(`For ${currentCountryObj.full}: ${currentCountryObj.prompt}.`)
                        return result;
                    }
                    else {
                        let regexp2 = currentCountryObj.regexp2;
                        if (regexp2 != undefined) {

                            regexp2 = new RegExp(currentCountryObj.regexp2);
                            valid = regexp2.test(zipcode);    

                            if (valid) {                              
                                result.setVals('success', '', null);
                                result.setZipPrompt('')
                                return result;
                            }
                            else {
                                //result.message = `For ${currentCountryObj.full}: ${currentCountryObj.prompt}.`; //currentCountryObj.prompt; 
                                //result.cssClass = 'b-basket__inputValidation--error';
                                //result.error = {'unValidZip': {value: zipcode}};
                                //return result;

                                if (zipcode == '') {
                                    result.setVals('','', null); 
                                    result.setZipPrompt(`For ${currentCountryObj.full}: ${currentCountryObj.prompt}.`);                                  
                                }
                                else {
                                    result.setVals('error', '', {'unValidZip': {value: zipcode}});    
                                    result.setZipPrompt(`For ${currentCountryObj.full}: ${currentCountryObj.prompt}.`); 
                               }
                                
                                return result;
                            }
                        }
                        else {

                            if (zipcode == '') {
                                result.setVals('', '', null);
                                result.setZipPrompt(`For ${currentCountryObj.full}: ${currentCountryObj.prompt}.`);                                    
                            }
                            else {
                                result.setVals('error', '', {'unValidZip': {value: zipcode}});    
                                result.setZipPrompt(`For ${currentCountryObj.full}: ${currentCountryObj.prompt}.`);
                            }                            
                            return result; 
                        }
                    }

        }
        result.setVals('success', '', null);
        result.setZipPrompt('');

        return result;
    }
}







export const initCountry: Country = {
    full: "Netherlands", 
    short:"NL",
    callingCode: 31,
            regexp: new RegExp(/^\d{4}\s[A-Z]{2}$/),
            regexp2: undefined,
            prompt: "9999 AA, 9 = Number, A = Letter"
}

// prohibitedCountries = ["Iran, Islamic Republic Of", "Sudan", "Syrian Arab Republic", "Cuba", "Russian Federation"];
export const countries: Country[] = [
    /*{
        full: 'Select your country',
        short: 'syc',
        callingCode: 0,
        regexp: undefined,
        regexp2: undefined,
        prompt: "select countr"
    },*/    
    {
        full: "Afghanistan", short: "AF",
        callingCode: 93,
        regexp: new RegExp(/^\d\d\d\d$/), // почему-то их не видно не правильно когда они в кавычках new RegExp('^\d\d\d\d$')
        regexp2: undefined,
        //regexp: new RegExp(/^\d{5}$/,
        //    regexp2: /^\d{5}-\d{4}$/,
        //    prompt: "99999-9999 OR 99999, 9 = Number"
        prompt: "9999, 9 = Number"
    },
    {
        full: "Aland Islands", short: "AX",
        callingCode: 358,
            regexp: new RegExp(/^[A-Z]X-\d{5}$/),
            regexp2: undefined,
            prompt: "AX-99999, 9 = Number, A = Letter"
    },
    {
        full: "Albania", short:"AL",
        callingCode: 355,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Algeria", short: "DZ",
        callingCode: 213,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "American Samoa", short:"AS",
        callingCode: 684,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Andorra", short: "AD",
        callingCode: 376,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Angola", short:"AO",
        callingCode: 244,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Anguilla", short: "AI",
        callingCode: 1,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Antarctica", short: "AQ",
        callingCode: 672,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Antigua And Barbuda", short:"AG",
        callingCode: 1,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Argentina", short:"AR",
        callingCode: 54,
        regexp: new RegExp(/^\d{4}$/),
            regexp2: new RegExp(/^[A-Z]\d\d\d\d[A-Z][A-Z][A-Z]$/),
            prompt: "A9999AAA OR 9999, 9 = Number, A = Letter"
    },
    {
        full: "Armenia", short:"AM",
        callingCode: 374,
        regexp: new RegExp(/^\d\d\d\d$/),             
            regexp2: undefined, 
            prompt: "9999, 9 = Number"
    },
    {
        full: "Aruba", short:"AW",
        callingCode: 297,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Australia", short:"AU",
        callingCode: 61,
        regexp: new RegExp(/^\d\d\d\d$/),
            regexp2: undefined, 
            prompt: "9999, 9 = Number"
    },
    {
        full: "Austria", short:"AT",
        callingCode: 43,
        regexp: new RegExp(/^\d\d\d\d$/),
            regexp2: undefined, 
            prompt: "9999, 9 = Number"
    },
    {
        full: "Azerbaijan", short:"AZ",
        callingCode: 994,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Bahamas", short:"BS",
        callingCode: 1,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Bahrain", short:"BH",
        callingCode: 973,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Bangladesh", short:"BD",
        callingCode: 880,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Barbados", short:"BB",
        callingCode: 1,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Belarus", short:"BY",
        callingCode: 375,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Belgium", short:"BE",
        callingCode: 32,
        regexp: new RegExp(/^\d\d\d\d$/),
            regexp2: undefined,
            prompt: "9999, 9 = Number"
    },
    {
        full: "Belize", short:"BZ",
        callingCode: 501,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Benin", short:"BJ",
        callingCode: 229,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Bermuda", short:"BM",
        callingCode: 1,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Bhutan", short:"BT",
        callingCode: 975,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Bolivia", short:"BO",
        callingCode: 591,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Bosnia And Herzegovina", short:"BA",
        callingCode: 387,
        regexp: new RegExp(/^\d\d\d\d\d$/),
            regexp2: undefined,
            prompt: "99999, 9 = Number"
    },
    {
        full: "Botswana", short:"BW",
        callingCode: 267,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Bouvet Island", short:"BV",
        callingCode: 47,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Brazil", short:"BR",
        callingCode: 55,
            regexp: new RegExp(/^\d{5}-\d{3}$/),
            regexp2: undefined,
            prompt: "99999-999, 9 = Number"

    },
    {
        full: "British Indian Ocean Territory", short: "IO",
        callingCode: 246,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Brunei Darussalam", short:"BN",
        callingCode: 673,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Bulgaria", short:"BG",
        callingCode: 359,
        regexp: new RegExp(/^\d\d\d\d$/),
            regexp2: undefined,
            prompt: "9999, 9 = Number"
    },
    {
        full: "Burkina Faso", short:"BF",
        callingCode: 226,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Burundi", short:"BI",
        callingCode: 257,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Cambodia", short:"KH",
        callingCode: 855,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Cameroon", short:"CM",
        callingCode: 237,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Canada", short:"CA",
        callingCode: 1,
            regexp: new RegExp(/^[A-Z]\d[A-Z]\s\d[A-Z]\d$/),
            regexp2: undefined,
            prompt: "A9A 9A9, 9 = Number, A = Letter"
    },
    {
        full: "Cape Verde", short:"CV",
        callingCode: 238,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Cayman Islands", short: "KY",
        callingCode: 1,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Central African Republic", short:"CF",
        callingCode: 236,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Chad", short:"TD",
        callingCode: 235,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Chile", short:"CL",
        callingCode: 56,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "China", short:"CN",
        callingCode: 86,
            regexp: new RegExp(/^\d{6}$/),
            regexp2: undefined,
            prompt: "999999, 9 = Number"
    },
    {
        full: "Christmas Island", short:"CX",
        callingCode: 618,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Cocos (Keeling) Islands", short:"CC",
        callingCode: 61,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Colombia", short:"CO",
        callingCode: 57,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Comoros", short:"KM",
        callingCode: 269,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Congo", short:"CG",
        callingCode: 242,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Congo, Democratic Republic", short:"CD",
        callingCode: 243,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Cook Islands", short:"CK",
        callingCode: 682,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Costa Rica", short:"CR",
        callingCode: 506,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Cote D'Ivoire", short:"CI",
        callingCode: 225,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Croatia", short:"HR",
        callingCode: 385,
            regexp: new RegExp(/^\d{5}$/),
            regexp2: new RegExp(/^HR-\d\d\d\d\d$/),
            prompt: "HR-99999 OR 99999, 9 = Number, A = Letter"
    },
    //{
    //    full: "Cuba", short:"CU",
    //    callingCode: 53,
    //        regexp: new RegExp(/^CP\s\d{5}$/,
    //        regexp2: undefined,
    //        prompt: "CP 99999, 9 = Number, A = Letter"
    //},
    {
        full: "Curacao", short:"CW",
        callingCode: 0, // на самом деле - ""

            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Cyprus", short:"CY",
        callingCode: 357,
        regexp: new RegExp(/^\d\d\d\d$/), 
            regexp2: undefined,
            prompt: "9999, 9 = Number"
    },
    {
        full: "Czech Republic", short:"CZ",
        callingCode: 420,
            regexp: new RegExp(/^\d{3}\s\d{2}$/),
            regexp2: undefined,
            prompt: "999 99, 9 = Number"
    },
    {
        full: "Denmark", short:"DK",
        callingCode: 45,
        regexp: new RegExp(/^\d\d\d\d$/), 
            regexp2: undefined,
            prompt: "9999, 9 = Number"
    },
    {
        full: "Djibouti", short: "DJ",
        callingCode: 253,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Dominica", short:"DM",
        callingCode: 1,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Dominican Republic", short:"DO",
        callingCode: 1,
        regexp: new RegExp(/^\d\d\d\d\d$/),
            regexp2: undefined,
            prompt: "99999, 9 = Number"
    },
    {
        full: "Ecuador", short:"EC",
        callingCode: 593,
            regexp: new RegExp(/^\d{6}$/),
            regexp2: undefined,
            prompt: "999999, 9 = Number"
    },
    {
        full: "Egypt", short: "EG",
        callingCode: 20,
        regexp: new RegExp(/^\d\d\d\d\d$/),
            regexp2: undefined,
            prompt: "99999, 9 = Number"
    },
    {
        full: "El Salvador", short:"SV",
        callingCode: 503,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Equatorial Guinea", short:"GQ",
        callingCode: 240,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Eritrea", short:"ER",
        callingCode: 291,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Estonia", short:"EE",
        callingCode: 372,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Ethiopia", short:"ET",
        callingCode: 251,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Falkland Islands (Malvinas)", short:"FK",
        callingCode: 500,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Faroe Islands", short:"FO",
        callingCode: 298,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Fiji", short:"FJ",
        callingCode: 679,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Finland", short:"FI",
        callingCode: 358,
            regexp: new RegExp(/^FI-\d{5}$/),
            regexp2: undefined,
            prompt: "FI-99999, 9 = Number"
    },
    {
        full: "France", short:"FR", 
        callingCode: 33,
        regexp: new RegExp(/^\d\d\d\d\d$/),
            regexp2: undefined,
            prompt: "99999, 9 = Number"
    },
    {
        full: "French Guiana", short:"GF",
        callingCode: 594,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "French Polynesia", short:"PF",
        callingCode: 689,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "French Southern Territories", short:"TF",
        callingCode: 0,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Gabon", short:"GA",
        callingCode: 241,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Gambia", short:"GM",
        callingCode: 220,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Georgia", short:"GE",
        callingCode: 995,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Germany", short:"DE",
        callingCode: 49,
        regexp: new RegExp(/^\d\d\d\d\d$/),
            regexp2: undefined,
            prompt: "99999, 9 = Number"
    },
    {
        full: "Ghana", short:"GH",
        callingCode: 233,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Gibraltar", short:"GI", 
        callingCode: 350,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Greece", short:"GR",
        callingCode: 30,
            regexp: new RegExp(/^\d{3}\s\d{2}$/),
            regexp2: undefined,
            prompt: "999 99, 9 = Number"
    },
    {
        full: "Greenland", short:"GL",
        callingCode: 299,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Grenada", short:"GD",
        callingCode: 1,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Guadeloupe", short:"GP",
        callingCode: 590,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Guam", short:"GU",
        callingCode: 1,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Guatemala", short:"GT",
        callingCode: 502,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Guernsey", short:"GG",
        callingCode: 44,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Guinea", short:"GN",
        callingCode: 224,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Guinea-Bissau", short:"GW",
        callingCode: 245,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Guyana", short:"GY",
        callingCode: 592,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Haiti", short:"HT",
        callingCode: 509,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Heard Island & Mcdonald Islands", short:"HM",
        callingCode: 0,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Holy See (Vatican City State)", short:"VA",
        callingCode: 39,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Honduras", short:"HN",
        callingCode: 504,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Hong Kong", short:"HK", 
        callingCode: 852,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Hungary", short:"HU",
        callingCode: 36,
        regexp: new RegExp(/^\d\d\d\d$/), 
            regexp2: undefined,
            prompt: "9999, 9 = Number"
    },
    {
        full: "Iceland", short:"IS",
        callingCode: 354,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "India", short:"IN", 
        callingCode: 91,
            regexp: new RegExp(/^\d{6}$/),
            regexp2: undefined,
            prompt: "999999, 9 = Number"
    },
    {
        full: "Indonesia", short:"ID",
        callingCode: 62,
        regexp: new RegExp(/^\d\d\d\d\d$/),
            regexp2: undefined,
            prompt: "99999, 9 = Number"
    },
    //{
    //    full: "Iran, Islamic Republic Of", short:"IR",
    //    callingCode: 98,
    //        regexp: new RegExp(/^\d{5}-\d{3,5}$/,
    //        prompt: "99999-999 OR 99999-9999 OR 99999-99999, 9 = Number"
    //},
    {
        full: "Iraq", short:"IQ",
        callingCode: 964,
        regexp: new RegExp(/^\d\d\d\d\d$/),
            regexp2: undefined,
            prompt: "99999, 9 = Number"
    },
    {
        full: "Ireland", short:"IE",
        callingCode: 353,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Isle Of Man", short:"IM",
        callingCode: 44,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Israel", short:"IL",
        callingCode: 972,
            regexp: new RegExp(/^\d{5}$/),
            regexp2: new RegExp(/^\d{7}$/),
            prompt: "9999999 OR 99999, 9 = Number"
    },
    {
        full: "Italy", short:"IT",
        callingCode: 39,
        regexp: new RegExp(/^\d\d\d\d\d$/),
            regexp2: undefined,
            prompt: "99999, 9 = Number"
    },
    {
        full: "Jamaica", short:"JM",
        callingCode: 1,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Japan", short:"JP",
        callingCode: 81,
            regexp: new RegExp(/^\d{3}-\d{4}$/),
            regexp2: undefined,
            prompt: "999-9999, 9 = Number"
    },
    {
        full: "Jersey", short:"JE",
        callingCode: 44,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Jordan", short:"JO",
        callingCode: 962,
        regexp: new RegExp(/^\d\d\d\d\d$/),
            regexp2: undefined,
            prompt: "99999, 9 = Number"
    },
    {
        full: "Kazakhstan", short:"KZ",
        callingCode: 7,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Kenya", short:"KE",
        callingCode: 254,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Kiribati", short:"KI",
        callingCode: 686,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Korea", short:"KR",
        callingCode: 82,
            regexp: new RegExp(/^\d{3}-\d{3}$/),
            regexp2: undefined,
            prompt: "999-999, 9 = Number"
    },
    {
        full: "Kuwait", short:"KW",
        callingCode: 965,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Kyrgyzstan", short:"KG",
        callingCode: 996,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Lao People's Democratic Republic", short:"LA",
        callingCode: 856,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Latvia", short:"LV",
        callingCode: 371,
            regexp: new RegExp(/^LV-\d{4}$/),
            regexp2: undefined,
            prompt: "LV-9999, 9 = Number"
    },
    {
        full: "Lebanon", short:"LB",
        callingCode: 961,
            regexp: new RegExp(/^\d{4}$/),
            regexp2: new RegExp(/^\d{4}\s\d{4}$/),
            prompt: "9999 OR 9999 9999, 9 = Number"
    },
    {
        full: "Lesotho", short:"LS",
        callingCode: 266,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Liberia", short:"LR",
        callingCode: 231,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Libyan Arab Jamahiriya", short:"LY",
        callingCode: 218,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Liechtenstein", short:"LI",
        callingCode: 423,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Lithuania", short:"LT",
        callingCode: 370,
            regexp: new RegExp(/^LT-\d{5}$/),
            regexp2: undefined,
            prompt: "LT-99999, 9 = Number"
    },
    {
        full: "Luxembourg", short:"LU",
        callingCode: 352,
            regexp: new RegExp(/^L-\d{4}$/),
            regexp2: undefined,
            prompt: "L-9999, 9 = Number"
    },
    {
        full: "Macao", short:"MO",
        callingCode: 853,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Macedonia", short:"MK",
        callingCode: 389,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Madagascar", short:"MG",
        callingCode: 261,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Malawi", short:"MW",
        callingCode: 265,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Malaysia", short:"MY",
        callingCode: 60,
        regexp: new RegExp(/^\d\d\d\d\d$/),
            regexp2: undefined,
            prompt: "99999, 9 = Number"
    },
    {
        full: "Maldives", short:"MV",
        callingCode: 960,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Mali", short:"ML",
        callingCode: 223,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Malta", short:"MT",
        callingCode: 356,
            regexp: new RegExp(/^[A-Z]{3}\s\d{4}$/),
            regexp2: undefined,
            prompt: "AAA 9999, 9 = Number, A = Letter"
    },
    {
        full: "Marshall Islands", short:"MH",
        callingCode: 692,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Martinique", short:"MQ",
        callingCode: 596,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Mauritania", short:"MR",
        callingCode: 222,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Mauritius", short:"MU",
        callingCode: 230,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Mayotte", short:"YT",
        callingCode: 269,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Mexico", short:"MX",
        callingCode: 52,
        regexp: new RegExp(/^\d\d\d\d\d$/),
            regexp2: undefined,
            prompt: "99999, 9 = Number"
    },
    {
        full: "Micronesia, Federated States Of", short:"FM", 
        callingCode: 691,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Moldova", short:"MD",
        callingCode: 373,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Monaco", short:"MC", 
        callingCode: 377,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Mongolia", short:"MN",
        callingCode: 976,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Montenegro", short:"ME",
        callingCode: 382,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Montserrat", short:"MS",
        callingCode: 1,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Morocco", short:"MA",
        callingCode: 212,
        regexp: new RegExp(/^\d\d\d\d\d$/),
            regexp2: undefined,
            prompt: "99999, 9 = Number"
    },
    {
        full: "Mozambique", short:"MZ",
        callingCode: 258,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Myanmar", short:"MM",
        callingCode: 95,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Namibia", short:"NA",
        callingCode: 264,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Nauru", short: "NR",
        callingCode: 674,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Nepal", short:"NP",
        callingCode: 977,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Netherlands", short:"NL",
        callingCode: 31,
            regexp: new RegExp(/^\d{4}\s[A-Z]{2}$/),
            regexp2: undefined,
            prompt: "9999 AA, 9 = Number, A = Letter"
    },
    {
        full: "Netherlands Antilles", short:"AN",
        callingCode: 599,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "New Caledonia", short:"NC",
        callingCode: 687,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "New Zealand", short:"NZ",
        callingCode: 64,
        regexp: new RegExp(/^\d\d\d\d$/), 
            regexp2: undefined,
            prompt: "9999, 9 = Number"
    },
    {
        full: "Nicaragua", short:"NI",
        callingCode: 505,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Niger", short:"NE",
        callingCode: 227,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Nigeria", short:"NG",
        callingCode: 234,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Niue", short:"NU",
        callingCode: 683,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Norfolk Island", short:"NF",
        callingCode: 6723,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Northern Mariana Islands", short:"MP",
        callingCode: 1,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Norway", short:"NO",
        callingCode: 47,
        regexp: new RegExp(/^\d\d\d\d$/), 
            regexp2: undefined,
            prompt: "9999, 9 = Number"
    },
    {
        full: "Oman", short:"OM",
        callingCode: 968,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Pakistan", short:"PK",
        callingCode: 92,
        regexp: new RegExp(/^\d\d\d\d\d$/),
            regexp2: undefined,
            prompt: "99999, 9 = Number"
    },
    {
        full: "Palau", short:"PW", 
        callingCode: 680,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Palestine, State of", short:"PS",
        callingCode: 970,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Panama", short:"PA",
        callingCode: 507,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Papua New Guinea", short:"PG",
        callingCode: 675,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Paraguay", short:"PY",
        callingCode: 595,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Peru", short:"PE",
        callingCode: 51,
        regexp: new RegExp(/^\d\d\d\d\d$/),
            regexp2: undefined,
            prompt: "99999, 9 = Number"
    },
    {
        full: "Philippines", short:"PH",
        callingCode: 63,
        regexp: new RegExp(/^\d\d\d\d$/), 
            regexp2: undefined,
            prompt: "9999, 9 = Number"
    },
    {
        full: "Pitcairn", short:"PN",
        callingCode: 64,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Poland", short:"PL",
        callingCode: 48,
            regexp: new RegExp(/^\d{2}-\d{3}$/),
            regexp2: undefined,
            prompt: "99-999, 9 = Number"
    },
    {
        full: "Portugal", short:"PT",
        callingCode: 351,
            regexp: new RegExp(/^\d{4}-\d{3}$/),
            regexp2: undefined,
            prompt: "9999-999, 9 = Number"
    },
    {
        full: "Puerto Rico", short:"PR", 
        callingCode: 1,
            regexp: new RegExp(/^00\d{3}$/),
            regexp2: undefined,
            prompt: "00999, 9 = Number"
    },
    {
        full: "Qatar", short:"QA",
        callingCode: 974,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Reunion", short:"RE",
        callingCode: 262,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Romania", short:"RO",
        callingCode: 40,
            regexp: new RegExp(/^\d{6}$/),
            regexp2: undefined,
            prompt: "999999, 9 = Number"
    },
    //{
    //    full: "Russian Federation", short:"RU",
    //    callingCode: 7,
    //        regexp: new RegExp(/^\d{6}$/,
    //        prompt: "999999, 9 = Number"
    //},
    {
        full: "Rwanda", short:"RW",
        callingCode: 250,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Saint Barthelemy", short:"BL",
        callingCode: 590,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Saint Helena", short:"SH",
        callingCode: 290,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Saint Kitts And Nevis", short:"KN",
        callingCode: 1,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Saint Lucia", short:"LC",
        callingCode: 1,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Saint Martin", short: "MF",
        callingCode: 590,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Saint Pierre And Miquelon", short:"PM",
        callingCode: 508,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Saint Vincent And Grenadines", short:"VC",
        callingCode: 1,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Samoa", short:"WS",
        callingCode: 685,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "San Marino", short:"SM",
        callingCode: 378,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Sao Tome And Principe", short:"ST",
        callingCode: 239,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Saudi Arabia", short:"SA",
        callingCode: 966,
            regexp: new RegExp(/^\d{5}$/),
            regexp2: new RegExp(/^\d\d\d\d\d-\d\d\d\d$/),
            prompt: "99999-9999 OR 99999, 9 = Number"

    },
    {
        full: "Senegal", short: "SN",
        callingCode: 221,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Serbia", short:"RS",
        callingCode: 381,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Seychelles", short:"SC",
        callingCode: 248,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Sierra Leone", short:"SL",
        callingCode: 232,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Singapore", short:"SG",
        callingCode: 65,
            regexp: new RegExp(/^\d{6}$/),
            regexp2: undefined,
            prompt: "999999, 9 = Number"
    },
    {
        full: "Slovakia", short:"SK",
        callingCode: 421,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Slovenia", short:"SI",
        callingCode: 386,
            regexp: new RegExp(/^SL-\d{4}$/),
            regexp2: undefined,
            prompt: "SI-9999, 9 = Number"
    },
    {
        full: "Solomon Islands", short:"SB",
        callingCode: 677,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Somalia", short:"SO",
        callingCode: 252,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "South Africa", short:"ZA",
        callingCode: 27,
        regexp: new RegExp(/^\d\d\d\d$/), 
            regexp2: undefined,
            prompt: "9999, 9 = Number"
    },
    {
        full: "South Georgia And Sandwich Isl.", short:"GS",
        callingCode: 500,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Spain", short:"ES",
        callingCode: 34,
        regexp: new RegExp(/^\d\d\d\d\d$/),
            regexp2: undefined,
            prompt: "99999, 9 = Number"
    },
    {
        full: "Sri Lanka", short:"LK",
        callingCode: 94,
        regexp: new RegExp(/^\d\d\d\d\d$/),
            regexp2: undefined,
            prompt: "99999, 9 = Number"
    },
    //{
    //    full: "Sudan", short:"SD",
    //    callingCode: 249,
    //    regexp: new RegExp(/^\d\d\d\d\d$/,
    //        regexp2: undefined,
    //        prompt: "99999, 9 = Number"
    //},
    {
        full: "Surifull", short:"SR",
        callingCode: 597,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Svalbard And Jan Mayen", short:"SJ",
        callingCode: 47,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Swaziland", short:"SZ",
        callingCode: 268,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Sweden", short:"SE",
        callingCode: 46,
        regexp: new RegExp(/^\d\d\d\d\d$/),
            regexp2: undefined,
            prompt: "99999, 9 = Number"
    },
    {
        full: "Switzerland", short:"CH",
        callingCode: 41,
        regexp: new RegExp(/^\d\d\d\d$/), 
            regexp2: undefined,
            prompt: "9999, 9 = Number"
    },
    //{
    //    full: "Syrian Arab Republic", short:"SY",
    //    callingCode: 963
    //},
    {
        full: "Taiwan", short:"TW",
        callingCode: 886,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Tajikistan", short:"TJ",
        callingCode: 992,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Tanzania", short:"TZ",
        callingCode: 255,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Thailand", short:"TH",
        callingCode: 66,
        regexp: new RegExp(/^\d\d\d\d\d$/),
            regexp2: undefined,
            prompt: "99999, 9 = Number"
    },
    {
        full: "Timor-Leste", short:"TL",
        callingCode: 670,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Togo", short:"TG",
        callingCode: 228,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Tokelau", short:"TK",
        callingCode: 690,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Tonga", short:"TO",
        callingCode: 676,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Trinidad And Tobago", short:"TT",
        callingCode: 1,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Tunisia", short:"TN",
        callingCode: 216,
        regexp: new RegExp(/^\d\d\d\d$/), 
            regexp2: undefined,
            prompt: "9999, 9 = Number"
    },
    {
        full: "Turkey", short:"TR",
        callingCode: 90,
        regexp: new RegExp(/^\d\d\d\d\d$/),
            regexp2: undefined,
            prompt: "99999, 9 = Number"
    },
    {
        full: "Turkmenistan", short:"TM",
        callingCode: 993,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Turks And Caicos Islands", short:"TC",
        callingCode: 1,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Tuvalu", short:"TV",
        callingCode: 688,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Uganda", short:"UG",
        callingCode: 256,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Ukraine", short:"UA",
        callingCode: 380,
        regexp: new RegExp(/^\d\d\d\d\d$/),
            regexp2: undefined,
            prompt: "99999, 9 = Number"
    },
    {
        full: "United Arab Emirates", short:"AE",
        callingCode: 971,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "United Kingdom", short:"GB",
        callingCode: 44,
            regexp: new RegExp(/^[A-Z]\d\s\d[A-Z]{2}$/),
            //        //2                      //3                     //4                         //5                        //6
            regexp2: new RegExp(/^[A-Z]\d{2}\s\d[A-Z]{2}$|^[A-Z]{2}\d\s\d[A-Z]{2}$|^[A-Z]{2}\d{2}\s\d[A-Z]{2}$|^[A-Z]\d[A-Z]\s\d[A-Z]{2}$|^[A-Z]{2}\d[A-Z]\s\d[A-Z]{2}/),           

            prompt: "A9 9AA OR A99 9AA OR AA9 9AA OR AA99 9AA OR A9A 9AA  OR AA9A 9AA, 9 = Number, A = Letter"
    },
    {
        full: "United States", short:"US",
        callingCode: 1,
            regexp: new RegExp(/^\d{5}$/),
            regexp2: new RegExp(/^\d{5}-\d{4}$/),
            prompt: "99999-9999 OR 99999, 9 = Number"
    },
    {
        full: "United States Outlying Islands", short:"UM",
        callingCode: 1,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Uruguay", short:"UY", 
        callingCode: 598,
        regexp: new RegExp(/^\d\d\d\d\d$/),
            regexp2: undefined,
            prompt: "99999, 9 = Number"
    },
    {
        full: "Uzbekistan", short:"UZ",
        callingCode: 998,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Vanuatu", short:"VU",
        callingCode: 678,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Venezuela", short:"VE",
        callingCode: 58,
        regexp: new RegExp(/^\d\d\d\d$/), 
            regexp2: undefined,
            prompt: "9999, 9 = Number"
    },
    {
        full: "Viet Nam", short:"VN",
        callingCode: 84,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Virgin Islands, British", short:"VG",
        callingCode: 1,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Virgin Islands, U.S.", short:"VI",
        callingCode: 1,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Wallis And Futuna", short:"WF",
        callingCode: 681,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Western Sahara", short:"EH",
        callingCode: 212,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Yemen", short:"YE",
        callingCode: 967,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Zambia", short:"ZM",
        callingCode: 260,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    },
    {
        full: "Zimbabwe", short:"ZW",
        callingCode: 263,
            regexp: new RegExp(/^[A-Z0-9\s-]{4,10}$/),
            regexp2: undefined,
            prompt: "only letters, numbers, dashes, blanks, min - 4 characters, max - 10 characters"
    }
    

]