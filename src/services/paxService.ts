import pool from '@/config/db';

interface ComboPax {
  id: number;
  combo_id: number;
  pax_range: string;
  price_per_pax: string;
  combo_name: string;
}

async function getPax(uncategorized = false) {
  try {
    const result = await pool.query<ComboPax>(`
      SELECT p.*, c.name AS combo_name
      FROM combopax p
      JOIN combo c ON p.combo_id = c.id
    `);

    const rows = result.rows; // Use `rows` from the query result

    if (uncategorized) {
      return rows;
    }

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

async function addPax(newPax: ComboPax): Promise<ComboPax> {
  try {
    const result = await pool.query<ComboPax>(
      'INSERT INTO combopax (combo_id, pax_range, price_per_pax) VALUES ($1, $2, $3) RETURNING *',
      [newPax.combo_id, newPax.pax_range, newPax.price_per_pax],
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error adding pax:', error);
    throw error;
  }
}

async function updatePax(updatedPax: ComboPax): Promise<ComboPax> {
  try {
    const result = await pool.query<ComboPax>(
      'UPDATE combopax SET combo_id = $1, pax_range = $2, price_per_pax = $3 WHERE id = $4 RETURNING *',
      [
        updatedPax.combo_id,
        updatedPax.pax_range,
        updatedPax.price_per_pax,
        updatedPax.id,
      ],
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error updating pax:', error);
    throw error;
  }
}

async function deletePax(id: number): Promise<void> {
  try {
    await pool.query('DELETE FROM combopax WHERE id = $1', [id]);
  } catch (error) {
    console.error('Error deleting pax:', error);
    throw error;
  }
}

export { getPax, addPax, updatePax, deletePax };
