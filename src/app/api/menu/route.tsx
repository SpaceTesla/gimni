import { NextRequest, NextResponse } from 'next/server';
import {
  getMenu,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from '@/services/menuService';

export async function GET(request: NextRequest) {
  try {
    const menu = await getMenu();
    return NextResponse.json(menu, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch menu' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const newItem = await request.json();
    const addedItem = await addMenuItem(newItem);
    return NextResponse.json(addedItem, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add menu item' },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updatedItem = await request.json();
    const result = await updateMenuItem(updatedItem);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update menu item' },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    await deleteMenuItem(id);
    return NextResponse.json({ message: 'Menu item deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete menu item' },
      { status: 500 },
    );
  }
}
