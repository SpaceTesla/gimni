import { NextResponse } from 'next/server';
import { getMenuData } from '@/services/takeAwayMenuService';

export async function GET() {
  const menuData = getMenuData();
  return NextResponse.json(menuData);
}
