import { Chess } from "chess.js";
import { Button } from "../components/Button"
import { ChessBoard } from "../components/ChessBoard"
import { useSocket } from "../hooks/useSocket"
import { useEffect, useState } from "react";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export const Game = () => {

    const socket = useSocket();
    const [chess, setChess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());
    const [start, setStart] = useState(false);

    useEffect(() => {
        if (!socket) {
            return;
        }
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log(message);
            switch (message.type) {
                case INIT_GAME:
                    setBoard(chess.board());
                    console.log("Game Inititalised");
                    setStart(true);
                    break;
                case MOVE:
                    console.log("move recieved");
                    chess.move(message.move);
                    console.log(message);
                    setBoard(chess.board());
                    break;
                case GAME_OVER:
                    console.log("Game over");
                    setStart(false);
                    break;
                default:
                    console.log('should not have happende, something other then init, move, over');
                    break;
            }
            console.log(chess.ascii());
        }
    }, [socket]);

    if (!socket) return <div>Connecting...</div>

    return <>
        <div className="flex justify-center">
            <div className="pt-8 w-full">
                <div className="flex justify-center w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-[70%]">
                        <div className="flex justify-center">
                            <ChessBoard chess={chess} setBoard={setBoard} socket={socket} board={board} />
                        </div>

                        <div className="flex justify-center">
                            <div className="flex justify-center w-80 bg-slate-800 rounded-xl">
                                <div  className="w-[30%] pt-3">
                                    { !start && <Button onClick={() => {
                                        socket.send(JSON.stringify({
                                            type: INIT_GAME
                                        }));
                                    }}>
                                        Play
                                    </Button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </>
}