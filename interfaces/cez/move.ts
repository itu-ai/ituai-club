import { Tile } from "./tile";

export interface Move {
  from: Tile;
  to: Tile;
  capture: Tile | null;
}
