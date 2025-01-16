'use client';

import { MenuSection } from '@/components/menu-section';
import DefaultLayout from '@/app/default-layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { MenuData } from '@/data/menu';

export default function MenuPage() {
  const [menuData, setMenuData] = useState<MenuData | null>(null);

  useEffect(() => {
    axios
      .get('/api/takeaway-menu')
      .then((response) => {
        setMenuData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching menu data:', error);
      });
  }, []);

  if (!menuData) {
    return <div></div>;
  }

  return (
    <DefaultLayout>
      <div className="mx-auto min-h-screen px-4 py-8 text-white">
        {/* Restaurant Logo/Header */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex -skew-x-12 transform bg-red-highlight px-8 py-3">
            <h1 className="skew-x-12 text-3xl font-bold text-white">
              Take Away Menu
            </h1>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="mx-auto columns-1 gap-4 sm:columns-2 lg:columns-3">
          {menuData.sections.map((section, index) => (
            <MenuSection key={`${section.title}-${index}`} section={section} />
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
}
