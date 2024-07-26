"use client";

import { useState, useEffect } from "react";
import { CezBoard } from "./board";

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
      <h1 className="text-4xl font-bold text-center text-white mt-4 lg:mt-8">
        Cez
      </h1>
      <div className="py-4 mt-4">
        <CezBoard board_size={board_size} />
      </div>
    </div>
  );
}
