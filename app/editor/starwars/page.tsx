import AIPrompter from "@/components/star-wars-editor/ai-prompter";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between w-screen min-h-screen">
      <div className="general-bg bg-gradient-to-br from-black via-gray-800 to-black"/>
      <div className="fixed top-2 right-2 lg:top-5 lg:right-5 z-1 w-10 h-10 lg:w-16 lg:h-16 p-1 ">
        <img src="/logo/ai_logo.svg" alt="Logo" />
      </div>
      <h1 className="text-center mx-12 mt-8 lg:mt-12 text-3xl lg:text-6xl font-starout text-yellow-400">
        Enter the Star Wars universe
      </h1>
      <AIPrompter/>

      <div className="flex flex-row gap-6 items-center justify-center">
        <div className="w-12 h-12 lg:w-24 lg:h-24 items-center justify-center">
          <img src="/logo/agenzy_logo.svg" alt="Logo" />
        </div>
        <div className="w-12 h-12 lg:w-24 lg:h-24 items-center justify-center">
          <img src="/logo/dreamers_logo.webp" alt="Logo" />
        </div>
      </div>
    </div>
  );

}
