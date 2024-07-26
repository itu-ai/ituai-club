"use client";

import { useState, useEffect } from "react";
import { CezBoard } from "./board";

export default function CezPage() {
  const [board_size, setBoardSize] = useState<number>(720);
  useEffect (() => {
    setBoardSize(window.innerWidth * 0.8);
    window.addEventListener('resize', () => {
      setBoardSize(window.innerWidth * 0.8);
    });
    return () => {
      window.removeEventListener('resize', () => {
        setBoardSize(window.innerWidth * 0.8);
      });
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-center text-white">
        Cez
      </h1>
      <div className="py-4">
        <CezBoard board_size={board_size} />
      </div>
    </div>
  );
}
