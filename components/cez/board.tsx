"use client";

import { useRef, useState, useEffect } from "react";

import { Grid } from "@/interfaces/cez/grid";
import { Move } from "@/interfaces/cez/move";
import { Tile } from "@/interfaces/cez/tile";
import { drawCezBoard, drawLegalMoves, mouseToTile } from "@/services/cez_board";

interface Props {
  board_size?: number;
}

interface GameStats {
  isGameOver: boolean;
  winnerSide: "white" | "black" | "draw" | "none";
  isWhitesTurn: boolean;
  moveHistory: Move[];
}

export const CezBoard: React.FC<Props> = ({ board_size = 720 }) => {
  // canvas variabels
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [grid, setGrid] = useState<Grid>(new Grid());
  let selectedPiece: Tile | null = null;
  const tile_size = board_size / 8;

  // game control variables
  const [gameStats, setGameStats] = useState<GameStats>({
    isGameOver: false,
    winnerSide: 'none',
    isWhitesTurn: true,
    moveHistory: []
  });

  const drawBoard = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;
    drawCezBoard(ctx, grid, board_size, tile_size);
    drawLegalMoves(ctx, grid, selectedPiece, tile_size);
  }

  useEffect(() => {
    drawBoard();
  });

  const handlePieceMove = (move: Move) => {
    grid.movePiece(move);
    selectedPiece = null;
    if (grid.isGameOver) {
      setGameStats({
        isGameOver: true,
        winnerSide: grid.winnerSide,
        isWhitesTurn: grid.isWhitesTurn,
        moveHistory: grid.moveHistory,
      });
    }
    else {
      setGameStats({
        isGameOver: false,
        winnerSide: 'none',
        isWhitesTurn: grid.isWhitesTurn,
        moveHistory: grid.moveHistory,
      });
    }
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    // get the square/tile the mouse is in
    const { x, y } = mouseToTile(e.nativeEvent.offsetX, e.nativeEvent.offsetY, tile_size);
    const hitTile = grid.grid[x][y];
    if (selectedPiece) {
      const move = grid.legalMoves.find((move: Move) => selectedPiece !== null && move.to.x === x && move.to.y === y && move.from.x === selectedPiece.x && move.from.y === selectedPiece.y);
      if (move) {
        handlePieceMove(move);
      }
      else {
        selectedPiece = null;
      }
    }
    else {
      if (hitTile !== '') {
        if (grid.isWhitesTurn === (hitTile === hitTile.toUpperCase())) {
          selectedPiece = { x, y };
        }
      }
      else {
        selectedPiece = null;
      }
    }
    drawBoard();
  }

  return (
    <div className="flex flex-col lg:flex-row items-start justify-center gap-4">
      {/* Game Visuals/Canvas */}
      <canvas 
        id="cez-board"
        width={board_size}
        height={board_size}
        ref={canvasRef}
        onMouseDown={handleMouseDown}
      />
      {/* Game Controls */}
      <div className="flex flex-col w-full h-auto lg:w-[24rem] lg:h-full items-start justify-start gap-4">
        {!gameStats.isGameOver &&
          <>
            <p className="text-start font-medium text-zinc-300">
              {`Turn: ${grid.isWhitesTurn ? 'White' : 'Black'}`}
            </p>
          </>
        }
        {gameStats.isGameOver && 
          <>
            <p className="text-start font-medium text-zinc-300">
              {`Game Over. Winner: ${gameStats.winnerSide}`}
            </p>
          </>
        }
        {/* Move History */}
        <div className="grid grid-cols-2 w-full lg:w-auto h-auto lg:h-[24rem] items-start justify-start gap-2 overflow-y-auto">
          {/* White moves */}
          <div className="flex flex-col items-start justify-start gap-2">
            <p className="text-start font-medium text-zinc-300">White Moves</p>
            {gameStats.moveHistory.map((move: Move, index: number) => {
              if (index % 2 === 0) {
                return (
                  <p className="text-start font-light text-zinc-300" key={index}>
                    {`${index + 1}. ${move.from.x},${move.from.y} to ${move.to.x},${move.to.y}`}
                  </p>
                );
              }
              return null;
            })}
          </div>
            {/* Black moves */}
          <div className="flex flex-col items-start justify-start gap-2">
            <p className="text-start font-medium text-zinc-300">Black Moves</p>
            {gameStats.moveHistory.map((move: Move, index: number) => {
              if (index % 2 === 1) {
                return (
                  <p className="text-start font-light text-zinc-300" key={index}>
                    {`${index + 1}. ${move.from.x},${move.from.y} to ${move.to.x},${move.to.y}`}
                  </p>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

