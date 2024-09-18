/* eslint-disable @typescript-eslint/no-empty-function */
"use client";
import React, {
  type ReactNode,
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { Board, Player } from "~/types";



const ROWS = 6;
const COLS = 7;

export const AppContext = createContext<{
  playerOne: Player;
  playerTwo: Player;
  board: Board;
  setBoard: Dispatch<SetStateAction<Board>>;
  setPlayerOne: Dispatch<SetStateAction<Player>>;
  setPlayerTwo: Dispatch<SetStateAction<Player>>;
  isPlayerOneTurn: boolean;
  setIsPlayerOneTurn: Dispatch<SetStateAction<boolean>>;
  updateBoard: (row: number, col: number) => void;
  resetBoard: () => void;
  gameOver: boolean;
  isTie: boolean;
}>({
  playerOne: {
    name: "",
    wins: 0,
  },
  playerTwo: {
    name: "",
    wins: 0,
  },
  board: new Array(6).fill(new Array(7).fill("")) as Board,
  setBoard: () => {},
  setPlayerOne: () => {},
  setPlayerTwo: () => {},
  isPlayerOneTurn: true,
  setIsPlayerOneTurn: () => {},
  updateBoard: () => {},
  resetBoard: () => {},
  gameOver: false,
  isTie: false,
});

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [playerOne, setPlayerOne] = useState({
    name: "",
    wins: 0,
  });
  const [playerTwo, setPlayerTwo] = useState({
    name: "",
    wins: 0,
  });
  const [board, setBoard] = useState<Board>(
    new Array(ROWS).fill(new Array(COLS).fill(""))
  );
  const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [isTie, setIsTie] = useState(false);

  const updateBoard = (row: number, col: number) => {
    if (row >= ROWS || col >= COLS || row < 0 || col < 0) return;

    const newBoard = board.map((row) => [...row]);
    for (let i = newBoard.length - 1; i >= 0; i--) {
      if (!newBoard[i]?.[col]) {
        newBoard[i]![col] = isPlayerOneTurn ? "X" : "O";
        break;
      }
    }
    setBoard(newBoard);

    if (isGameWon(newBoard)) {
      setGameOver(true);
      if (isPlayerOneTurn) {
        setPlayerOne((prev) => ({
          ...prev,
          wins: prev.wins + 1,
        }));
      } else {
        setPlayerTwo((prev) => ({
          ...prev,
          wins: prev.wins + 1,
        }));
      }
    } else if (!newBoard.flat().includes("")) {
      setIsTie(true);
    } else {
      setIsPlayerOneTurn((prev) => !prev);
    }
  };

  const isGameWon = (newBoard: string[][]) => {
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const player = newBoard[row]?.[col];
        if (player) {
          if (
            newBoard[row]?.[col + 1] === player &&
            newBoard[row]?.[col + 2] === player &&
            newBoard[row]?.[col + 3] === player
          )
            return true;

          if (
            newBoard[row + 1]?.[col] === player &&
            newBoard[row + 2]?.[col] === player &&
            newBoard[row + 3]?.[col] === player
          )
            return true;

          if (
            newBoard[row + 1]?.[col + 1] === player &&
            newBoard[row + 2]?.[col + 2] === player &&
            newBoard[row + 3]?.[col + 3] === player
          )
            return true;

          if (
            newBoard[row + 1]?.[col - 1] === player &&
            newBoard[row + 2]?.[col - 2] === player &&
            newBoard[row + 3]?.[col - 3] === player
          )
            return true;
        }
      }
    }
    return false;
  };

  const resetBoard = () => {
    setBoard(new Array(ROWS).fill(new Array(COLS).fill("")));
    setIsTie(false);
    setGameOver(false);
    setIsPlayerOneTurn(true);
  };

  return (
    <>
      <AppContext.Provider
        value={{
          playerOne,
          setPlayerOne,
          playerTwo,
          setPlayerTwo,
          board,
          setBoard,
          isPlayerOneTurn,
          setIsPlayerOneTurn,
          updateBoard,
          resetBoard,
          gameOver,
          isTie,
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
};

export default AppProvider;
