"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import Board from "~/components/Board";
import PlayerName from "~/components/forms/PlayerName";
import { AppContext } from "~/providers/AppProvider";

const GamePage = () => {
  const {
    playerOne,
    playerTwo,
    board,
    isPlayerOneTurn,
    updateBoard,
    resetBoard,
    gameOver,
    isTie,
  } = useContext(AppContext);

  const router = useRouter();

  if (!playerOne.name || !playerTwo.name) router.push("/");

  const onClick = (row: number, col: number) => {
    updateBoard(row, col);
  };

  useEffect(() => {
    return () => {
      resetBoard();
    };
  }, []);

  const playAgainButton = (gameOver || isTie) && (
    <button
      className="rounded-md bg-black px-2 py-1 text-white"
      onClick={() => resetBoard()}
    >
      Play Again
    </button>
  )

  const winningTitle = gameOver && (
    <h2 className="text-2xl font-bold">
      {isPlayerOneTurn ? playerOne.name : playerTwo.name} won!
    </h2>
  )

  const tie = isTie && <h2 className="text-2xl font-bold">{"It's a tie!"}</h2>

  return (
    <div className="flex h-screen -translate-x-0.5 -translate-y-0.5 flex-col items-center justify-center gap-2">
      <h1 className="text-3xl font-bold">Connect 4</h1>
      {winningTitle}
      {tie}
      {playAgainButton}
      <div className="flex w-1/3 justify-between">
        <PlayerName player={playerOne} active={isPlayerOneTurn} color="bg-black" />
        <PlayerName player={playerTwo} active={!isPlayerOneTurn} color="bg-red-500" />
      </div>
      <div>
        <Board board={board} onClick={onClick} />
      </div>
      <div>
        <Link href={"/"} className="rounded-md bg-slate-700 p-2 text-white">
          Quit
        </Link>
      </div>
    </div>
  );
};

export default GamePage;
