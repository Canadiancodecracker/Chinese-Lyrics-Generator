import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { LyricsResponse } from "../types";

const apiKey = "AIzaSyBXfLLOV0X9jkgAbTnBUJ7Ryx_b35PKzpM";
const client = new GoogleGenerativeAI(apiKey);

const systemInstruction = "You are a world-class Chinese lyricist and music theorist AI. Your task is to take a user's idea and transform it into a complete song. 1. Analyze the User's Prompt: Carefully read the user's input to understand the core theme, story, and emotion. 2. Determine Musical Properties: Based on your analysis, intelligently decide on the most fitting: Genre (e.g., C-Pop, Folk Ballad, Rock, R&B, Hip-Hop). Mood (e.g., Melancholic, Hopeful, Energetic, Romantic). Rhythm (e.g., Flowing 4/4, Upbeat 120 BPM, Slow Waltz). Structure (e.g., Verse-Chorus-Verse-Chorus-Bridge-Chorus). 3. Generate Lyrics: Write a full set of song lyrics in Simplified Chinese. The lyrics must be poetic, evocative, and fit the determined musical properties. Ensure lyrics are formatted with newlines between stanzas. 4. Suggest a Title: Create a fitting title for the song in Simplified Chinese. 5. Format Output: Return your complete work as a single JSON object that strictly adheres to the provided schema.";

export async function generateLyrics(prompt: string): Promise<LyricsResponse> {
    try {
        const model = client.getGenerativeModel({ 
            model: 'gemini-2.0-flash',
            systemInstruction: systemInstruction,
        });

        const response = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: SchemaType.OBJECT,
                    properties: {
                        analysis: {
                            type: SchemaType.OBJECT,
                            properties: {
                                genre: { type: SchemaType.STRING },
                                mood: { type: SchemaType.STRING },
                                rhythm: { type: SchemaType.STRING },
                                structure: { type: SchemaType.STRING },
                            },
                            required: ["genre", "mood", "rhythm", "structure"],
                        },
                        title: { type: SchemaType.STRING },
                        lyrics: { type: SchemaType.STRING },
                    },
                    required: ["analysis", "title", "lyrics"],
                },
            },
        });

        const jsonText = response.response.text()?.trim();
        if (!jsonText) {
            throw new Error("Empty response");
        }
        
        const parsedResponse: LyricsResponse = JSON.parse(jsonText);
        return parsedResponse;
    } catch (error) {
        console.error("Error:", error);
        if (error instanceof Error) {
            throw new Error(`Failed: ${error.message}`);
        }
        throw new Error("Unknown error");
    }
}
