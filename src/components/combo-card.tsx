import { useState } from 'react';
import Image from 'next/image';
import { Fish, EggFried } from 'lucide-react';

import type Combo from '@/types/combo';
import MenuItem from '@/types/menu';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FoodDialog } from './food-dialog';
import QuantityButton from '@/components/quantity-button';
import * as React from 'react';

interface ComboCardProps {
  combo: Combo;
  menu: Record<string, MenuItem[]>; // This should be a record of arrays
}

const ComboCard: React.FC<ComboCardProps> = ({ combo, menu }) => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = React.useState<
    'Bengali' | 'Non-Bengali' | 'Birthday Snack-Up' | 'Other'
  >('Bengali');
  const [quantity, setQuantity] = useState(0);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  return (
    <Card className="overflow-hidden rounded-3xl border-none bg-white/70 p-0 shadow-none">
      <CardHeader className={'p-2'}>
        <CardTitle className="text-center text-3xl font-black">
          {combo.name}
        </CardTitle>
      </CardHeader>
      <CardContent className={'p-0'}>
        <div className="flex flex-col justify-between">
          <Image
            src="/food.png"
            alt={combo.name}
            width={200}
            height={200}
            className="max-h-[280px] w-[100%] object-cover"
          />
          <div className="">
            <div className="flex items-center p-4">
              <div className={'flex items-center text-primary/70'}>
                <span className="text-lg">Price:</span>
                <span className="text-lg font-bold">{' ₹ ' + combo.price}</span>
                <span className="text-lg">/plate</span>
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
                  setCategory('Bengali');
                  setOpen(true);
                }}
              >
                <Fish className="h-6 w-6 text-white" />
                Bengali
              </Button>
              <Button
                variant={'default'}
                className={
                  'flex-1 bg-yellow-highlight p-2 font-bold text-black hover:bg-yellow-highlight/90'
                }
                onClick={() => {
                  setCategory('Non-Bengali');
                  setOpen(true);
                }}
              >
                <EggFried className="h-6 w-6 text-black" />
                Non-Bengali
              </Button>
            </div>

            <FoodDialog
              combo={combo}
              menu={menu}
              open={open}
              onOpenChange={setOpen}
              category={category}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComboCard;
