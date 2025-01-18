'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

import type Combo from '@/types/combo';
import MenuItem from '@/types/menu';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FoodDialog } from './food-dialog';
import { AddOnsOnlyFoodDialog } from '@/components/addons-only-food-dialog';
import * as React from 'react';

interface ComboCardProps {
  combo?: Combo;
  menu: Record<string, MenuItem[]>; // This should be a record of arrays
  pax?: Record<string, number[]>;
  numberOfPeople: number;
}

const ComboCard: React.FC<ComboCardProps> = ({
  combo,
  menu,
  pax,
  numberOfPeople,
}) => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = React.useState<
    'Meal' | 'Birthday Snack-Up' | 'Other'
  >('Meal');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pax) {
      setLoading(false);
    }
  }, [pax]);

  const getPriceBasedOnQuantity = (
    quantity: number,
    prices: number[],
  ): number => {
    switch (true) {
      case quantity >= 10 && quantity <= 19:
        return prices[0];
      case quantity >= 20 && quantity <= 29:
        return prices[1];
      case quantity >= 30 && quantity <= 49:
        return prices[2];
      case quantity >= 50 && quantity <= 99:
        return prices[3];
      case quantity >= 100 && quantity <= 149:
        return prices[4];
      case quantity >= 150 && quantity <= 199:
        return prices[5];
      case quantity >= 200 && quantity <= 249:
        return prices[6];
      case quantity >= 250:
        return prices[7];
      default:
        return prices[0]; // Default to the first price if no range matches
    }
  };

  const comboPrices = pax?.[combo?.name ?? ''] ?? [];
  const comboPrice = getPriceBasedOnQuantity(numberOfPeople, comboPrices);
  console.log('pax from combo-card', pax);
  console.log('combo from combo-card', combo);
  console.log('comboPrices', comboPrices);
  console.log('comboPrice', comboPrice);

  return (
    <Card className="overflow-hidden rounded-3xl border-none bg-white/70 p-0 shadow-none">
      <CardHeader className={'p-2'}>
        <CardTitle className="text-center text-3xl font-black">
          {combo?.name ?? 'No Combo Selected'}
        </CardTitle>
      </CardHeader>
      <CardContent className={'p-0'}>
        <div className="flex flex-col justify-between">
          <Image
            src="/combo.jpg"
            alt={combo?.name ?? 'No Combo Selected'}
            width={200}
            height={200}
            className="max-h-[280px] w-[100%] object-cover"
          />
          <div className="">
            <div className="flex items-center p-4">
              <div className={'flex items-center gap-1 text-primary/70'}>
                {numberOfPeople >= 300 ? (
                  <>
                    <span className="text-lg">Price:</span>
                    <span className="text-lg font-bold">--</span>
                  </>
                ) : combo?.price === 0 ? (
                  <span className="text-lg font-bold">
                    Price as per selection
                  </span>
                ) : (
                  <>
                    <span className="text-lg">Price:</span>
                    <span className="text-lg font-bold">
                      {' ₹ ' + parseInt(comboPrice.toString())}
                    </span>
                    <span className="text-lg">/plate</span>
                  </>
                )}
              </div>
            </div>

            <div className="pb-2 text-center text-[0.75rem] text-zinc-500">
              customisable
            </div>

            <div className={'flex gap-4'}>
              <Button
                variant={'default'}
                className={
                  'flex-1 rounded-none bg-red-highlight p-6 font-bold text-white hover:bg-red-highlight/90'
                }
                onClick={() => {
                  setCategory('Meal');
                  setOpen(true);
                }}
              >
                Add to Cart
              </Button>
              {/*x*/}
            </div>

            {pax ? (
              <FoodDialog
                combo={combo}
                menu={menu}
                open={open}
                onOpenChange={setOpen}
                category={category}
                pax={pax}
                numberOfPeople={numberOfPeople}
              />
            ) : (
              <AddOnsOnlyFoodDialog
                combo={combo}
                menu={menu}
                open={open}
                onOpenChange={setOpen}
                category={category}
                numberOfPeople={numberOfPeople}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComboCard;
