import { NextResponse } from 'next/server';
import { getAnnouncement } from '@/services/announcementService';

type Announcement = {
  title: string;
  content: string;
  image: string;
};

export async function GET() {
  const announcement = getAnnouncement();
  return NextResponse.json(announcement);
}
