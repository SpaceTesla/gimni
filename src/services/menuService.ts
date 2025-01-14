import pool from '@/config/db';
import MenuItem from '@/types/menu';

export async function getMenu(
  uncategorized: boolean = false,
): Promise<MenuItem[] | Record<string, MenuItem[]>> {
  try {
    const result = await pool.query<MenuItem>(
      'SELECT * FROM menu ORDER BY type',
    );
    const rows = result.rows; // Use `rows` from the `pg` result object

    if (uncategorized) {
      return rows;
    }

    // Categorize the menu items by type
    const categorizedMenu = rows.reduce<Record<string, MenuItem[]>>(
      (acc, item) => {
        if (!acc[item.type]) {
          acc[item.type] = [];
        }
        acc[item.type].push(item);
        return acc;
      },
      {},
    );

    return categorizedMenu;
  } catch (error) {
    console.error('Error fetching menu data:', error);
    throw error;
  }
}

export async function addMenuItem(newItem: MenuItem): Promise<MenuItem> {
  try {
    const result = await pool.query(
      'INSERT INTO menu (name, category, type, diet, price) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [
        newItem.name,
        newItem.category,
        newItem.type,
        newItem.diet,
        newItem.price,
      ],
    );

    const menuItem: MenuItem = result.rows[0];
    return menuItem;
  } catch (error) {
    console.error('Error adding menu item:', error);
    throw error;
  }
}

export async function updateMenuItem(updatedItem: MenuItem): Promise<MenuItem> {
  try {
    const result = await pool.query<MenuItem>(
      'UPDATE menu SET name = $1, type = $2, price = $3 WHERE id = $4 RETURNING *',
      [updatedItem.name, updatedItem.type, updatedItem.price, updatedItem.id],
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error updating menu item:', error);
    throw error;
  }
}

export async function deleteMenuItem(id: string): Promise<void> {
  try {
    await pool.query('DELETE FROM menu WHERE id = $1', [id]);
  } catch (error) {
    console.error('Error deleting menu item:', error);
    throw error;
  }
}
