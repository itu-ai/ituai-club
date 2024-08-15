/*
Cez Board Service
*/

import { type Move } from "@/interfaces/cez/move";

// theme/colors
const light_tile_color = '#f0d9b5';
const dark_tile_color = '#b58863';

export const drawCezBoard = (ctx: CanvasRenderingContext2D, grid: any, board_size: number, tile_size: number): any => {
  // clear the canvas
  ctx.clearRect(0, 0, board_size, board_size);

  // draw the tiles
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      ctx.fillStyle = (i + j) % 2 === 0 ? dark_tile_color : light_tile_color;
      ctx.fillRect(i * tile_size, j * tile_size, tile_size, tile_size);
    }
  }

  // draw the pieces
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const piece = grid.grid[i][j];
      if (piece) {
        const img = new Image();
        img.src = `/cez/${piece}.png`;
        img.onload = () => {
          // To Check Later: Make sure tiles are correct
          ctx.drawImage(img, i * tile_size, (7 - j) * tile_size, tile_size, tile_size);
        }
      }
    }
  }
}

export const drawLegalMoves = (ctx: CanvasRenderingContext2D, grid: any, selectedPiece: any, tile_size: number): any => {
  if (selectedPiece !== null) return;
  ctx.fillStyle = '#00ff00';
  // draw all the legal moves of the selected piece
  const legalMoves = grid.legalMoves.filter((move: Move) => selectedPiece !== null && move.from.x === selectedPiece.x && move.from.y === selectedPiece.y);
  legalMoves.forEach((move: Move) => {
    ctx.fillRect(move.to.x * tile_size, (7 - move.to.y) * tile_size, tile_size, tile_size);
  });

}

export const mouseToTile = (mouse_offset_x: number, mouse_offset_y: number, tile_size: number): {x: number, y: number} => {
  return {
    x: Math.floor(mouse_offset_x / tile_size),
    y: 7 - Math.floor(mouse_offset_y / tile_size)
  }
}
