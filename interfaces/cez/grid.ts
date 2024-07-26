import { type Move } from "./move";
import { type Tile } from "./tile";

/*
There are only pawns and knights on the board

pawns are moving 1 square in any direction, not diagonally
if there is an enemy piece in the square that a pawn can move, it can capture it by going over that square
Example: if there is a white pawn in 1x1 and a black pawn or black knight in 1x2, the white pawn can move to 1x3 by capturing the black piece
knights are moving 2 squares in any direction, not diagonally
knights can jump over other pieces
Example: if there is a white knight in 1x1 and a black pawn in 1x3, the white knight can move to 1x4 by jumping over the black pawn and capturing it
if the black piece is in 1x2, the white knight can move to 1x3 by jumping over the black pawn without capturing it

The most important rule is that, if there is capture in the legal moves, the player must capture a piece
if there is more than one capture in the legal moves, the player can choose which piece to capture
if there is no capture in the legal moves, the player can move any piece

to win the game, all the pieces must be interconnected to the 2x2 center squares
all the pieces must be horizontally, vertically (not diagonally) connected to each other and at least one of the pieces must be connected to the center squares
if there is more than 1 piece interconnected island, but if all islands are connected to the center squares, the player wins the game

if the player has left no pieces, meaning all are captured, the player loses the game
*/

const pawn_directions = [
  { x: 0, y: 1 },
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: -1, y: 0 }
];

const knight_directions = [
  { x: 2, y: 0 },
  { x: -2, y: 0 },
  { x: 0, y: 2 },
  { x: 0, y: -2 }
];

const center_squares = [{ x: 3, y: 3 }, { x: 3, y: 4 }, { x: 4, y: 3 }, { x: 4, y: 4 }];

const isInGrid = (x: number, y: number) => {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}


export class Grid {
  private _grid: string[][];
  public legalMoves: Move[] = [];
  public isWhitesTurn: boolean = true;
  public isGameOver: boolean = false;
  public winnerSide: "white" | "black" | "draw" | "none" = "none";
  public moveHistory: Move[] = [];
  
  constructor() {
    this._grid = new Array(8).fill(null).map(() => new Array(8).fill(''));
    this.setInitialPosition();
  }

  get grid() {
    return this._grid;
  }

  set grid(newGrid: string[][]) {
    this._grid = newGrid;
  }

  public setInitialPosition() {
    this.isGameOver = false;
    this.winnerSide = "none";

    this._grid = new Array(8).fill(null).map(() => new Array(8).fill(''));

    this._grid[0][0] = 'k';
    this._grid[0][1] = 'p';
    this._grid[1][0] = 'p';
    this._grid[1][1] = 'p';

    this._grid[7][7] = 'k';
    this._grid[7][6] = 'p';
    this._grid[6][7] = 'p';
    this._grid[6][6] = 'p';

    this._grid[0][7] = 'K';
    this._grid[0][6] = 'P';
    this._grid[1][7] = 'P';
    this._grid[1][6] = 'P';

    this._grid[7][0] = 'K';
    this._grid[7][1] = 'P';
    this._grid[6][0] = 'P';
    this._grid[6][1] = 'P';

    this.isWhitesTurn = true;
    this.calculateLegalMoves();
  }

