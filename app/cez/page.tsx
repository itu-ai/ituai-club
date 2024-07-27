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
      <div className="flex flex-col lg:flex-row gap-4 mt-6 lg:mt-8">
        <Link
          href="/cez/game/offline"
        >
          <p className="text-xl font-bold text-center text-zinc-300 px-4 py-2 border-2 border-zinc-700 rounded-xl hover:border-zinc-800 hover:text-zinc-400">
            Try Offline Beta
          </p>
        </Link>
        <button disabled={true} className="group">
          <p className="text-xl font-bold text-center text-zinc-300 px-4 py-2 border-2 border-zinc-700 rounded-xl hover:border-zinc-800 hover:text-zinc-400 group-disabled:border-zinc-900 group-disabled:text-zinc-500">
            Against AI (Soon)
          </p>
        </button>
        <button disabled={true}  className="group">
          <p className="text-xl font-bold text-center text-zinc-300 px-4 py-2 border-2 border-zinc-700 rounded-xl hover:border-zinc-800 hover:text-zinc-400 group-disabled:border-zinc-900 group-disabled:text-zinc-500">
            Online (Soon)
          </p>
        </button>
      </div>
      <h2 className="text-2xl font-bold text-center text-zinc-200 mt-6 lg:mt-8">
        Rules
      </h2>

    </div>
  );
}
