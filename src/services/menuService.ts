import pool from '@/config/db';
import MenuItem from '@/types/menu';

async function getMenu(
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

export default getMenu;
