import { useState, useEffect } from 'react';
import { allPrompts } from './prompts';
import { PromptData } from '@/interfaces/prompt_data';

interface PromptSelectionProps {
  confirmSelectionCallback: (prompt: PromptData) => Promise<void>;
  goBackCallback: () => void;
}

const PromptSelection: React.FC<PromptSelectionProps> = ({confirmSelectionCallback, goBackCallback}) => {
  const [selectedPrompt, setSelectedPrompt] = useState<number | undefined>(undefined);

  const selectPrompt = async (index: number) => {
    setSelectedPrompt(index);
  }

  const confirmSelection = async () => {
    if (selectedPrompt !== undefined) {
      confirmSelectionCallback(allPrompts[selectedPrompt]);
    }
  }

  /*
  Onayladığınız fotoğraflarınız sonradan sosyal medyada kullanılabilir. Uygulamayı kullanarak buna onay verdiğiniz unutmayınız!
  */
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-center mb-16 mx-12 text-2xl lg:text-4xl font-starjedi text-yellow-400">
        Choose Your Side
      </h2>
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-8 items-center justify-center mb-12">
        <button className="sw-jedi-button w-64 h-14 lg:w-72 lg:h-28 text-2xl lg:text-3xl" 
          style={{
            backgroundColor: selectedPrompt === 0 ? '#60A5FA' : 'black',
            color: selectedPrompt === 0 ? '#000000' : '#60A5FA'
          }}
          onClick={() => selectPrompt(0)}> 
          {allPrompts[0].title} 
        </button>
        <button className="sw-sith-button w-64 h-14 lg:w-72 lg:h-28 text-2xl lg:text-3xl" 
          style={{
            backgroundColor: selectedPrompt === 1 ? '#F87171' : 'black',
            color: selectedPrompt === 1 ? '#000000' : '#F87171'
          }}
          onClick={() => selectPrompt(1)}> 
          {allPrompts[1].title} 
        </button>
      </div>
      <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-4 lg:gap-8">
        <button className="sw-button px-6 py-2" 
          onClick={goBackCallback}>
          Go Back
        </button>
        <button className="sw-button px-6 py-2" 
          onClick={confirmSelection}
          disabled={selectedPrompt === undefined}>
          Enter
        </button>
      </div>
    </div>
  );
}

export default PromptSelection;
