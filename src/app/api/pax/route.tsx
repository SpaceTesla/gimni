import { NextRequest, NextResponse } from 'next/server';
import { getPax, addPax, updatePax, deletePax } from '@/services/paxService';

export async function GET(request: NextRequest) {
  try {
    const pax = await getPax();
    return NextResponse.json(pax, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch pax' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const newPax = await request.json();
    const addedPax = await addPax(newPax);
    return NextResponse.json(addedPax, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add pax' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updatedPax = await request.json();
    const result = await updatePax(updatedPax);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update pax' },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    await deletePax(id);
    return NextResponse.json({ message: 'Pax deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete pax' },
      { status: 500 },
    );
  }
}
