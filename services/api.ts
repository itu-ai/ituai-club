import { PromptData } from "@/components/star-wars-editor/prompts";

export class ApiService {
    static BASE_URL: string = process.env.NEXT_PUBLIC_API_URL as string;

    static async fetchData(endpoint: string, method: string, body?: any, headers?: HeadersInit) {
        try {
            const url = `${ApiService.BASE_URL}/${endpoint}/`;
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
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const response = await ApiService.fetchData('', 'GET', null, headers);
        return response.json();
    }


    static async testAiConnection() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const response = await ApiService.fetchData('editor/test', 'GET', null, headers);
        return response.json();
    }


    static async sendImageRequest(imageFile: File, promptData: PromptData) {
        const headers = new Headers();
        const body = new FormData();
        body.append('image', imageFile);
        body.append('prompt', promptData.prompt);
        body.append('strength', promptData.strength.toString());
        body.append('style_preset', promptData.style_preset || '');
        body.append('cfg_scale', promptData.cfg_scale.toString());
        const response = await ApiService.fetchData('editor/edit', 'POST', body, headers);
        return response.json();
    }


    static async getImageRequest(imageId: string, imageType: "raw" | "edited", isFramed: boolean) {
        const headers = new Headers();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Content-Type', 'application/json');
        const rawImageResponse = await ApiService.fetchData(`storage/get/${imageId}/${imageType}/${isFramed}`, 'GET', null, headers);
        return rawImageResponse.text();
    }

}
