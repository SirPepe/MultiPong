

define(["socket.io/socket.io"],function(io){

	var socket = io.connect('http://localhost');

	socket.emit("ready",{data: "Client ist da"});

	socket.on("startGame",function(data){
		console.log("Game started");
	});

	return {
		foo: function(){
			return "bar";
		},
		postReady: function(player){
			socket.emit("postReady",{player: player});
		},
		onReady:function(cb){
			socket.on("onReady",function(data){
				cb();
			});
		}
	}

});