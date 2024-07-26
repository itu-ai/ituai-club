"use client";

import { useState, useEffect } from "react";
import { CezBoard } from "./board";

export default function CezPage() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen overflow-x-hidden">
      <h1 className="text-4xl font-bold text-center text-white">
        Cez
      </h1>
      <div className="py-4">
        <CezBoard />
      </div>
    </div>
  );
}
