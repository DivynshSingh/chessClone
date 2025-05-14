import { CLOSING, WebSocket } from 'ws'
import { Chess } from 'chess.js'
import {GAME_OVER} from './messages'

export class Game{

    public player1 : WebSocket;
    public player2 : WebSocket;
    private board : Chess;
    private moves : string[];
    private startTime : Date;
    
    
    constructor ( ws1 : WebSocket, ws2 : WebSocket ){
        this.player1 = ws1;
        this.player2 = ws2;
        this.moves = [];
        this.startTime = new Date();
        this.board = new Chess();
        this.player1.send(JSON.stringify({
            type: "init_game",
            payload: "white"
        }));
        this.player2.send(JSON.stringify({
            type: "init_game",
            payload: "black"
        }));
    }
    makeMove( socket: WebSocket, move:{
        from: string,
        to: string
    } ){
        if( (this.moves.length%2===0 && socket!==this.player1)  || (this.moves.length%2===1 && socket!==this.player2) )return;
        try{
            this.board.move(move);
        }catch(e){
            console.log(e);  
            return;
        }

        if(this.board.isGameOver()){
            this.player1.send(JSON.stringify({
                type: GAME_OVER,
                payload:{
                    winner: this.board.turn()==="w" ? "white" : "black"
                }
            }))
            this.player2.send(JSON.stringify({
                type: GAME_OVER,
                payload:{
                    winner: this.board.turn()==="w" ? "white" : "black"
                }
            }))
            return;
        }
        if( this.moves.length%2===1 ){
            this.player1.send(JSON.stringify({
                type: "move",
                move: move
            }));
        }else{
            this.player2.send(JSON.stringify({
                type: "move",
                move: move
            }));
        }
        this.moves.push( "("+move.from+","+move.to+")" );
        console.log(this.board.ascii());
    }
}