import AIPrompter from "@/components/star-wars-editor/ai-prompter";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="general-bg bg-gradient-to-br from-black via-gray-800 to-black"/>
      <h1 className="absolute top-8 text-center mx-12 text-3xl lg:text-6xl font-starout text-yellow-400">
        Enter the Star Wars universe
      </h1>
      <AIPrompter/>
      <div className="fixed top-5 right-5 z-1 w-10 h-10 lg:w-16 lg:h-16 p-1 ">
        <img src="/logo/ai_logo.svg" alt="Logo" />
      </div>
      <div className="fixed bottom-0 left-50 z-1">
        <div className="flex flex-row gap-6 items-center justify-center">
          <div className="w-10 h-10 lg:w-24 lg:h-24 items-center justify-center">
            <img src="/logo/agenzy_logo.svg" alt="Logo" />
          </div>
          <div className="w-10 h-10 lg:w-24 lg:h-24 items-center justify-center">
            <img src="/logo/dreamers_logo.webp" alt="Logo" />
          </div>
        </div>
      </div>
    </div>
  );

}
