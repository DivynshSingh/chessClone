import React from "react";
import { MoveData } from "../screens/Game";

type MovesListProps = {
  moves: MoveData[];
};

export const MovesList: React.FC<MovesListProps> = ({ moves }) => {
  return (
    <div className="w-full max-h-[400px] overflow-y-auto bg-gray-900 text-white p-2 rounded-md shadow-md mt-4 text-sm">
      {moves.map((move, index) => (
        <div
          key={index}
          className={`flex justify-start gap-6 py-1 px-2 ${
            index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
          }`}
        >
          <span className="w-6 font-semibold">
            {index+1}.
          </span>
          <span className="w-8 font-semibold">
            {index % 2 === 0 ? "W" : "B"}
          </span>
          <span className="w-24">{`${move.from} → ${move.to}`}</span>
        </div>
      ))}
    </div>
  );
};
