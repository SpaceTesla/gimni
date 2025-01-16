'use client';

import { useEffect, useState } from 'react';
import ComboCard from '@/components/combo-card';
import Combo from '@/types/combo';
import type MenuItem from '@/types/menu';
import { CartProvider } from '@/context/cartContext';
import Cart from '@/components/cart';
import { UserInfoModal } from '@/components/user-info-modal';
import DefaultLayout from '@/app/default-layout';
import combo from '@/types/combo';

export default function FoodOrdering() {
  const [combos, setCombos] = useState<Combo[]>([]);
  const [menu, setMenu] = useState<Record<string, MenuItem[]>>({});
  const [pax, setPax] = useState<Record<string, number[]>>({});
  const [userInfo, setUserInfo] = useState<{
    name: string;
    phone: string;
    address: string;
    date: Date;
    numberOfPeople: number;
    occasion: string;
  } | null>(null);

  const cacheTTL = 1800; // Cache data for 600 seconds (10 minutes)

  function setLocalStorageWithTTL(key: string, value: any, ttl: number) {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + ttl * 1000,
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  function getLocalStorageWithTTL(key: string) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    console.log(`Data for ${key} retrieved from local storage`);
    return item.value;
  }

  async function fetchData(url: string, cacheKey: string) {
    const cachedData = getLocalStorageWithTTL(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setLocalStorageWithTTL(cacheKey, data, cacheTTL);
      return data;
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      throw error;
    }
  }

  useEffect(() => {
    async function fetchCombos() {
      try {
        const data: Combo[] = await fetchData('/api/combos', 'combos');
        setCombos(data);
      } catch (error) {
        console.error('Error fetching combos:', error);
      }
    }

    async function fetchMenu() {
      try {
        const data = await fetchData('/api/menu', 'menu');
        setMenu(data);
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    }

    async function fetchPax() {
      try {
        const data = await fetchData('/api/pax', 'pax');
        setPax(data);
      } catch (error) {
        console.error('Error fetching pax:', error);
      }
    }

    fetchCombos().then(() => console.log('Combos fetched'));
    fetchMenu().then(() => console.log('Menu fetched'));
    fetchPax().then(() => console.log('Pax fetched'));

    const savedUserInfo = getLocalStorageWithTTL('userInfo');
    if (savedUserInfo) {
      setUserInfo(savedUserInfo);
    }
  }, []);

  console.log('Combos:', combos);
  console.log('Menu:', menu);
  console.log('Pax:', pax);

  const handleUserInfoSubmit = (data: {
    name: string;
    phone: string;
    address: string;
    date: Date;
    numberOfPeople: number;
    occasion: string;
  }) => {
    setUserInfo(data);
    setLocalStorageWithTTL('userInfo', data, cacheTTL);
    console.log('Submitted:', data);
  };

  const combo7 = {
    id: '7',
    name: 'Custom Combo',
    price: 0,
    rice: 0,
    bread: 0,
    starter: 0,
    gravy: 0,
    dal: 0,
    salad: 0,
    dessert: 0,
    papad: 0,
    chutney: 0,
  };

  if (!userInfo) {
    return <UserInfoModal onSubmit={handleUserInfoSubmit} />;
  }

  return (
    <DefaultLayout>
      <CartProvider>
        <div className="min-h-screen">
          <div className="container mx-auto p-4 pt-12">
            <div className="flex flex-col gap-8 lg:flex-row">
              {/* Menu Section */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:col-span-3 lg:w-[65%] lg:gap-x-8">
                {combos.map((combo) => (
                  <ComboCard
                    key={combo.id}
                    combo={combo}
                    menu={menu}
                    pax={pax}
                    numberOfPeople={userInfo.numberOfPeople}
                  />
                ))}
                <ComboCard
                  key={'combo-7'}
                  combo={combo7}
                  menu={menu}
                  numberOfPeople={userInfo.numberOfPeople}
                />
              </div>

              {/* Cart Section */}
              <div className="flex-grow">
                <Cart
                  userInfo={userInfo}
                  dialogInfo={{
                    combos: combos,
                    menu: menu,
                    pax: pax,
                    numberOfPeople: userInfo.numberOfPeople,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </CartProvider>
    </DefaultLayout>
  );
}
