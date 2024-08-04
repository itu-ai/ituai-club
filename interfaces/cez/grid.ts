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

---

The game is played on a 8 by 8 square board just like a chess board. 

# Pieces

There are two types of pieces in Cez.

Pawns move one square either horizontally or vertically (not diagonally). However; if the square that a pawn is going to move is occupied by an opponent pawn, the pawn can not move to that square. Instead, it can take it by jumping over it and moving one more square (2 squares in total). The square that the pawn is going to land must not be occupied by either a friend or opponent piece. These rules make the game look very like checkers, but unlike in checkers the pieces can not perform multiple captures in one turn.

Knigths move two squares either horizontally or vertically just like pawns, and jumps over the piece right in front of them like they do in chess. To capture a piece, they jump over the opponent piece and move a total of 3 squares.


# Progressing through the game

In the game; if any piece can be taken, a capturing move must be performed. If there are multiple captures available, any capturing move can be selected.

The "centered islands" rule states that a player can win the game by creating "island"s which are made of pieces that are direct horizontal or vertical neighbors to other pieces in that island. To win, the player must create these  "island"s on the center pieces so that every "island" has at least a piece in the center squares (the d4. d5, e4 and the e5 squares).
Another way to win the game is to capture all of the opponent pieces.

If both players meet the conditions of the "interconnected islands" rule at the same time, the game ends in a draw.
If any position is repeated 3 times in the game, the game ends in a draw.

*/

const one_move_dirs = [
  { x: 0, y: 1 },
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: -1, y: 0 }
];

const two_move_dirs = [
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

    this._grid[0][0] = 'n';
    this._grid[0][1] = 'p';
    this._grid[1][0] = 'p';
    this._grid[1][1] = 'p';

    this._grid[7][7] = 'n';
    this._grid[7][6] = 'p';
    this._grid[6][7] = 'p';
    this._grid[6][6] = 'p';

    this._grid[0][7] = 'N';
    this._grid[0][6] = 'P';
    this._grid[1][7] = 'P';
    this._grid[1][6] = 'P';

    this._grid[7][0] = 'N';
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
            for (const direction of one_move_dirs) {
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
          else if (piece === 'N' && this.isWhitesTurn) {
            for (const direction of two_move_dirs) {
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
            for (const direction of one_move_dirs) {
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
          else if (piece === 'n' && !this.isWhitesTurn) {
            for (const direction of two_move_dirs) {
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

  public findIslands(pieces: Tile[]): Tile[][] {
    const visited = new Set<string>();
    const islands: Tile[][] = [];
  
    function dfs(tile: Tile, island: Tile[]) {
      const key = `${tile.x},${tile.y}`;
      if (visited.has(key)) {
        return;
      }
      visited.add(key);
      island.push(tile);
  
      for (const direction of one_move_dirs) {
        const neighbor = { x: tile.x + direction.x, y: tile.y + direction.y };
        if (pieces.some(p => p.x === neighbor.x && p.y === neighbor.y)) {
          dfs(neighbor, island);
        }
      }
    }
  
    for (const piece of pieces) {
      const key = `${piece.x},${piece.y}`;
      if (!visited.has(key)) {
        const newIsland: Tile[] = [];
        dfs(piece, newIsland);
        islands.push(newIsland);
      }
    }
  
    return islands;
  }

  public isConnected(pieces: Tile[]) {
    // check if all pieces are connected to each other and at least one of them is connected to the center squares
    // there could be more than one interconnected islands but eventually if all the pieces are connected to the center squares, the player wins
    const islands = this.findIslands(pieces);
    for (const island of islands) {
      let connectedToCenter = false;
      for (const tile of island) {
        if (center_squares.some(center => center.x === tile.x && center.y === tile.y)) {
          connectedToCenter = true;
          break;
        }
      }
      if (!connectedToCenter) {
        return false;
      }
    }
    return true;
  }

  public calculateGameState() {
    const white_pieces = [];
    const black_pieces = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const piece = this._grid[i][j];
        if (piece) {
          if (piece === 'P' || piece === 'N') {
            white_pieces.push({ x: i, y: j });
          }
          else if (piece === 'p' || piece === 'n') {
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

  public getFEN() {
    let fen = '';
    for (let y = 0; y < 8; y++) {
      let empty = 0;
      for (let x = 0; x < 8; x++) {
        if (this._grid[x][y] === '') {
          empty++;
        }
        else {
          if (empty > 0) {
            fen += empty.toString();
            empty = 0;
          }
          fen += this._grid[x][y];
        }
      }
      if (empty > 0) {
        fen += empty.toString();
      }
      if (y < 7) {
        fen += '/';
      }
    }
    fen += this.isWhitesTurn ? ' w' : ' b';
    return fen;
  }
}
