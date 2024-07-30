import { useState } from 'react';
import { allPrompts } from './prompts';
import { PromptData } from '@/interfaces/editor/prompt_data';

interface PromptSelectionProps {
  confirmSelectionCallback: (prompt: PromptData) => Promise<void>;
  goBackCallback: () => void;
}

const PromptSelection: React.FC<PromptSelectionProps> = ({confirmSelectionCallback, goBackCallback}) => {
  const [selectedPrompt, setSelectedPrompt] = useState<number | undefined>(0);
  const [beforeImage, setBeforeImage] = useState<string | undefined>(allPrompts[0].beforeImage);
  const [afterImage, setAfterImage] = useState<string | undefined>(allPrompts[0].afterImage);

  const selectPrompt = async (index: number) => {
    setSelectedPrompt(index);
    setBeforeImage(allPrompts[index].beforeImage);
    setAfterImage(allPrompts[index].afterImage);
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
    <div className="flex flex-col items-center justify-center gap-6 lg:gap-12">
      <div className="grid grid-cols-4 lg:grid-cols-6 gap-2 lg:gap-6">
        {allPrompts.map((prompt, index) => (
          <button key={index} className="text-sm lg:text-2xl lg:px-2 lg:py-6 outline-none font-semibold lg:font-bold bg-black border-2 border-red-500 text-red-500 rounded-sm hover:bg-red-500 hover:text-black transition-colors" 
            style={{
              backgroundColor: selectedPrompt === index ? '#ef4444' : '#000000',
              color: selectedPrompt === index ? '#000000' : '#ef4444'
            }}
            onClick={() => selectPrompt(index)}> 
            {prompt.title} 
          </button>
        ))}
      </div>
      <div className="flex flex-row items-center justify-center gap-x-4 lg:gap-x-12">
        <img 
          src={beforeImage} 
          alt="Before" 
          className="h-24 lg:h-72"
        />
        <img 
          src="/summit/arrow.png" 
          alt="Arrow" 
          className="h-12 lg:h-24 rotate-[40deg] invert"
        />
        <img 
          src={afterImage} 
          alt="After" 
          className="h-24 lg:h-72"
        />
      </div>
      <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-4 lg:gap-8">
        <button className="summit-button px-6 py-2" 
          onClick={goBackCallback}>
          Go Back
        </button>
        <button className="summit-button px-6 py-2" 
          onClick={confirmSelection}
          disabled={selectedPrompt === undefined}>
          Enter
        </button>
      </div>
    </div>
  );
}

export default PromptSelection;
