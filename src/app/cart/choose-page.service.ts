import { Injectable } from '@angular/core';

import  * as pageNames from '../data-models/page-names';

@Injectable({
  providedIn: 'root'
})
export class ChoosePageService {

	constructor() { }

	check(d) {

		/*
		// образец ответа сервера
		clearlyLoggenIn: false
		sessionId: "ibpqc51ghi2kal3f11cj2td713"
		smsNumber: ""
		twoFactor: {
			isPassed: false, 
			isEnabled: true, 
			isSent: true
		}
		userAuth: {
			isValid: true, 
			isPassed: false
			}
		userVerification: {
			isEnabled: false, 
			resendMessage: ""
		}

		*/

		

		let a = {
			twoFactorShow: false,
			smsVerifShow: false,
			clientareaShow: false, // ??
			pageNameToShow: '',
			mustLogout: false,

			authNotValid: false,

			newUser: false,
		}

		//console.log('d', d);

		/*if (!d.userAuth.isValid) {
			a.authNotValid = true;
			return a;	
		}*/

		if (d.clearlyLoggenIn) {
			a.clientareaShow = true;
			a.pageNameToShow = pageNames.clientarea;

			// если включена смс вериф - значит новый пользователь, значит запрещаем ему удалять заказ на этапе clientarea
			// если смс верификацию отключат - то эта логика перестанет работать
			if (d.userVerification.isEnabled) {
				a.newUser = true;
			}
			else {
				a.newUser = false;	
			}
		}
		else {

			// двухфакторная
			if (d.twoFactor.isEnabled) {
				if (d.twoFactor.isSent) {
					a.twoFactorShow = true;
					a.pageNameToShow = pageNames.twoFactor;
				}
				else {
					a.mustLogout = true;
				}
			}
			else {
			// нет двухфакторной
				// смс верификация
				if (d.userVerification.isEnabled) {
					a.smsVerifShow = true;
					a.pageNameToShow = pageNames.smsVerif;

					// если попадали на смс вериф - значит новый польз
					// запомнить и блокировать кнопки remove на этапе sms verif и clientarea - это только для нового кл-та!
					a.newUser = true;
				}
				else {
					a.mustLogout = true;
				}
			}
		}
		return a;

	}

}
