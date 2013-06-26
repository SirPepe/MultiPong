/**
 * Created with JetBrains WebStorm.
 * User: gruberan
 * Date: 26.06.13
 * Time: 14:39
 * To change this template use File | Settings | File Templates.
 */


define(["server", "jquery"], function (server) {

    var gameEngine = {
        $playGround: null,
        playerInputPositions: [0, 0],
        player0: {elementId: "player0", id: 0},
        player1: {elementId: "player1", id: 1},
        ball: {x: 3, y: 3, $ball: null},
        ready: false,
        countDown: 3,

        init: function () {
            this.$playGround = $("#playground");
            this.ball.$ball = $("#ball");
            var randoms = [-3, -2, 2, 3];
            this.ball.x = randoms[parseInt(Math.random() * 4)];
            this.ball.y = randoms[parseInt(Math.random() * 4)];
        },

        startGame: function () {
            if (!this.ready) {
                gameEngine.countDown = 3;
                this.ball.$ball.show();
                this.ball.$ball.css({"top": "50%", "left": "50%"});
                var randoms = [-3, -2, 2, 3];
                this.ball.x = randoms[parseInt(Math.random() * 4)];
                this.ball.y = randoms[parseInt(Math.random() * 4)];
                $(".gameState").html(gameEngine.countDown);
                var intervalId = window.setInterval(function () {
                    gameEngine.countDown--;
                    if (gameEngine.countDown == 0) {
                        $(".gameState").html("");
                        gameEngine.ready = true;
                        window.clearInterval(intervalId);
                    } else {
                        $(".gameState").html(gameEngine.countDown);
                    }

                }, 1000);
            }
            // this.ready = true;
        },

        movePaddles: function () {
            var $player0 = $("#" + this.player0.elementId);
            var $player1 = $("#" + this.player1.elementId);
            this.movePaddle($player0, this.playerInputPositions[0]);
            this.movePaddle($player1, this.playerInputPositions[1]);
        },
        movePaddle: function ($paddle, additionalPos) {
            var position = $paddle.position();
            var offset = additionalPos * 7;
            if (position.top + offset <= this.$playGround.height() - $paddle.height() && position.top + offset >= 0) {
                $paddle.css("top", (position.top + offset) + "px");
            }
        },
        collision: function ($player, position) {
            var pBottom = $player.position().top;
            var pTop = pBottom + $player.height();
            var center = position.top + (this.ball.$ball.height() / 2);
            if (center > pBottom && pTop > center) {
                this.ball.y += parseInt(Math.random() * 2);
                this.ball.x = (-1) * this.ball.x;
                return true;
            }
            else {
                $(".gameState").html("Game Over");
                this.ball.$ball.hide();
                return false;
            }
        }, moveBall: function () {
            if (this.ready) {


                var position = this.ball.$ball.position();

                if (position.top + this.ball.y < 0 || position.top + this.ball.y > this.$playGround.height() - this.ball.$ball.height()) {
                    this.ball.y = (-1) * this.ball.y;
                }
                var newY = position.top + this.ball.y;

                var $player0 = $("#" + this.player0.elementId);
                var $player1 = $("#" + this.player1.elementId);

                if (position.left + this.ball.x <= $player0.width() + 5) {
                    this.ready = this.collision($player0, position);
                    if (!this.ready) {
                        server.postGameOver(player1.id)
                    }
                }

                if (position.left + this.ball.x > this.$playGround.width() - this.ball.$ball.width() - $player1.width() - 5) {
                    this.ready = this.collision($player1, position);
                    if (!this.ready) {
                        server.postGameOver(player0.id)
                    }
                }

                var newX = position.left + this.ball.x;

                this.ball.$ball.css({"left": newX + "px", "top": newY + "px"});
            }


        }


    };

    window.requestAnimationFrame(function move() {
        gameEngine.movePaddles();
        gameEngine.moveBall();
        window.requestAnimationFrame(move);

    });


    server.onPosition(function (player, position) {
        console.log("got new position: ", player, position);
        gameEngine.playerInputPositions[player] = position;
    });

    server.onReady(function () {
        console.log("on ready: ");
        gameEngine.startGame();
    });
});
