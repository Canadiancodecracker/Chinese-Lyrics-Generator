import { GoogleGenAI, Type } from "@google/genai";
import { LyricsResponse } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const systemInstruction = `You are a world-class Chinese lyricist and music theorist AI. Your task is to take a user's idea and transform it into a complete song.
1.  **Analyze the User's Prompt**: Carefully read the user's input to understand the core theme, story, and emotion.
2.  **Determine Musical Properties**: Based on your analysis, intelligently decide on the most fitting:
    *   **Genre** (e.g., C-Pop, Folk Ballad, Rock, R&B, Hip-Hop).
    *   **Mood** (e.g., Melancholic, Hopeful, Energetic, Romantic).
    *   **Rhythm** (e.g., Flowing 4/4, Upbeat 120 BPM, Slow Waltz).
    *   **Structure** (e.g., Verse-Chorus-Verse-Chorus-Bridge-Chorus).
3.  **Generate Lyrics**: Write a full set of song lyrics in **Simplified Chinese**. The lyrics must be poetic, evocative, and fit the determined musical properties. Ensure lyrics are formatted with newlines between stanzas.
4.  **Suggest a Title**: Create a fitting title for the song in **Simplified Chinese**.
5.  **Format Output**: Return your complete work as a single JSON object that strictly adheres to the provided schema. Do not include any markdown formatting like \`json\` or backticks in the response.`;

export async function generateLyrics(prompt: string): Promise<LyricsResponse> {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        analysis: {
                            type: Type.OBJECT,
                            properties: {
                                genre: { type: Type.STRING, description: "The determined music genre." },
                                mood: { type: Type.STRING, description: "The overall mood of the song." },
                                rhythm: { type: Type.STRING, description: "The suggested rhythm or tempo." },
                                structure: { type: Type.STRING, description: "The song's lyrical structure." },
                            },
                             required: ["genre", "mood", "rhythm", "structure"],
                        },
                        title: { type: Type.STRING, description: "The generated title in Simplified Chinese." },
                        lyrics: { type: Type.STRING, description: "The full lyrics in Simplified Chinese, with stanzas separated by newlines." },
                    },
                    required: ["analysis", "title", "lyrics"],
                },
            },
        });

        const jsonText = response.text?.trim();
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