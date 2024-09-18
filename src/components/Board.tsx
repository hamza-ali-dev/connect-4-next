import type { Board } from "~/types";

const Board = ({
  board,
  onClick,
}: {
  board: Board;
  onClick: (row: number, col: number) => void;
}) => {
  return (
    <div>
      {board.map((row, rowIndex) => {
        return (
          <div className="flex" key={rowIndex}>
            {row.map((col, colIndex) => {
              return (
                <div
                  className={`flex h-16 w-16 items-center justify-center border ${rowIndex === 0 ? "hover:bg-slate-200" : ""}`}
                  key={colIndex}
                  onClick={
                    rowIndex === 0
                      ? () => onClick(rowIndex, colIndex)
                      : undefined
                  }
                >
                  {board[rowIndex]?.[colIndex] && (
                    <div
                      className={`h-10 w-10 rounded-full ${board[rowIndex]?.[colIndex] === "X" ? "bg-black" : "bg-red-500"}`}
                    ></div>
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

export default Board;
