define(["server", "jquery"], function(server){

	/* Source: http://remysharp.com/2010/07/21/throttling-function-calls/
	 * Throttles the amount of times your function runs.
	 */
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
		$info.html(msg);
		
		// Position an Server uebermitteln
		server.postPosition(position);
		
	}, 50), false);


	var $readyBtn = $('#readyBtn');

	$readyBtn.click(function() {
		// Ready an Server schicken
		server.postReady();
		this.style.visibility = 'hidden';
	});

	server.onGameOver(function(win) {
		if (win) {
			$('body').css('background-color', 'rgb(0, 255, 0)');
			$('#win').html('Gewonnen');
		} else {
			$('body').css('background-color', 'rgb(255, 0, 0)');
			$('#win').html('Verloren');
		}
	});

});

