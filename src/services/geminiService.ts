import { LyricsResponse } from "../types";

const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.com/api/generate-lyrics'
  : 'http://localhost:3001/api/generate-lyrics';

export async function generateLyrics(prompt: string): Promise<LyricsResponse> {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        const jsonText = data.text?.trim();
        
        if (!jsonText) {
            throw new Error("The AI returned an empty response. Please try again.");
        }
        
        let parsedResponse: LyricsResponse;
        try {
            parsedResponse = JSON.parse(jsonText);
        } catch (parseError) {
             console.error("Failed to parse JSON response:", jsonText);
             throw new Error("The AI returned an invalid response format. Please try again.");
        }
        
        return parsedResponse;
    } catch (error) {
        console.error("Error generating lyrics:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to generate lyrics: ${error.message}`);
        }
        throw new Error("An unknown error occurred while generating lyrics.");
    }
}
