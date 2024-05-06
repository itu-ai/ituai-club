import AdminAIPrompter from "@/components/star-wars-editor/admin/ai-prompter";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="general-bg bg-gradient-to-br from-black via-gray-800 to-black"/>
      <div className="fixed top-8 right-5 w-10 h-10 lg:w-16 lg:h-16 z-1 bg-black p-1">
        <img src="/logo/ai_logo.svg" alt="Logo" />
      </div>
      <h1 className="absolute top-8 text-center mx-12 text-3xl lg:text-6xl font-starout text-yellow-400">
        Admin Testing Page
      </h1>
      <AdminAIPrompter/>
    </div>
  );

}
