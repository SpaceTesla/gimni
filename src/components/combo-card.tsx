'use client';

import { useState } from 'react';
import Image from 'next/image';

import type Combo from '@/types/combo';
import MenuItem from '@/types/menu';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FoodDialog } from './food-dialog';
import { AddOnsOnlyFoodDialog } from '@/components/addons-only-food-dialog';
import QuantityButton from '@/components/quantity-button';
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
  const [quantity, setQuantity] = useState(0);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

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
            src="/food.png"
            alt={combo?.name ?? 'No Combo Selected'}
            width={200}
            height={200}
            className="max-h-[280px] w-[100%] object-cover"
          />
          <div className="">
            <div className="flex items-center p-4">
              <div className={'flex items-center gap-1 text-primary/70'}>
                {combo?.price === 0 ? (
                  <span className="text-lg font-bold">
                    Price as per selection
                  </span>
                ) : (
                  <>
                    <span className="text-lg">Price:</span>
                    {combo?.price &&
                    Number.isInteger(parseInt(combo.price.toString())) ? (
                      <>
                        <span className="text-lg font-bold">
                          {' ₹ ' + parseInt(combo.price.toString())}
                        </span>
                        <span className="text-lg">/plate</span>
                      </>
                    ) : (
                      <span className="text-lg font-bold">
                        {' ' + combo?.price}
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="pb-2 text-center text-[0.75rem] text-zinc-500">
              customisable
            </div>

            <div className={'mx-4 flex gap-4 pb-4'}>
              <Button
                variant={'default'}
                className={
                  'flex-1 bg-red-highlight p-2 font-bold text-white hover:bg-red-highlight/90'
                }
                onClick={() => {
                  setCategory('Meal');
                  setOpen(true);
                }}
              >
                Meal
              </Button>
              <Button
                variant={'default'}
                className={
                  'flex-1 bg-yellow-highlight p-2 font-bold text-black hover:bg-yellow-highlight/90'
                }
              >
                Birthday Snack-Up
              </Button>
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
