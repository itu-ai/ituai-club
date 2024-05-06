import { useState, useEffect } from 'react';
import { allPrompts, PromptData } from '../prompts';

interface AdminPromptSelectionProps {
  confirmSelectionCallback: (prompt: PromptData) => Promise<void>;
  goBackCallback: () => void;
}

const AdminPromptSelection: React.FC<AdminPromptSelectionProps> = ({confirmSelectionCallback, goBackCallback}) => {
  const [promptText, setPromptText] = useState<string>("");
  const [cfgScale, setCfgScale] = useState<number>(7);
  const [strength, setStrength] = useState<number>(0.5);

  useEffect(() => {
    const storedPrompt = localStorage.getItem("prompt") || "";
    setPromptText(storedPrompt);
    document.getElementById("prompt-text")?.setAttribute("value", storedPrompt);
    const storedCfgScale = localStorage.getItem("cfgScale") || "7";
    setCfgScale(parseInt(storedCfgScale));
    const storedStrength = localStorage.getItem("strength") || "0.5";
    setStrength(parseFloat(storedStrength));
  }, []);

  const handlePromptTextChanged = (element: React.ChangeEvent<HTMLInputElement>) => {
    setPromptText(element.target.value);
  }

  const confirmSelection = async () => {
    localStorage.setItem("prompt", promptText);
    localStorage.setItem("cfgScale", cfgScale.toString());
    localStorage.setItem("strength", strength.toString());
    const selectedPromptData: PromptData = {
      title: "Testing Prompt",
      prompt: promptText,
      cfg_scale: cfgScale,
      strength: strength,
      style_preset: "cinematic",
    };
    confirmSelectionCallback(selectedPromptData);
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-center mb-16 mx-12 text-2xl lg:text-4xl font-starjedi text-yellow-400">
        Choose Your Side
      </h2>
      {/* This part is not included in the original code. */}
      <div className="flex mb-8 gap-4">
        <div className="flex">
          <p className="font-semibold">
            Prompt Text:
          </p>
          <input className="w-full outline-none"
            id="prompt-text"
            onChange={handlePromptTextChanged}>
          </input>
        </div>
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
                    value={cfgScale}/>
            <p id="slider-output-cfg" className="ml-2 text-xs md:text-sm">
              {cfgScale}
            </p>
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
                    value={strength}/>
            <p id="slider-output-strength" className="ml-2 text-xs md:text-sm">
              {strength}
            </p>
          </div>
        </div>
      </div>
      {/* End of the part that is not included in the original code. */}

      <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-4 lg:gap-8">
        <button className="sw-button px-6 py-2" 
          onClick={goBackCallback}>
          Go Back
        </button>
        <button className="sw-button px-6 py-2" 
          onClick={confirmSelection}>
          Enter
        </button>
      </div>
    </div>
  );
}

export default AdminPromptSelection;
