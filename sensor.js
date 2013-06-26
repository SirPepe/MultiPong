define(["server", "jquery"], function(server){

function debounce(fn, delay) {
  var timer = null;
  return function () {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

	var $info = $('#info');

	window.addEventListener('deviceorientation', debounce(function(evt){
		var position = (evt.beta / 90);

		// debug info ausgeben
		var msg = 
		"Vorwaerts-Rueckwaerts: " + position;
		info.innerHTML = msg;
		
		// Position an Server uebermitteln
		server.postPosition(position);
		
	}, 100), false);


	var $readyBtn = $('#readyBtn');

	readyBtn.onclick = function() {
		// Ready an Server schicken
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

