import pool from '@/config/db';
import Combo from '@/types/combo';

export async function getCombos(): Promise<Combo[]> {
  try {
    const result = await pool.query<Combo>('SELECT * FROM combo');
    return result.rows;
  } catch (error) {
    console.error('Error fetching combo data:', error);
    throw error;
  }
}

export async function addCombo(newCombo: Combo): Promise<Combo> {
  try {
    const result = await pool.query<Combo>(
      'INSERT INTO combo (name, price, rice, bread, starter, gravy, dal, salad, dessert, papad, chutney) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
      [
        newCombo.name,
        newCombo.price,
        newCombo.rice,
        newCombo.bread,
        newCombo.starter,
        newCombo.gravy,
        newCombo.dal,
        newCombo.salad,
        newCombo.dessert,
        newCombo.papad,
        newCombo.chutney,
      ],
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error adding combo:', error);
    throw error;
  }
}

export async function updateCombo(updatedCombo: Combo): Promise<Combo> {
  try {
    const result = await pool.query<Combo>(
      'UPDATE combo SET name = $1, price = $2, rice = $3, bread = $4, starter = $5, gravy = $6, dal = $7, salad = $8, dessert = $9, papad = $10, chutney = $11 WHERE id = $12 RETURNING *',
      [
        updatedCombo.name,
        updatedCombo.price,
        updatedCombo.rice,
        updatedCombo.bread,
        updatedCombo.starter,
        updatedCombo.gravy,
        updatedCombo.dal,
        updatedCombo.salad,
        updatedCombo.dessert,
        updatedCombo.papad,
        updatedCombo.chutney,
        updatedCombo.id,
      ],
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error updating combo:', error);
    throw error;
  }
}

export async function deleteCombo(id: string): Promise<void> {
  try {
    await pool.query('DELETE FROM combo WHERE id = $1', [id]);
  } catch (error) {
    console.error('Error deleting combo:', error);
    throw error;
  }
}
