import getCombos from '@/services/comboService';

export async function GET(request: Request) {
  try {
    const combos = await getCombos();
    return new Response(JSON.stringify(combos), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch combos' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
