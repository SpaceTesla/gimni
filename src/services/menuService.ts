import connection from '@/config/db';
import MenuItem from '@/types/menu';

async function getMenu() {
  try {
    const [rows] = (await connection.execute(
      'SELECT * FROM menu ORDER BY type',
    )) as [MenuItem[], any];
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
