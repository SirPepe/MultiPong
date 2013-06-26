/**
 * Created with JetBrains WebStorm.
 * User: gruberan
 * Date: 26.06.13
 * Time: 14:39
 * To change this template use File | Settings | File Templates.
 */
define(["server", "jquery"], function(server){
var gameEngine = {
    playerInputPositions: [0, 0],
    player0: {ready: false, elementId: "player0", id : 0},
    player1: {ready: false, elementId: "player1", id : 1},
    ball: {x: 2, y: 2, elementId: "ball"},
    ready: false,
    countDown: 3,

    startGame: function(player){
        if(this.player0.id == player){
            this.player0.ready = true;
        }else if(this.player1.id == player){
            this.player1.ready = true;
        }
        if(this.player0.ready && this.player1.ready){
            $(".gameState").html(gameEngine.countDown);
            var intervalId = window.setInterval(function(){
                gameEngine.countDown--;
                if(gameEngine.countDown == 0){
                    $(".gameState").html("");
                    gameEngine.ready = true;
                    window.clearInterval(intervalId);
                }else {
                    $(".gameState").html(gameEngine.countDown);
                }

            }, 1000);
            // this.ready = true;
        }
    },

    movePaddles: function () {
        var $playGround = $("#playground");
        var $player0 = $("#" + this.player0.elementId);
        var $player1 = $("#" + this.player1.elementId);
        this.movePaddle($player0, $playGround, this.playerInputPositions[0]);
        this.movePaddle($player1, $playGround, this.playerInputPositions[1]);
    },
    movePaddle: function ($paddle, $playGround, additionalPos) {
        var position = $paddle.position();
        var offset = additionalPos * 7;
        if (position.top + offset <= $playGround.height() - $paddle.height() && position.top + offset >= 0) {
            $paddle.css("top", (position.top + offset) + "px");
        }
    },
    collision: function ($player, position, $ball, $playGround) {
        var pBottom = $player.position().top;
        var pTop = pBottom + $player.height();
        var center = position.top + ($ball.height() / 2);
        if (center > pBottom && pTop > center) {
            this.ball.x = (-1) * this.ball.x;
            return true;
        }
        else {
            $(".gameState").html("Game Over");
            $ball.hide();
            return false;
        }
    }, moveBall: function () {
        if (this.ready) {
            var $playGround = $("#playground");
            var $ball = $("#" + this.ball.elementId);
            var position = $ball.position();

            if (position.top + this.ball.y < 0 || position.top + this.ball.y > $playGround.height() - $ball.height()) {
                this.ball.y = (-1) * this.ball.y;
            }
            var newY = position.top + this.ball.y;

            var $player0 = $("#" + this.player0.elementId);
            var $player1 = $("#" + this.player1.elementId);

            if (position.left + this.ball.x <= $player0.width() + 5) {
                this.ready = this.collision($player0, position, $ball, $playGround);
                if(!this.ready){
                    server.postGameOver(player1.id)
                }
            }

            if (position.left + this.ball.x > $playGround.width() - $ball.width() - $player1.width() - 5) {
                this.ready = this.collision($player1, position, $ball, $playGround);
                if(!this.ready){
                    server.postGameOver(player0.id)
                }
            }

            var newX = position.left + this.ball.x;

            $ball.css({"left": newX + "px", "top": newY + "px"});
        }


    }


};


window.requestAnimationFrame(function move() {
    gameEngine.movePaddles();
    gameEngine.moveBall();
    window.requestAnimationFrame(move);

});

/*var server = {
    callback: [],
    cbReady: [],
    onPosition: function (callback) {
        this.callback.push(callback);
    },
    postGameOver: function (player) {
        console.log("server game over", player);
    },
    trigger: function (player, position) {
        for (var i = 0; i < this.callback.length; i++) {
            this.callback[i](player, position);
        }
    },
    onReady: function (callback) {
        this.cbReady.push(callback);
    },
    triggerReady: function(player){
        for (var i = 0; i < this.cbReady.length; i++) {
            this.cbReady[i](player);
        }
    }

};*/

server.onPosition(function (player, position) {
    gameEngine.playerInputPositions[player] = position;
});

server.onReady(function (player) {
    gameEngine.startGame(player);
});});
