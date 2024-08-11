"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { CezBoardAI } from "@/components/cez/board_ai";

export default function CezPage() {
  const [board_size, setBoardSize] = useState<number>(720);
  useEffect (() => {
    // get minimum of window width and height
    setBoardSize(Math.min(window.innerWidth, window.innerHeight) * 0.8);
    window.addEventListener('resize', () => {
      setBoardSize(Math.min(window.innerWidth, window.innerHeight) * 0.8);
    });
    return () => {
      window.removeEventListener('resize', () => {
        setBoardSize(Math.min(window.innerWidth, window.innerHeight) * 0.8);
      });
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="fixed top-2 right-2 lg:top-5 lg:right-5 z-1 w-10 h-10 lg:w-16 lg:h-16 p-1 ">
        <Link href="/">
          <img
            src="/logo/ai_logo.svg"
            alt="Logo"
          />
        </Link>
      </div>
      <h1 className="text-4xl font-bold text-center text-white mt-4 lg:mt-8">
        Cez
      </h1>
      <div className="py-4 mt-4">
        <CezBoardAI board_size={board_size} is_player_white={true} />
      </div>
    </div>
  );
}
