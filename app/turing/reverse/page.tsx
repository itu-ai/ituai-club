"use client";

import { useState } from "react";

import CharacterSelection from "@/components/reverse-turing/character-selection";
import TuringChat from "@/components/reverse-turing/turing-chat";
import TuringTestResult from "@/components/reverse-turing/turing-test-result";
import Footer from "@/components/footer";

import { Character } from "@/interfaces/turing/character";
import { AgentGuess } from "@/interfaces/turing/agent-guess";

export default function Home() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [agentGuesses, setAgentGuesses] = useState<AgentGuess[] | null>(null);

  const handleOnCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
  }

  const handleOnTestFinished = (agent_guesses: AgentGuess[]) => {
    setAgentGuesses(agent_guesses);
  }

  const handleRestart = () => {
    setSelectedCharacter(null);
    setAgentGuesses(null);
  }

  return (
    <div className="min-h-screen px-4 lg:px-0">
      {selectedCharacter === null &&
        <CharacterSelection
          onCharacterSelect={handleOnCharacterSelect}
        />
      }
      {selectedCharacter && !agentGuesses &&
        <TuringChat
          human_character={selectedCharacter}
          onTestFinished={handleOnTestFinished}
        />
      }
      {agentGuesses &&
        <TuringTestResult
          agent_guesses={agentGuesses}
          onRestart={handleRestart}
        />
      }
    </div>
  );
}
