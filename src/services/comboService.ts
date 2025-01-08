import pool from '@/config/db';

async function getCombos() {
  try {
    const result = await pool.query('SELECT * FROM combo');
    return result.rows; // `pg` library uses `rows` to return query results
  } catch (error) {
    console.error('Error fetching combo data:', error);
    throw error;
  }
}

export default getCombos;
