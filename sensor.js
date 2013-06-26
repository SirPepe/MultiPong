var info = document.getElementById('info');

window.addEventListener('deviceorientation', function(evt){
	var position = (evt.beta / 90);

	// debug info ausgeben
	var msg = 
	"Vorwärts-Rückwärts: " + position;
	info.innerHTML = msg;
	
	// TODO Position an Server übermitteln
//	server.postPosition(position);
	
}, false);


var readyBtn = document.getElementById('readyBtn');

readyBtn.onclick = function() {
	// TODO Ready an Server schicken
//	server.postReady();
	this.style.visibility = 'hidden';
};

function onGameOver(win) {
	if (win) {
		document.body.style.backgroundColor = 'rgb(0, 255, 0)';
		document.getElementById('win').innerHTML = 'Gewonnen';
	} else {
		document.body.style.backgroundColor = 'rgb(255, 0, 0)';
		document.getElementById('win').innerHTML = 'Verloren';
	}
}

