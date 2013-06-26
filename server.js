

define(["socket.io/socket.io"],function(io){

	var socket = io.connect('http://192.168.2.103');

	socket.emit("ready",{data: "Client ist da"});

	socket.on("startGame",function(data){
		console.log("Game started");
	});

	return {
		foo: function(){
			return "bar";
		},
		postReady: function(){
			socket.emit("postReady");
		},
		onReady:function(cb){
			socket.on("onReady",function(data){
				cb();
			});
		}
	}

});