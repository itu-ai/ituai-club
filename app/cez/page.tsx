import Link from "next/link";

export default function CezPage() {

  return (
    <div className="flex flex-col items-center justify-center px-4 lg:px-0">
      <h1 className="text-4xl font-bold text-center text-zinc-200 mt-6 lg:mt-8">
        Cez - Chess Variation
      </h1>
      <p className="text-xl font-medium text-center text-zinc-200 mt-6 lg:mt-8">
        Cez is a chess variation, with the same board but different pieces and rules.
      </p>
      <div className="flex flex-col mt-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-center">
          <Link
            href="/cez/offline"
          >
            <p className="text-xl font-bold text-center text-zinc-300 px-4 py-2 border-2 border-zinc-700 rounded-xl hover:border-zinc-800 hover:text-zinc-400">
              Try Offline Beta
            </p>
          </Link>
          <Link
            href="/cez/ai"
          >
            <p className="text-xl font-bold text-center text-zinc-300 px-4 py-2 border-2 border-zinc-700 rounded-xl hover:border-zinc-800 hover:text-zinc-400">
              Against AI
            </p>
          </Link>
          <button disabled={true}  className="group">
            <p className="text-xl font-bold text-center text-zinc-300 px-4 py-2 border-2 border-zinc-700 rounded-xl hover:border-zinc-800 hover:text-zinc-400 group-disabled:border-zinc-900 group-disabled:text-zinc-500">
              Online (Soon)
            </p>
          </button>
        </div>
        <div className="flex flex-col lg:px-72 pb-24">
          <h2 className="text-3xl font-bold text-start text-zinc-200 mt-6 lg:mt-6">
            Rules
          </h2>
          <p className="text-base font-normal text-start text-zinc-200 mt-6 lg:mt-6">
            The game is played on a 8 by 8 square board just like a chess board. 
          </p>
          <h3 className="text-xl font-bold text-start text-zinc-200 mt-6 lg:mt-6">
            Pieces
          </h3>
          <p className="text-base font-normal text-start text-zinc-200 mt-6 lg:mt-6">
            There are two types of pieces in Cez.
          </p>
          <p className="text-base font-normal text-start text-zinc-200 mt-6 lg:mt-6">
            Pawns move one square either horizontally or vertically (not diagonally). However; if the square that a pawn is going to move is occupied by an opponent pawn, the pawn can not move to that square. Instead, it can take it by jumping over it and moving one more square (2 squares in total). The square that the pawn is going to land must not be occupied by either a friend or opponent piece. These rules make the game look very like checkers, but unlike in checkers the pieces can not perform multiple captures in one turn.
          </p>
          <p className="text-base font-normal text-start text-zinc-200 mt-6 lg:mt-6">
            Knigths move two squares either horizontally or vertically just like pawns, and jumps over the piece right in front of them like they do in chess. To capture a piece, they jump over the opponent piece and move a total of 3 squares.
          </p>
          <h3 className="text-xl font-bold text-start text-zinc-200 mt-6 lg:mt-6">
            Progressing through the game
          </h3>
          <p className="text-base font-normal text-start text-zinc-200 mt-6 lg:mt-6">
            In the game; if any piece can be taken, a capturing move must be performed. If there are multiple captures available, any capturing move can be selected.
          </p>
          <p className="text-base font-normal text-start text-zinc-200 mt-6 lg:mt-6">
            The &quot;centered islands&quot; rule states that a player can win the game by creating &quot;island&quot;s which are made of pieces that are direct horizontal or vertical neighbors to other pieces in that island. To win, the player must create these  &quot;island&quot;s on the center pieces so that every &quot;island&quot; has at least a piece in the center squares (the d4. d5, e4 and the e5 squares).
          </p>
          <p className="text-base font-normal text-start text-zinc-200 mt-6 lg:mt-6">
            Another way to win the game is to capture all of the opponent pieces.
          </p>
          <p className="text-base font-normal text-start text-zinc-200 mt-6 lg:mt-6">
            If both players meet the conditions of the &quot;interconnected islands&quot; rule at the same time, the game ends in a draw. If any position is repeated 3 times in the game, the game ends in a draw.
          </p>
        </div>
      </div>

    </div>
  );
}
