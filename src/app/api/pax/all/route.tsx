import getPax from '@/services/paxService';

export async function GET(request: Request) {
  try {
    const menu = await getPax(true);
    return new Response(JSON.stringify(menu), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch pax' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
