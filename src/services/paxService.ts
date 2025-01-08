import pool from '@/config/db';

interface ComboPax {
  id: number;
  combo_id: number;
  pax_range: string;
  price_per_pax: string;
  combo_name: string;
}

async function getPax() {
  try {
    const result = await pool.query<ComboPax>(`
      SELECT p.*, c.name AS combo_name
      FROM combopax p
      JOIN combo c ON p.combo_id = c.id
    `);

    const rows = result.rows; // Use `rows` from the query result

    const formattedData = rows.reduce<Record<string, number[]>>((acc, item) => {
      if (!acc[item.combo_name]) {
        acc[item.combo_name] = [];
      }
      acc[item.combo_name].push(parseFloat(item.price_per_pax));
      return acc;
    }, {});

    return formattedData;
  } catch (error) {
    console.error('Error fetching combo data:', error);
    throw error;
  }
}

export default getPax;
