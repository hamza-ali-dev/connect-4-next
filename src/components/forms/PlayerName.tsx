import type { Player } from "~/types";

const PlayerName = ({ player, active, color }: { player: Player; active: boolean, color: string }) => {
  return (
    <div>
      <div className={`flex gap-2 ${active ? "text-green-500" : ""}`}>
        <p>{player.name}</p>{" "}
        <div className={`h-4 w-4 rounded-full ${color} `}></div>
      </div>
      <div>Wins: {player.wins}</div>
    </div>
  );
};

export default PlayerName