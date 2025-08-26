import { Chess } from "chess.js";
import { Button } from "../components/Button"
import { ChessBoard } from "../components/ChessBoard"
import { MovesList } from "../components/movesList"
import { useSocket } from "../hooks/useSocket"
import { useEffect, useState } from "react";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export type MoveData = {
    from: string,
    to: string
}

export const Game = () => {

    const socket = useSocket();
    const [chess, setChess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());
    const [start, setStart] = useState(false);
    const [wait, setWait] = useState(false);
    const [lock, setLock] = useState(false);
    const [moves, setMoves] = useState<MoveData[]>([]);


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
                    setMoves(prev => [...prev, message.move]);
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
     <div>
        <div className="w-full px-6 py-4 bg-gray-800 shadow-md flex justify-between items-center">
            <div className="text-2xl font-bold text-green-400">
                    ♟️ ChessZone 
            </div>
                <div className="hidden md:flex space-x-4 text-sm">
                    <div className="text-xl text-green-300 transition">User</div>
                </div>
            </div>
        <div className="flex justify-center">
            <div className="pt-[10vh] w-full">
                <div className="flex justify-center w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full ">
                       
                        <div className="flex justify-center">
                            <ChessBoard chess={chess} setBoard={setBoard} setMoves={setMoves} socket={socket} board={board} />
                        </div>

                        <div className="flex justify-center">
                            <div className="flex justify-center w-80 bg-slate-800 rounded-xl">
                                <div  className="w-[80%] h-[90%] pt-3">
                                    { start ? ( <MovesList moves={moves} /> ) : ( <Button onClick={() => {
                                        if(lock) return;
                                        setWait(true);
                                        setLock(true);
                                        socket.send(JSON.stringify({
                                            type: INIT_GAME
                                        }));
                                        setTimeout(() => {
                                            setLock(false);
                                            setWait(false);
                                        }, 10000);
                                    }}>
                                        { wait ? 'Waiting...' : 'Play' }
                                    </Button> ) }
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>

            </div>
        </div>
     </div>
    </>
}