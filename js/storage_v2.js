//variabili Globali
var debug = true;
var log = function(mex) {
	if (debug) {
		console.log(mex);
	}
};

//// gestione rifornimenti /////
var rifornimenti = [];



function printRifornimentiToDiv(rifornimenti, divID){
	var newInnerHTML = '';
	
	for (var i = 0; i < rifornimenti.length; i++) {
		newInnerHTML +="<div class='rifornimento' >";
		newInnerHTML +="pagato: "+rifornimenti[i].pagato;
		newInnerHTML +="<br/>prezzoLitro: "+rifornimenti[i].prezzoLitro;
		newInnerHTML +="<br/>litri: "+rifornimenti[i].litri;
		newInnerHTML +="</div>";
	}
	document.getElementById(divID).innerHTML = newInnerHTML;
}

function onClickAdd() {
	// 1. recupero i dati del rifornimeto e li metto in rifornimeti[]
	var pagato;
	var prezzoLitro;
	var litri;
	
	pagato = document.getElementById('ipPagato').value;
	prezzoLitro = document.getElementById('ipPrezzoLitro').value;
	litri = document.getElementById('ipLitri').value;
	
	// 2. memorizzo i dati nella variabile rifornimenti
	var singoloRifornimento = {};
	singoloRifornimento.pagato = pagato;
	singoloRifornimento.prezzoLitro = prezzoLitro;
	singoloRifornimento.litri = litri;
	
	rifornimenti.push(singoloRifornimento);	
	
	// 3. stampo la variabile rifornimenti
	printRifornimentiToDiv(rifornimenti,'rifornimentiStatus');
	
	localStorage.setItem('rifornimenti', JSON.stringify(rifornimenti));

	
}

//// -------------------- /////
var formInfo = {
	// attributi
	assNumber : "",
	vehicleModel : "",
	vehiclePlate : "",
	// metodi
	getHash : function() {

	}
};

function retrieveFormData() {
	log('retrieveFormData...');
	formInfo.assNumber = document.getElementById('ipAssicurazione').value;
	formInfo.vehicleModel = document.getElementById('ipModello').value;
	formInfo.vehiclePlate = document.getElementById('ipTarga').value;

}

function saveToSession() {
	retrieveFormData();
	log('saveToSession...');
	sessionStorage.setItem('ipAssicurazione', formInfo.assNumber);
	sessionStorage.setItem('ipModello', formInfo.vehicleModel);
	sessionStorage.setItem('ipTarga', formInfo.vehiclePlate);
}

function saveToSession_v2() {
	log('saveToSession...');
	var inputs = document.getElementsByTagName('input');
	for (var i = 0; i < inputs.length; i++) {
		var singleInput = inputs[i];
		if (singleInput.type != 'button' && singleInput.type != 'reset') {
			sessionStorage.setItem(singleInput.id, singleInput.value);
		}
	}
}

function saveToLocal() {
	log('saveToLocal...');
	var inputs = document.getElementsByTagName('input');
	for (var i = 0; i < inputs.length; i++) {
		var singleInput = inputs[i];
		if (singleInput.type != 'button' && singleInput.type != 'reset') {
			localStorage.setItem(singleInput.id, singleInput.value);
		}
	}
}

function loadFromSession() {
	log('loadFromSession...');
	for (var i = 0; i < sessionStorage.length; i++) {
		var currKey = sessionStorage.key(i);
		// recupero la chiave dallo storage
		var currInput = document.getElementById(currKey);
		// recuoero l'imput con il valre di
		// id pare alla key
		currInput.value = sessionStorage.getItem(currKey);
		// setto il valore dal Session
		// storage all'input
	}
}

function loadFromLocal() {
	log('loadFromSession...');
	for (var i = 0; i < localStorage.length; i++) {
		var currKey = localStorage.key(i);
		// recupero la chiave dallo storage
		var currInput = document.getElementById(currKey);
		// recupero l'imput con il valre di
		// id pare alla key
		currInput.value = localStorage.getItem(currKey);
		// setto il valore dal Session
		// storage all'input
	}
}

function printToDivSessionStorageStatus(divId) {
	var newInnerHTML = '';
	newInnerHTML += "<ul>";
	for (var i = 0; i < sessionStorage.length; i++) {
		newInnerHTML += "<li><span class='key'> " + sessionStorage.key(i) + "</span>: " + sessionStorage.getItem(sessionStorage.key(i)) + "</li>";
	}
	newInnerHTML += "</ul>";
	document.getElementById(divId).innerHTML = newInnerHTML;

}

function printToDivLocalStorageStatus(divId) {
	var newInnerHTML = '';
	newInnerHTML += "<ul>";
	for (var i = 0; i < localStorage.length; i++) {
		newInnerHTML += "<li><span class='key'> " + localStorage.key(i) + "</span>: " + localStorage.getItem(localStorage.key(i)) + "</li>";
	}
	newInnerHTML += "</ul>";
	document.getElementById(divId).innerHTML = newInnerHTML;

}

function onClickButtonSaveToSession() {
	saveToSession_v2();
	printToDivSessionStorageStatus('sessionStorageStatusContent');
}

function onClickButtonSaveToLocal() {
	saveToLocal();
	printToDivLocalStorageStatus('localStorageStatusContent');
}

function clearAllStorages() {
	sessionStorage.clear();
	localStorage.clear();
}

function init() {
	printToDivLocalStorageStatus('localStorageStatusContent');
	printToDivSessionStorageStatus('sessionStorageStatusContent');
	var rif =  JSON.parse(localStorage.getItem('rifornimenti'));
	printRifornimentiToDiv(rif, 'rifornimentiStatus');

}

function stupidSample(htmlElement) {
	log(htmlElement);
	if (htmlElement.tagName == 'INPUT') {
		log(htmlElement.id);
		log(htmlElement.type);
		log(htmlElement.value);
	} else if (htmlElement.tagName == 'DIV') {
		log("Div id=" + htmlElement.id);

	} else {
		log("Div id=" + htmlElement.tagName);
	}

}

window.onload = init;

