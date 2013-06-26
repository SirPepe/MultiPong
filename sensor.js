var info = document.getElementById('info');

window.addEventListener('deviceorientation', function(evt){
	
	var msg = 
	"Vorwärts-Rückwärts: " + (evt.beta / 90);
	info.innerHTML = msg;
	// Position an Server übermitteln
	
}, false);