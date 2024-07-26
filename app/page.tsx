import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen overflow-x-hidden px-4 lg:px-0">
      <h1 className="text-center font-semibold text-xl lg:text-3xl mt-12 text-zinc-200">
        This website is currently hosting projects of ITU Artificial Intelligence Club
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-12 lg:py-0">

        <div className="max-w-[24rem]">
          <Link
            href="/editor/summit"
          >
            <img
              src="/editor_summit.png"
              alt="Editor Summit"
              className="border-4 mb-4 border-zinc-800 hover:border-zinc-900 duration-400 transition-colors"
            />
          </Link>
          <p className="text-center text-base font-normal text-zinc-300">
            Image Editor made for AI Summit&apos;24
          </p>
        </div>

        <div className="max-w-[24rem]">
          <Link
            href="/editor/starwars"
          >
            <img
              src="/editor_starwars.png"
              alt="Editor Star Wars"
              className="border-4 mb-4 border-zinc-800 hover:border-zinc-900 duration-400 transition-colors"
            />
          </Link>
          <p className="text-center text-base font-normal text-zinc-300">
            Image Editor made for Star Wars Movie Night
          </p>
        </div>

        <div className="max-w-[24rem]">
          <Link
            href="/turing"
          >
            <img
              src="/turing_test.png"
              alt="Image Turing Test"
              className="border-4 mb-4 border-zinc-800 hover:border-zinc-900 duration-400 transition-colors"
            />
          </Link>
          <p className="text-center text-base font-normal text-zinc-300">
            Simple Image Turing Test
          </p>
        </div>

        <div className="max-w-[24rem]">
          <Link
            href="/cez"
          >
            <img
              src="/cez.png"
              alt="Image Turing Test"
              className="border-4 mb-4 border-zinc-800 hover:border-zinc-900 duration-400 transition-colors"
            />
          </Link>
          <p className="text-center text-base font-normal text-zinc-300">
            Chess Variation &apos;Cez&apos;, currently in development
          </p>
        </div>

      </div>
      <footer className=" pb-6">
        <p className="text-center text-zinc-500 text-xs lg:text-base">
          © 2024 ITU Artificial Intelligence Club. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
