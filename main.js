var app = require('http').createServer(handler)
	, io = require('socket.io').listen(app)
	, fs = require('fs')

app.listen(8082);

function handler (req, res) {
	fs.readFile(__dirname + req.url,
		function (err, data) {
			if (err) {
				res.writeHead(500);
				return res.end('Error loading '+req.url);
			}
			if (/\.js/.test(req.url)){
				res.setHeader("Content-Type", "text/javascript")
			}

			res.writeHead(200);
			res.end(data);
		});
}

var playerInGame=[];

io.sockets.on('connection', function (socket) {

	socket.on("postReady", function(data){

		var clientId=socket.id;

		if (playerInGame.length<2){
			 if (!~playerInGame.indexOf(clientId)){
				 console.log("client registered");
				 playerInGame.push(clientId);
			 }
		}
		if (playerInGame.length==2){
			console.log("Fire onReady: 2 Player in the game");
			socket.emit("onReady");
		}
	})


	socket.on("postPosition", function(data){

		var result = {clientId: socket.id, beta: data};
		console.log("Fire onPosition "+require("util").inspect(result,true,null) );
		socket.emit("onPosition",{clientId: socket.id, beta: data});
	})
});

