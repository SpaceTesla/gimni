'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type Announcement = {
  title: string;
  content: string;
  image: string;
  display: boolean;
};

export default function AnnouncementCard() {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);

  useEffect(() => {
    fetch('/api/announcement')
      .then((response) => response.json())
      .then((data) => setAnnouncement(data))
      .catch((error) => console.error('Error fetching announcement:', error));
  }, []);

  if (!announcement) {
    return <div></div>;
  }

  return (
    <>
      {announcement.display && (
        <div className="mx-auto my-4 max-w-screen-xl overflow-hidden rounded-lg p-4 shadow-none">
          <h2 className="rounded-t-3xl bg-red-highlight p-6 text-center text-2xl font-bold text-primary-foreground">
            {announcement.title}
          </h2>
          <div className="flex flex-col overflow-hidden rounded-b-3xl bg-white/50 md:flex-row">
            <div className="max-h-[240px] max-w-[400px] overflow-hidden md:w-1/3">
              <Image
                src={announcement.image}
                alt="AnnouncementCard image"
                width={400}
                height={300}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1 rounded-br-3xl">
              <p className="mb-4 text-gray-600">{announcement.content}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
