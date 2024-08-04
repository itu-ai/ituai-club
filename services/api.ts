import { ImageType } from "@/interfaces/editor/image_type";
import { PromptData } from "@/interfaces/editor/prompt_data";
import { Message } from "@/interfaces/turing/message";
import { Agent } from "@/interfaces/turing/agent";

const MAIN_API_URL = process.env.NEXT_PUBLIC_API_URL as string;
const CEZ_API_URL = process.env.NEXT_PUBLIC_CEZ_API_URL as string;

export class ApiService {
  static BASE_URL: string = process.env.NEXT_PUBLIC_API_URL as string;

  static async fetchData(url: string, method: string, body?: any, headers?: HeadersInit) {
    try {
      const fetchOptions: RequestInit = { method };
      if (headers) {
        fetchOptions.headers = headers;
      }
      if (body) {
        fetchOptions.body = body;
      }

      const response = await fetch(url, fetchOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response;
    } 
    catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  static async testConnection() {
    const url = `${MAIN_API_URL}/`;
    const headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json');
    const response = await ApiService.fetchData(url, 'GET', null, headers);
    return response.json();
  }

  // Image Editor Requests

  static async testAiConnection() {
    const url = `${MAIN_API_URL}/editor/test`;
    const headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json');
    const response = await ApiService.fetchData(url, 'GET', null, headers);
    return response.json();
  }


  static async sendImageRequest(imageFile: File, promptData: PromptData) {
    const url = `${MAIN_API_URL}/editor/edit`;
    const headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    const body = new FormData();
    body.append('image', imageFile);
    body.append('prompt', promptData.prompt);
    body.append('strength', promptData.strength.toString());
    body.append('style_preset', promptData.style_preset || '');
    body.append('cfg_scale', promptData.cfg_scale.toString());
    const response = await ApiService.fetchData(url, 'POST', body, headers);
    return response.json();
  }


  static async getImageRequest(imageId: string, imageType: ImageType, isEdited: boolean, isFramed: boolean) {
    const url = `${MAIN_API_URL}/storage/get/${imageId}/${imageType}/${isEdited}/${isFramed}`;
    const headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json');
    const rawImageResponse = await ApiService.fetchData(url, 'GET', null, headers);
    return rawImageResponse.text();
  }

  // Reverse Turing Test Requests

  static async sendGPTRequest(messages: Message[], agent: Agent, other_agents: Agent[]) {
    const url = `${MAIN_API_URL}/turing/gpt/message`;
    const headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json');
    const body = JSON.stringify({ messages, agent, other_agents });
    const response = await ApiService.fetchData(url, 'POST', body, headers);
    return response.json();
  }

  static async getGPTGuess(messages: Message[], agent: Agent, other_agents: Agent[]) {
    const url = `${MAIN_API_URL}/turing/gpt/guess`;
    const headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json');
    const body = JSON.stringify({ messages, agent, other_agents });
    const response = await ApiService.fetchData(url, 'POST', body, headers);
    return response.json();
  }

  static async sendGeminiRequest(messages: Message[], agent: Agent, other_agents: Agent[]) {
    const url = `${MAIN_API_URL}/turing/gemini/message`;
    const headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json');
    const body = JSON.stringify({ messages, agent, other_agents });
    const response = await ApiService.fetchData(url, 'POST', body, headers);
    return response.json();
  }

  static async getGeminiGuess(messages: Message[], agent: Agent, other_agents: Agent[]) {
    const url = `${MAIN_API_URL}/turing/gemini/guess`;
    const headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json');
    const body = JSON.stringify({ messages, agent, other_agents });
    const response = await ApiService.fetchData(url, 'POST', body, headers);
    return response.json();
  }

    // Cez Requests

    static async getCezAIMove(fen: string) {
      const url = `${CEZ_API_URL}/api/cez/ai/calculate`;
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      const body = JSON.stringify({ fen: fen });
      const response = await ApiService.fetchData(url, 'POST', body, headers);
      return response.json();
    }

}
