"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const messages_1 = require("./messages");
class Game {
    constructor(ws1, ws2) {
        this.player1 = ws1;
        this.player2 = ws2;
        this.moves = [];
        this.startTime = new Date();
        this.board = new chess_js_1.Chess();
        this.player1.send(JSON.stringify({
            type: "init_game",
            payload: "white"
        }));
        this.player2.send(JSON.stringify({
            type: "init_game",
            payload: "black"
        }));
    }
    makeMove(socket, move) {
        if ((this.moves.length % 2 === 0 && socket !== this.player1) || (this.moves.length % 2 === 1 && socket !== this.player2))
            return;
        try {
            this.board.move(move);
        }
        catch (e) {
            console.log(e);
            return;
        }
        if (this.board.isGameOver()) {
            this.player1.send(JSON.stringify({
                type: messages_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "white" : "black"
                }
            }));
            this.player2.send(JSON.stringify({
                type: messages_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "white" : "black"
                }
            }));
            return;
        }
        if (this.moves.length % 2 === 1) {
            this.player1.send(JSON.stringify({
                type: "move",
                move: move
            }));
        }
        else {
            this.player2.send(JSON.stringify({
                type: "move",
                move: move
            }));
        }
        this.moves.push("(" + move.from + "," + move.to + ")");
        console.log(this.board.ascii());
    }
}
exports.Game = Game;
