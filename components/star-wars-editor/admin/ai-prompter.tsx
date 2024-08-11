"use client";

import { useState, useRef, useEffect } from 'react';
import Capture from '../capture';
import AdminPromptSelection from './prompt-selection';
import ImageToOutput from '../image-to-output';
import { PromptData } from '@/interfaces/editor/prompt_data';

enum AIPrompterState {
  CAPTURE,
  SELECT_PROMPT,
  OUTPUT
}

const AdminAIPrompter: React.FC = () => {
  const [image, setImage] = useState<string | undefined>(undefined);
  const [selectedPrompt, setSelectedPrompt] = useState<PromptData | undefined>(undefined);
  const [state, setState] = useState<AIPrompterState>(AIPrompterState.CAPTURE);

  const confirmImageCallback = async (image64: string): Promise<void> => {
    setImage(image64);
    setState(AIPrompterState.SELECT_PROMPT);
  }

  const confirmPromptCallback = async (prompt: PromptData): Promise<void> => {
    setSelectedPrompt(prompt);
    setState(AIPrompterState.OUTPUT);
  }

  const goBackToCapture = async (): Promise<void> => {
    setImage(undefined);
    setSelectedPrompt(undefined);
    setState(AIPrompterState.CAPTURE);
  }

  const restartCallback = async (): Promise<void> => {
    setImage(undefined);
    setSelectedPrompt(undefined);
    setState(AIPrompterState.CAPTURE);
  }

  const goBackToSelection = async (): Promise<void> => {
    setSelectedPrompt(undefined);
    setState(AIPrompterState.SELECT_PROMPT);
  }

  return (
    <div className="">
      <div className="">
        {state === AIPrompterState.CAPTURE && 
          <Capture
            confirmCaptureCallback={confirmImageCallback}
          />
        }
        {state === AIPrompterState.SELECT_PROMPT && 
          <AdminPromptSelection
            confirmSelectionCallback={confirmPromptCallback}
            goBackCallback={goBackToCapture}
          />
        }
        {state === AIPrompterState.OUTPUT && image && selectedPrompt &&
          <ImageToOutput
            rawImage={image}
            promptData={selectedPrompt}
            restartCallback={restartCallback}
            goBackCallback={goBackToSelection}
          />
        }
      </div>
    </div>
  );
}

export default AdminAIPrompter;
