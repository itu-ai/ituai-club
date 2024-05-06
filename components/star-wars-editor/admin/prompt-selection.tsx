import { useState, useEffect } from 'react';
import { allPrompts, PromptData } from '../prompts';

interface PromptSelectionProps {
  confirmSelectionCallback: (prompt: PromptData) => Promise<void>;
  goBackCallback: () => void;
}

const PromptSelection: React.FC<PromptSelectionProps> = ({confirmSelectionCallback, goBackCallback}) => {
  const [selectedPrompt, setSelectedPrompt] = useState<number | undefined>(undefined);
  const [cfgScale, setCfgScale] = useState<number>(7);
  const [strength, setStrength] = useState<number>(0.5);

  const handleCFGScaleChanged = (element: React.ChangeEvent<HTMLInputElement>) => {
    setCfgScale(element.target.value as unknown as number);
    const sliderOutput = document.getElementById("slider-output-cfg");
    if (sliderOutput) {
      sliderOutput.textContent = element.target.value;
    }
  }

  const handleStrengthChanged = (element: React.ChangeEvent<HTMLInputElement>) => {
    setStrength(element.target.value as unknown as number);
    const sliderOutput = document.getElementById("slider-output-strength");
    if (sliderOutput) {
      sliderOutput.textContent = element.target.value;
    }
  }

  const selectPrompt = async (index: number) => {
    setSelectedPrompt(index);
  }

  const confirmSelection = async () => {
    if (selectedPrompt !== undefined) {
      const selectedPromptData = allPrompts[selectedPrompt];
      selectedPromptData.cfg_scale = cfgScale;
      selectedPromptData.strength = strength;
      confirmSelectionCallback(selectedPromptData);
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
      <div className="mb-8">
        <div className="flex">
          <p className="font-semibold mr-2">
            CFG Scale:
          </p>
          <div className="flex">
            <p className="mr-2 text-xs md:text-sm">
              0
            </p>
              <input className="w-full outline-none"
                    type="range" 
                    min={0} 
                    max={35} 
                    step={1} 
                    defaultValue={7} 
                    onChange={handleCFGScaleChanged}/>
            <p id="slider-output-cfg" className="ml-2 text-xs md:text-sm "></p>
          </div>
        </div>
        <div className="flex gap-4">
          <p className="font-semibold mr-2">
            Strength:
          </p>
          <div className="flex">
            <p className="mr-2 text-xs md:text-sm">
              0
            </p>
              <input className="w-full outline-none"
                    type="range" 
                    min={0} 
                    max={1} 
                    step={0.01} 
                    defaultValue={0.5} 
                    onChange={handleStrengthChanged}/>
            <p id="slider-output-strength" className="ml-2 text-xs md:text-sm "></p>
          </div>
        </div>
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
