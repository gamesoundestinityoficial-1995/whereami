import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error('Falta DATABASE_URL');
    }

    const sql = neon(process.env.DATABASE_URL);
    const rows = await sql`SELECT NOW() as hora`;

    return res.status(200).json(rows);
  } catch (error) {
    console.error('ERROR /api/users:', error);
    return res.status(500).json({
      error: 'Error conectando con la base de datos',
      detalle: error.message
    });
  }
}