"use strict";

let formHandler = {
	submitBtn: document.getElementById('form-submit'),
	clearBtn: document.getElementById('form-clear'),
	form: document.getElementById('registration'),
	regBlock: document.querySelector('.reg-block'),
	alertLogin: document.createElement('span'),
	alertPass: document.createElement('span'),
	alertRepeatPass: document.createElement('span'),
	
	checkLoginLenght() {
		this.alertLogin.id = 'alertLoginID';
		this.alertLogin.classList.add('alertMsg');
		if (login.value.length >= 1 && login.value.length <= 50) {
			this.removeAlertMsgs();
			return true;
		} else {
			document.querySelector('.reg-block #login').style.backgroundColor = 'lightpink';
			this.alertLogin.innerHTML = 'Логин должен содержать от 1 до 50 символов';
			this.regBlock.insertBefore(this.alertLogin,login);
			return false;
		}
	},
	
	checkPassLenght() {
		this.alertPass.id = 'alertPassID';
		this.alertPass.classList.add('alertMsg');
		if (pass.value.length >= 5 && pass.value.length <= 50) {
			this.removeAlertMsgs();
			return true;
		} else {
			pass.style.backgroundColor = 'lightpink';
			this.alertPass.innerHTML = 'Пароль должен содержать от 5 до 50 символов';
			this.regBlock.insertBefore(this.alertPass,pass);
			return false;
		}
	},
	
	checkRepeatedPass() {
		this.alertRepeatPass.id = 'alertRepeatPassID';
		this.alertRepeatPass.classList.add('alertMsg');
		if (pass.value === repeat_pass.value) {
			this.removeAlertMsgs();
			return true;
		} else {
			pass.style.backgroundColor = 'lightpink';
			repeat_pass.style.backgroundColor = 'lightpink';
			this.alertRepeatPass.innerHTML = 'Пароли не совпадают';
			this.regBlock.insertBefore(this.alertRepeatPass,repeat_pass);
			return false;
		}
	},
	
	removeAlertMsgs() {
		if(document.querySelector('#alertLoginID') != null) {
			this.regBlock.removeChild(alertLoginID);
			login.style.removeProperty('background-color');
		};
		if(document.querySelector('#alertPassID') != null) {
			this.regBlock.removeChild(alertPassID);
			pass.style.removeProperty('background-color');
		};
		if(document.querySelector('#alertRepeatPassID') != null) {
			this.regBlock.removeChild(alertRepeatPassID);
			pass.style.removeProperty('background-color');
			repeat_pass.style.removeProperty('background-color');
		};
		
	},
	
	checkForm() {
		let login = document.getElementById('login');
		let pass = document.getElementById('pass');
		let repeatPass = document.getElementById('repeat_pass');
		if(this.checkLoginLenght() && this.checkPassLenght() && this.checkRepeatedPass()) return true
		else return false;
	},
	
	submitForm(event) {
		this.submitBtn.onclick = function () {
			if (formHandler.checkForm()) {
//				formHandler.form.submit();
				document.getElementById('registration').submit();
				console.log('Отправлено');
			} else return
		};
	},
	
	setEventSumbitForm() {
		this.submitBtn.addEventListener('click', () => this.submitForm(event));
	},
	
	setEventClearForm() {
		this.clearBtn.addEventListener('click', () => this.removeAlertMsgs());
	},
}

formHandler.setEventSumbitForm();
formHandler.setEventClearForm();