  public calculateLegalMoves() {
    this.legalMoves = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const piece = this._grid[i][j];
        if (piece) {
          // white pieces
          if (piece === 'P' && this.isWhitesTurn) {
            for (const direction of pawn_directions) {
              const move_x = i + direction.x;
              const move_y = j + direction.y;
              if (isInGrid(move_x, move_y)) {
                const nextPiece = this._grid[move_x][move_y];
                if (nextPiece) {
                  if (nextPiece.toLowerCase() === nextPiece) {
                    const nextMove_x = move_x + direction.x;
                    const nextMove_y = move_y + direction.y;
                    if (isInGrid(nextMove_x, nextMove_y) && !this._grid[nextMove_x][nextMove_y]) {
                      this.legalMoves.push({ from: { x: i, y: j }, to: { x: nextMove_x, y: nextMove_y }, capture: { x: move_x, y: move_y } });
                    }
                  }
                }
                else {
                  this.legalMoves.push({ from: { x: i, y: j }, to: { x: move_x, y: move_y }, capture: null });
                }
              }
            }
          }
          else if (piece === 'K' && this.isWhitesTurn) {
            for (const direction of knight_directions) {
              const move_x = i + direction.x;
              const move_y = j + direction.y;
              if (isInGrid(move_x, move_y)) {
                const nextPiece = this._grid[move_x][move_y];
                if (nextPiece) {
                  if (nextPiece.toLowerCase() === nextPiece) {
                    const nextMove_x = move_x + direction.x / 2;
                    const nextMove_y = move_y + direction.y / 2;
                    if (isInGrid(nextMove_x, nextMove_y) && !this._grid[nextMove_x][nextMove_y]) {
                      this.legalMoves.push({ from: { x: i, y: j }, to: { x: nextMove_x, y: nextMove_y }, capture: { x: move_x, y: move_y } });
                    }
                  }
                }
                else {
                  this.legalMoves.push({ from: { x: i, y: j }, to: { x: move_x, y: move_y }, capture: null });
                } 
              }
            }
              
          }
          // black pieces
          else if (piece === 'p' && !this.isWhitesTurn) {
            for (const direction of pawn_directions) {
              const move_x = i + direction.x;
              const move_y = j + direction.y;
              if (isInGrid(move_x, move_y)) {
                const nextPiece = this._grid[move_x][move_y];
                if (nextPiece) {
                  if (nextPiece.toLowerCase() !== nextPiece){
                    const nextMove_x = move_x + direction.x;
                    const nextMove_y = move_y + direction.y;
                    if (isInGrid(nextMove_x, nextMove_y) && !this._grid[nextMove_x][nextMove_y]) {
                      this.legalMoves.push({ from: { x: i, y: j }, to: { x: nextMove_x, y: nextMove_y }, capture: { x: move_x, y: move_y } });
                    }
                  }
                }
                else {
                  this.legalMoves.push({ from: { x: i, y: j }, to: { x: move_x, y: move_y }, capture: null });
                }
              }
            }
          }
          else if (piece === 'k' && !this.isWhitesTurn) {
            for (const direction of knight_directions) {
              const move_x = i + direction.x;
              const move_y = j + direction.y;
              if (isInGrid(move_x, move_y)) {
                const nextPiece = this._grid[move_x][move_y];
                if (nextPiece) {
                  if (nextPiece.toLowerCase() !== nextPiece) {
                    const nextMove_x = move_x + direction.x / 2;
                    const nextMove_y = move_y + direction.y / 2;
                    if (isInGrid(nextMove_x, nextMove_y) && !this._grid[nextMove_x][nextMove_y]) {
                      this.legalMoves.push({ from: { x: i, y: j }, to: { x: nextMove_x, y: nextMove_y }, capture: { x: move_x, y: move_y } });
                    }
                  }
                }
                else {
                  this.legalMoves.push({ from: { x: i, y: j }, to: { x: move_x, y: move_y }, capture: null });
                } 
              }
            }
          }
        }
      }
    }
    // if there is any capture in the legal moves, remove the moves that do not have capture
    const hasCapture = this.legalMoves.some((move: Move) => move.capture !== null);
    if (hasCapture) {
      this.legalMoves = this.legalMoves.filter((move: Move) => move.capture !== null);
    }
  }

  public isConnected(pieces: Tile[]) {
    // check if all pieces are connected to each other and at least one of them is connected to the center squares
    // there could be more than one interconnected islands but eventually if all the pieces are connected to the center squares, the player wins
    const islands = [];
    const visited = new Array(8).fill(null).map(() => new Array(8).fill(false));
    for (const piece of pieces) {
      if (!visited[piece.x][piece.y]) {
        const island = [];
        const queue = [piece];
        while (queue.length > 0) {
          const current = queue.shift();
          if (current) {
            const x = current.x;
            const y = current.y;
            if (!visited[x][y]) {
              visited[x][y] = true;
              island.push(current);
              for (const direction of pawn_directions) {
                const move_x = x + direction.x;
                const move_y = y + direction.y;
                if (isInGrid(move_x, move_y) && this._grid[move_x][move_y]) {
                  queue.push({ x: move_x, y: move_y });
                }
              }
            }
          }
        }
        islands.push(island);
      }
    }
    let isInterconnected = false;
    for (const island of islands) {
      let connected_to_center = false;
      for (const piece of island) {
        for (const center of center_squares) {
          if (piece.x === center.x && piece.y === center.y) {
            connected_to_center = true;
            break;
          }
        }
        if (connected_to_center) {
          break;
        }
      }
      if (connected_to_center) {
        isInterconnected = true;
        break;
      }
    }
    return isInterconnected;
  }

  public calculateGameState() {
    const white_pieces = [];
    const black_pieces = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const piece = this._grid[i][j];
        if (piece) {
          if (piece === 'P' || piece === 'K') {
            white_pieces.push({ x: i, y: j });
          }
          else if (piece === 'p' || piece === 'k') {
            black_pieces.push({ x: i, y: j });
          }
        }
      }
    }
    if (white_pieces.length === 0) {
      this.isGameOver = true;
      this.winnerSide = "black";
    }
    else if (black_pieces.length === 0) {
      this.isGameOver = true;
      this.winnerSide = "white";
    }
    else {
      const white_connected = this.isConnected(white_pieces);
      const black_connected = this.isConnected(black_pieces);
      if (white_connected && black_connected) {
        this.isGameOver = true;
        this.winnerSide = "draw";
      }
      else if (white_connected) {
        this.isGameOver = true;
        this.winnerSide = "white";
      }
      else if (black_connected) {
        this.isGameOver = true;
        this.winnerSide = "black";
      }
    }
  }

  public movePiece(move: Move) {
    this._grid[move.to.x][move.to.y] = this._grid[move.from.x][move.from.y];
    this._grid[move.from.x][move.from.y] = '';
    if (move.capture) {
      this._grid[move.capture.x][move.capture.y] = '';
    }
    this.moveHistory.push(move);
    this.calculateGameState();
    if (this.isGameOver) {
      // TODO: I do not know if there is anything to do here
    }
    else {
      this.isWhitesTurn = !this.isWhitesTurn;
      this.calculateLegalMoves();
    }
  }
}
