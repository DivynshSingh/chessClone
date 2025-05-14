import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/Game";


export const ChessBoard = ({chess, setBoard, board, socket}: {
    chess : any;
    setBoard: any;
    board:({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][];
    socket:WebSocket;
}) => {
    const [from, setFrom] = useState<null | Square>(null);
    return (
        <div className="border border-gray-400">
          {board.map((row, i) => {
            return (
              <div key={i} className="grid grid-cols-8">
                {row.map((square, j) => {
                  const isDarkSquare = (i + j) % 2 === 1; // Calculate dark and light squares
                  const squareRepresentation = String( String.fromCharCode(97+j) + String.fromCharCode(56-i) ) as Square;
                  const isSelected = from === squareRepresentation;
                  return (
                    <div onClick={ () => {
                        if( !from ){
                            setFrom(squareRepresentation);
                        }else{
                            socket.send(JSON.stringify({
                                type : MOVE,
                                move:{
                                    from : from,
                                    to : squareRepresentation
                                }
                            }))
                            console.log({
                                from : from, 
                                to : squareRepresentation
                            });
                            setFrom(null);
                            try{
                              chess.move({
                                from : from,
                                to : squareRepresentation
                              });
                              setBoard(chess.board());
                            }catch(e){
                              setFrom(squareRepresentation);
                              console.log(e);
                            }
                        }
                    }} key={j}
                      className={`w-16 h-16 ${
                        isDarkSquare ? 'bg-green-800' : 'bg-white'
                      } flex items-center justify-center ${ isSelected ? "bg-blue-500" : ""}`}
                    >
                      { square ? <img src={ `/${ square?.color==="b" ? square?.type : `${square?.type?.toUpperCase()} copy`}.png` }/> : null }
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      );
      
}