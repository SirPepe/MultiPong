

define(["socket.io/socket.io"],function(io){

	var socket = io.connect('http://192.168.2.102');
//var socket=io.connect("http://localhost:8080");

	socket.emit("ready",{data: "Client ist da"});

	socket.on("startGame",function(data){
		console.log("Game started");
	});

	return {
		postReady: function(){
			socket.emit("postReady");
		},
		onReady:function(cb){
			socket.on("onReady",function(data){
				cb();
			});
		},
		postPosition: function(beta){
			socket.emit("postPosition",beta);
		},
		onPosition: function(cb){
			socket.on("onPosition",function(data){
				cb(data.clientId,data.beta);
			});
		},
		postGameOver: function(clientId){
			socket.emit("postGameOver",beta);
		},
		onGameOver: function(cb){
			socket.on("onGameOver",function(isWinner){
				cb(isWinner);
			});
		}
	}

});