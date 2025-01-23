'use client';

import { MenuSection } from '@/components/menu-section';
import DefaultLayout from '@/app/default-layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { MenuData } from '@/data/menu';
import { Button } from '@/components/ui/button';
import { ArrowUpIcon } from 'lucide-react';

export default function MenuPage() {
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);

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

  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScroll = () => {
    const isBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
    setIsAtBottom(isBottom);

    if (window.scrollY > 800) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!menuData) {
    return <div></div>;
  }

  return (
    <DefaultLayout>
      <div className="mx-auto min-h-screen px-4 py-8 text-white">
        {/* Restaurant Logo/Header */}
        <div className="mb-2 flex justify-center">
          <div className="inline-flex -skew-x-12 transform bg-red-highlight px-8 py-3">
            <h1 className="skew-x-12 text-3xl font-bold text-white">
              Take Away Menu
            </h1>
          </div>
        </div>

        <div className={'mb-6 text-center text-lg text-sm italic text-black'}>
          *Prices are subject to seasonality and availability
        </div>

        {/* Menu Grid */}
        <div className="mx-auto columns-1 gap-4 sm:columns-2 lg:columns-3">
          {menuData.sections.map((section, index) => (
            <MenuSection key={`${section.title}-${index}`} section={section} />
          ))}
        </div>
      </div>
      {showButton && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 left-1/2 aspect-square -translate-x-1/2 transform rounded-full bg-blue-500 bg-red-highlight p-4 shadow-md hover:bg-red-highlight lg:hidden"
        >
          <div>
            <ArrowUpIcon width={'24'} height={'24'} />
          </div>
        </Button>
      )}
    </DefaultLayout>
  );
}
