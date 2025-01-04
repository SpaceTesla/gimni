import connection from '@/config/db';

async function getCombos() {
  try {
    const [rows] = await connection.execute('SELECT * FROM combo');
    return rows;
  } catch (error) {
    console.error('Error fetching combo data:', error);
    throw error;
  }
}

export default getCombos;
