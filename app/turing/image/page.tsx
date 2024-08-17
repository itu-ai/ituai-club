"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getRandomImage } from "@/components/turing/turingService";
import LoadingLayer from "@/components/turing/loading-layer";
import TuringResult from "@/components/turing/result";


export default function TuringTestPage() {
  const [image, setImage] = useState<string>("");
  const [isAI, setIsAI] = useState<boolean>(false);
  const [resultText, setResultText] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [highestScore, setHighestScore] = useState<number>(0);


  const getNewImage = async (): Promise<void> => {
    setImage("");
    const newImage = await getRandomImage();
    setImage(newImage.image);
    setIsAI(newImage.isAI);
  }

  const getLocalHighestScore = (): void => {
    const highest = localStorage.getItem("highest_score");
    if (highest) setHighestScore(parseInt(highest));
  }

  const setLocalHighestScore = (score: number): void => {
    localStorage.setItem("highest_score", score.toString());
  }

  useEffect(() => {
    getNewImage();
    getLocalHighestScore();
  }, []);

  const handleSelection = (guessedAI: boolean): void => {
    if (isAI === guessedAI) {
      setResultText("Correct!");
      setScore(score + 1);
      if (score + 1 > highestScore) {
        setLocalHighestScore(score + 1);
        setHighestScore(score + 1);
      }
    }
    else {
      setResultText("Incorrect!");
      setScore(0);
    }
    setTimeout(() => {
      setResultText("");
      getNewImage();
    }, 1000);
  }


  return (
    <>
      <div className="flex flex-col items-center justify-between min-h-screen overflow-x-hidden px-4 lg:px-0">
        {/* Background */}
        <div className="absolute top-0 left-0 -z-10 w-full h-full jigsaw-bg"/>
        <div className="absolute top-2 right-2 lg:top-5 lg:right-5 z-1 w-10 h-10 lg:w-16 lg:h-16 p-1 ">
          <Link href="/">
            <img
              src="/logo/ai_logo.svg"
              alt="Logo"
            />
          </Link>
        </div>
        {/* Header */}
        <header className="flex flex-col items-center justify-center w-full">
          <h1 className="text-center font-semibold text-2xl lg:text-4xl text-zinc-200 mt-6 lg:mt-12 mb-2 lg:mb-4">
            Image Turing Test
          </h1>
          <h2 className="text-center font-semibold text-base lg:text-xl text-zinc-200">
            Created by AI or Human?
          </h2>
        </header>

        {/* Content */}
        <div>
          <div className="flex flex-col items-center justify-center w-full gap-6">
            <div className="flex items-center justify-between w-full">
              <p className="text-center font-semibold text-base lg:text-lg text-zinc-200">
                {"Score: " + score}
              </p>
              <p className="text-center font-semibold text-base lg:text-lg text-zinc-200">
                {"Personal Best: " + highestScore}
              </p>
            </div>
            {image !== ""
              ?
              <img 
                src={image} 
                alt="Turing Test Image" 
                className="w-96 h-96 object-cover rounded-lg shadow-lg prevent-selector"
                onError={() => getNewImage()}  
              />
              :
              <>
                <div className="w-96 h-96 rounded-lg shadow-lg animate-pulse"/>
                <LoadingLayer/>
              </>
            }
            <div className="flex flex-col items-center justify-center w-full mt-4">
              <div className="flex flex-row items-center justify-between w-full mt-4 gap-4">
                <button className="w-36 py-2 text-white bg-zinc-500 rounded-lg shadow-lg" 
                  onClick={() => handleSelection(true)}
                >
                  AI
                </button>
                <button className="w-36 py-2 text-white bg-zinc-500 rounded-lg shadow-lg" 
                  onClick={() => handleSelection(false)}
                >
                  Human
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer>

        </footer>
      </div>
      <TuringResult text={resultText}/>
    </>
  );
}
