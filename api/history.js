import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
    try {
        const { rows } = await sql`SELECT * FROM lyrics_history ORDER BY created_at DESC LIMIT 50;`;
        return response.status(200).json({ history: rows });
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
}
