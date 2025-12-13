import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
    try {
        const result = await sql`
      CREATE TABLE IF NOT EXISTS lyrics_history (
        id SERIAL PRIMARY KEY,
        prompt TEXT NOT NULL,
        title TEXT,
        lyrics TEXT,
        analysis JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
        return response.status(200).json({ result });
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
}
