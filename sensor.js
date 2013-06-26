define(["server"], function(server){

	var $info = $('#info');

	window.addEventListener('deviceorientation', function(evt){
		var position = (evt.beta / 90);

		// debug info ausgeben
		var msg = 
		"Vorwaerts-Rueckwaerts: " + position;
		info.innerHTML = msg;
		
		// TODO Position an Server übermitteln
		server.postPosition(position);
		
	}, false);


	var $readyBtn = $('#readyBtn');

	readyBtn.onclick = function() {
		// TODO Ready an Server schicken
		server.postReady();
		this.style.visibility = 'hidden';
	};

	var onGameOverFtn = function onGameOver(win) {
		if (win) {
			$('body').css('background-color', 'rgb(0, 255, 0)');
			$('#win').html('Gewonnen');
//			document.body.style.backgroundColor = 'rgb(0, 255, 0)';
//			document.getElementById('win').innerHTML = ;
		} else {
			$('body').css('background-color', 'rgb(255, 0, 0)');
			$('#win').html('Verloren');
//			document.body.style.backgroundColor = 'rgb(255, 0, 0)';
//			document.getElementById('win').innerHTML = 'Verloren';
		}
	};

	server.onGameOver(onGameOverFtn);

});

