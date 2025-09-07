import { Chess } from "chess.js";
import { Button } from "../components/Button";
import { ChessBoard } from "../components/ChessBoard";
import { MovesList } from "../components/movesList";
import { useSocket } from "../hooks/useSocket";
import { useEffect, useState } from "react";
import { colors } from "../styles/colors";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export type MoveData = { from: string; to: string };

export const Game = () => {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [start, setStart] = useState(false);
  const [moves, setMoves] = useState<MoveData[]>([]);
  const [winner, setWinner] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const [isOnCooldown, setIsOnCooldown] = useState(false);

  useEffect(() => {
    if (!socket) return;
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      switch (message.type) {
        case INIT_GAME:
          setBoard(chess.board());
          setStart(true);
          break;
        case MOVE:
          chess.move(message.move);
          setMoves((prev) => [...prev, message.move]);
          setBoard(chess.board());
          break;
        case GAME_OVER:
          setWinner(message.payload.winner);
          setStart(false);
          break;
      }
    };
  }, [socket]);

  // Cooldown timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setTimeout(() => {
        setCooldown(cooldown - 1);
      }, 1000);
    } else if (isOnCooldown) {
      setIsOnCooldown(false);
    }
    return () => clearTimeout(timer);
  }, [cooldown, isOnCooldown]);

  const handlePlayClick = () => {
    if (isOnCooldown) return;
    
    socket?.send(JSON.stringify({ type: INIT_GAME }));
    setIsOnCooldown(true);
    setCooldown(15);
  };

  if (!socket)
    return (
      <div className="p-6" style={{ color: colors.textPrimary }}>
        Connecting...
      </div>
    );

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: `linear-gradient(
          to bottom right,
          ${colors.bgMain} 0%,
          ${colors.bgMid} 50%,
          ${colors.bgMain} 100%
        )`,
        color: colors.textPrimary,
      }}
    >
      {/* Navbar */}
      <div
        className="w-full px-6 py-4 flex justify-between items-center shadow"
        style={{ backgroundColor: colors.bgPanel }}
      >
        <div className="text-2xl font-bold" style={{ color: colors.primary }}>
          ♟️ ChessZone
        </div>
        <div className="text-sm" style={{ color: colors.textSecondary }}>
          Logged in as Guest
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 justify-center items-center p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Board */}
          <div className="flex justify-center">
            <ChessBoard
              chess={chess}
              setBoard={setBoard}
              setMoves={setMoves}
              socket={socket}
              board={board}
            />
          </div>

          {/* Side Panel */}
          <div
            className="w-80 rounded-2xl shadow-lg p-4 flex flex-col"
            style={{ backgroundColor: colors.bgPanel }}
          >
            <h2
              className="text-lg font-semibold mb-2"
              style={{ color: colors.primary }}
            >
              Moves
            </h2>
            {start ? (
              <MovesList moves={moves} />
            ) : (
              <div className="flex flex-col gap-2">
                <Button
                  onClick={handlePlayClick}
                  disabled={false}
                  style={{
                    opacity: isOnCooldown ? 0.5 : 1,
                    cursor: isOnCooldown ? 'not-allowed' : 'pointer',
                    backgroundColor: isOnCooldown ? colors.textSecondary : undefined
                  }}
                >
                  {isOnCooldown ? `Wait ${cooldown}s` : 'Play'}
                </Button>
                {isOnCooldown && (
                  <div className="text-xs text-center" style={{ color: colors.textSecondary }}>
                    Preventing self-pairing...
                  </div>
                )}
              </div>
            )}
            <div className="mt-4">
              <button
                className="w-full py-2 rounded-lg transition"
                style={{ backgroundColor: colors.danger }}
              >
                Resign
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Winner Popup */}
      {winner && (
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
        >
          <div
            className="p-8 rounded-2xl shadow-lg text-center"
            style={{ backgroundColor: colors.bgPanel }}
          >
            <h2
              className="text-2xl font-bold"
              style={{ color: colors.primary }}
            >
              Game Over
            </h2>
            <p className="mt-2" style={{ color: colors.textSecondary }}>
              {winner} wins!
            </p>
            <button
              onClick={() => setWinner(null)}
              className="mt-4 px-6 py-2 rounded-lg transition"
              style={{ backgroundColor: colors.primary, color: colors.textPrimary }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};