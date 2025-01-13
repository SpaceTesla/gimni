import getMenu from '@/services/menuService';

export async function GET(request: Request) {
  try {
    const menu = await getMenu(true);
    return new Response(JSON.stringify(menu), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch menu' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
