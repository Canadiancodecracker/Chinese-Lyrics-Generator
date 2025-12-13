import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { sql } from '@vercel/postgres';

const client = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;
    const model = client.getGenerativeModel({ model: 'gemini-2.0-flash' });

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
    const parsedData = JSON.parse(jsonText);

    // Save to database
    try {
      await sql`
        INSERT INTO lyrics_history (prompt, title, lyrics, analysis)
        VALUES (${prompt}, ${parsedData.title}, ${parsedData.lyrics}, ${JSON.stringify(parsedData.analysis)})
      `;
    } catch (dbError) {
      console.error('Database Error:', dbError);
      // Decide if we want to fail the request or just log. 
      // Proceeding with response is usually better UX, but user asked to "Save and track".
      // Let's log it prominently.
    }

    res.status(200).json(parsedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
