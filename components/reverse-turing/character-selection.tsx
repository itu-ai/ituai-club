'use client';

import { useState } from "react";

import { characters } from "@/app/turing/reverse/characters";
import { Character } from "@/interfaces/turing/character";

interface Props {
  onCharacterSelect: (character: Character) => void;
}

const CharacterSelection: React.FC<Props> = ({ onCharacterSelect }) => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(characters[0]);
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"/>
      <div className="flex items-center justify-center z-10">
        <div className="flex flex-col items-center mx-96 px-12 py-8 rounded-xl bg-zinc-900">
          <h2 className="text-3xl font-bold text-center mb-6 text-zinc-100">
            Select your character
          </h2>
          <div className="grid grid-cols-6 gap-x-4 gap-y-6 mb-6">
            {characters.map((character: Character) => (
              <button key={character.name} className="flex flex-col p-2 items-center justify-center outline-none focus:outline-none transition-all duration-400"
                style={{ opacity: selectedCharacter === character ? 1 : 0.5 }}
                onClick={() => setSelectedCharacter(character)}
              >
                <img src={character.image} alt={character.name} className="w-20 h-20 object-contain rounded-full mb-2"/>
                <p className="text-sm text-center">{character.name}</p>
              </button>
            ))}
          </div>
          <button className="px-12 py-2 border-2 border-zinc-400 rounded-xl transition-all duration-400 text-zinc-400 hover:border-zinc-600 hover:text-zinc-600 disabled:border-zinc-800 disabled:text-zinc-400 disabled:bg-zinc-800"
            disabled={selectedCharacter === null}
            onClick={() => onCharacterSelect(selectedCharacter)}
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
}

export default CharacterSelection;
