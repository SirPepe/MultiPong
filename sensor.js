var info = document.getElementById('info');

window.addEventListener('deviceorientation', function(evt){
	
	var msg = 
	"Vorw�rts-R�ckw�rts: " + (evt.beta / 90);
	info.innerHTML = msg;
	// Position an Server �bermitteln
	
}, false);