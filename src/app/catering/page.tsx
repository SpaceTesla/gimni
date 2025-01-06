'use client';

import { useEffect, useState } from 'react';

import ComboCard from '@/components/combo-card';

import type Combo from '@/types/combo';
import type MenuItem from '@/types/menu';
import { CartProvider } from '@/context/cartContext';
import Cart from '@/components/cart';

export default function FoodOrdering() {
  const [combos, setCombos] = useState<Combo[]>([]);
  const [menu, setMenu] = useState<Record<string, MenuItem[]>>({});
  const [pax, setPax] = useState<Record<string, number[]>>({});

  useEffect(() => {
    async function fetchCombos() {
      try {
        const response = await fetch('/api/combos');
        const data: Combo[] = await response.json();
        setCombos(data);
      } catch (error) {
        console.error('Error fetching combos:', error);
      }
    }

    async function fetchMenu() {
      try {
        const response = await fetch('/api/menu');
        const data = await response.json();
        setMenu(data);
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    }

    async function fetchPax() {
      try {
        const response = await fetch('/api/pax');
        const data = await response.json();
        setPax(data);
      } catch (error) {
        console.error('Error fetching pax:', error);
      }
    }

    fetchCombos().then(() => console.log('Combos fetched'));
    fetchMenu().then(() => console.log('Menu fetched'));
    fetchPax().then(() => console.log('Pax fetched'));
  }, []);

  return (
    <CartProvider>
      <div className="min-h-screen">
        <div className="container mx-auto p-4 pt-12">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Menu Section */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:col-span-3 lg:w-[65%] lg:gap-x-8">
              {combos.map((combo) => (
                <ComboCard key={combo.id} combo={combo} menu={menu} pax={pax} />
              ))}
            </div>

            {/* Cart Section */}
            <div className="flex-grow">
              <Cart />
            </div>
          </div>
        </div>
      </div>
    </CartProvider>
  );
}
