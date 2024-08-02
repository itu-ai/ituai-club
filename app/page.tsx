import Link from "next/link";
import { projects } from "./projects";
import { Card } from "@/components/card";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen overflow-x-hidden px-4 lg:px-0">
      <h1 className="text-center font-semibold text-xl lg:text-3xl mt-12 text-zinc-200 mb-6 lg:mb-24">
        This website is currently hosting projects of ITU Artificial Intelligence Club
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-12 lg:py-0">
        {projects.map((project) => (
          <Card key={project.title} className="max-w-[26rem] py-4 px-6">
            <h2 className="text-center text-lg font-medium text-zinc-200 mb-4">
              {project.title}
            </h2>
            <Link
              href={project.href}
            >
              <img
                src={project.image_src}
                alt={project.image_alt}
                className="border-0 mb-6 border-zinc-800 hover:border-zinc-900 duration-400 opacity-100 hover:opacity-80 duration-400 transition-all"
              />
            </Link>
            <p className="text-center text-base font-normal text-zinc-300 mb-4">
              {project.description}
            </p>
            <ul className="flex justify-center gap-2 lg:gap-4 mb-4">
              {project.developers?.map((developer) => (
                <li key={developer.name}>
                  <Link
                    href={developer.github}
                    className="px-4 py-1 border rounded-xl border-zinc-600 text-sm font-medium text-zinc-500 hover:text-zinc-400 duration-400 transition-colors"
                  >
                    {developer.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={project.href}
              >
              <p className="w-full rounded-xl bg-zinc-700 py-1 text-zinc-200 font-medium text-center hover:bg-zinc-800 duration-400 transition-colors">  
                Try Out
              </p>
            </Link>
          </Card>
        ))}
      </div>
      <Footer className="mt-6 lg:mt-24"/>
    </div>
  );
}
