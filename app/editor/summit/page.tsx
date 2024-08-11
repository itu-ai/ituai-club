import Link from "next/link";
import AIPrompter from "@/components/summit/ai-prompter";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen overflow-x-hidden summit-font">
      <div className="summit-bg opacity-60"/>
      <div className="absolute top-2 right-2 lg:top-5 lg:right-5 z-1 w-10 h-10 lg:w-16 lg:h-16 p-1 ">
        <Link href="/">
          <img
            src="/logo/ai_logo.svg"
            alt="Logo"
          />
        </Link>
      </div>
      <h1 className="text-center mx-12 mt-8 lg:mt-12 text-3xl font-bold lg:text-6xl text-red-600 opacity-80">
        Create a Memory
      </h1>
      <AIPrompter/>

      <div className="flex flex-row gap-6 items-center justify-center">
        <p className="text-center text-base lg:text-lg text-zinc-400 font-semibold mb-6 lg:mb-8">
          ITU Artificial Intelligence Summit 2024
        </p>
      </div>
    </div>
  );

}
