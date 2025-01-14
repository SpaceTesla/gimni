import { NextRequest, NextResponse } from 'next/server';
import {
  getCombos,
  addCombo,
  updateCombo,
  deleteCombo,
} from '@/services/comboService';

export async function GET(request: NextRequest) {
  try {
    const combos = await getCombos();
    return NextResponse.json(combos, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch combos' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const newCombo = await request.json();
    const addedCombo = await addCombo(newCombo);
    return NextResponse.json(addedCombo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add combo' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updatedCombo = await request.json();
    const result = await updateCombo(updatedCombo);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update combo' },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    await deleteCombo(id);
    return NextResponse.json({ message: 'Combo deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete combo' },
      { status: 500 },
    );
  }
}
