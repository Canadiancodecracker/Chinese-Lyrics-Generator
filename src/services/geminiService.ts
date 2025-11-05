import { LyricsResponse } from "../types";

export async function generateLyrics(prompt: string): Promise<LyricsResponse> {
    try {
        const response = await fetch('/api/generate-lyrics', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) throw new Error(`API error: ${response.status}`);
        return await response.json();
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed: ${error.message}`);
        }
        throw new Error("Unknown error");
    }
}
