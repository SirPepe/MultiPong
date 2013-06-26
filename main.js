var app = require('http').createServer(handler)
	, io = require('socket.io').listen(app)
	, fs = require('fs')

app.listen(8080);

function handler (req, res) {
	fs.readFile(__dirname + req.url,
		function (err, data) {
			if (err) {
				res.writeHead(500);
				return res.end('Error loading index.html');
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
	socket.on('ready', function (data) {
		console.log(data);
		socket.emit("startGame","Started game")
	});


	socket.on("postReady", function(data){
		if (playerInGame.length<2){
			 if (!~playerInGame.indexOf(data.player)){
				 playerInGame.push(data);
			 }
		}
		if (playerInGame.length==2){
			socket.emit("onReady");
		}
	})
});

