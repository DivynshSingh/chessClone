import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/Game";
import { MoveData } from "../screens/Game";

export const ChessBoard = ({
  chess,
  setBoard,
  setMoves,
  board,
  socket,
  color,
}: {
  chess: any;
  setBoard: any;
  setMoves: any;
  color: boolean; // true = white, false = black
  board: (
    | {
        square: Square;
        type: PieceSymbol;
        color: Color;
      }
    | null
  )[][];
  socket: WebSocket;
}) => {
  const [from, setFrom] = useState<null | Square>(null);
  const [invalidSquare, setInvalidSquare] = useState<string | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<string[]>([]);

  const renderedBoard = color ? board : [...board].reverse();

  return (
    <div className="border border-gray-400">
      {renderedBoard.map((row, i) => {
        const rowCells = color ? row : [...row].reverse();
        return (
          <div key={i} className="grid grid-cols-8">
            {rowCells.map((square, j) => {
              const file = color ? j : 7 - j;
              const rank = color ? 7 - i : i;
              const squareRepresentation = `${String.fromCharCode(
                97 + file
              )}${rank + 1}` as Square;

              const isDarkSquare = (file + rank) % 2 === 1;
              const isSelected = from === squareRepresentation;
              const isInvalid = invalidSquare === squareRepresentation;
              const isMoveOption = possibleMoves.includes(squareRepresentation);

              return (
                <div
                  key={j}
                  onClick={() => {
                    if (!from) {
                      // First click to select a piece
                      if (!square || square.color !== (color ? "w" : "b")) {
                        setInvalidSquare(squareRepresentation);
                        setTimeout(() => setInvalidSquare(null), 500);
                        return;
                      }
                      setFrom(squareRepresentation);

                      const moves = chess.moves({
                        square: squareRepresentation,
                        verbose: true,
                      });
                      setPossibleMoves(moves.map((m: any) => m.to));
                    } else {
                      // perform the move second time
                      try {
                        socket.send(
                          JSON.stringify({
                            type: MOVE,
                            move: {
                              from: from,
                              to: squareRepresentation,
                            },
                          })
                        );
                        chess.move({
                          from: from,
                          to: squareRepresentation,
                        });
                        setBoard(chess.board());
                        setMoves((prev: MoveData[]) => [
                          ...prev,
                          { from: from as string, to: squareRepresentation as string },
                        ]);
                      } catch (e) {
                        console.log("Invalid move:", e);
                      }

                      setFrom(null);
                      setPossibleMoves([]);
                    }
                  }}
                  className={`w-16 h-16 flex items-center justify-center transition relative
                    ${
                      isInvalid
                        ? "bg-red-500 animate-pulse"
                        : isSelected
                        ? "bg-blue-800"
                        : isDarkSquare
                        ? "bg-green-800"
                        : "bg-white"
                    }`}
                >
                  {/* piece image */}
                  {square ? (
                    <img
                      src={`/${
                        square?.color === "b"
                          ? square?.type
                          : `${square?.type?.toUpperCase()} copy`
                      }.png`}
                    />
                  ) : null}

                  {/* highlight legal moves */}
                  {isMoveOption && (
                    <div className="absolute w-4 h-4 rounded-full bg-blue-400 opacity-70" />
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
