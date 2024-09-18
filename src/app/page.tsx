"use client";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import GameStartForm from "~/components/forms/GameStartForm";
import { AppContext } from "~/providers/AppProvider";

export default function HomePage() {
  const { setPlayerOne, setPlayerTwo } = useContext(AppContext);

  const router = useRouter();

  const onSubmit = ({ p1Name, p2Name }: { p1Name: string; p2Name: string }) => {
    setPlayerOne((prev) => ({ ...prev, name: p1Name }));
    setPlayerTwo((prev) => ({ ...prev, name: p2Name }));
    router.push("/start");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen -translate-x-0.5 -translate-y-0.5">
      <h1 className="text-3xl font-bold">Connect 4</h1>
      <GameStartForm onSubmit={onSubmit} />
    </div>
  );
}
