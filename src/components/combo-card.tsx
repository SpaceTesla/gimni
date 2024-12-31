'use client';

import { useState } from 'react';
import Image from 'next/image';

import type Combo from '@/types/combo';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FoodDialog } from './food-dialog';

interface ComboCardProps {
  combo: Combo;
}

const ComboCard: React.FC<ComboCardProps> = ({ combo }) => {
  const [open, setOpen] = useState(false);

  return (
    <Card className="overflow-hidden rounded-3xl border-none bg-white p-0 shadow-none">
      <CardHeader className={'p-2'}>
        <CardTitle className="text-center text-3xl font-black">
          {combo.name}
        </CardTitle>
      </CardHeader>
      <CardContent className={'p-0'}>
        <div className="flex flex-col justify-between">
          <Image
            src={combo.image}
            alt={combo.name}
            width={200}
            height={200}
            className="max-h-[280px] w-[100%] object-cover"
          />
          <div className="">
            <div className="flex flex-col">
              <div className={'flex gap-2 p-4 text-primary/70'}>
                <span className="text-lg">Price:</span>
                <span className="text-lg font-bold">{'₹ ' + combo.price}</span>
                <span className="text-lg">/ plate</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 py-1 text-center text-[0.75rem] text-zinc-500">
              customisable
            </div>

            <Button
              className="h-12 w-full rounded-none bg-red-highlight text-white hover:bg-red-highlight/90"
              onClick={() => setOpen(true)}
            >
              Add to Cart
            </Button>
            <FoodDialog menuData={combo} open={open} onOpenChange={setOpen} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComboCard;
