// Dependencies: pnpm install lucide-react

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Brush,
  Eraser,
  Scissors,
  SwatchBook,
  SquareChevronUp,
} from 'lucide-react';

import type Combo from '@/types/combo';
import combos from '@/data/combos';
import { toTitleCase } from '@/utils/stringUtils';
import { Button } from '@/components/ui/button';

// const items = [
//   { id: 'radio-11-r1', value: 'r1', label: 'Palette', Icon: SwatchBook },
//   { id: 'radio-11-r2', value: 'r2', label: 'Brush', Icon: Brush },
//   { id: 'radio-11-r3', value: 'r3', label: 'Eraser', Icon: Eraser },
//   { id: 'radio-11-r4', value: 'r4', label: 'Cut', Icon: Scissors },
// ];

type Item = {
  id: string;
  value: string;
  label: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

interface Props {
  combo: Combo;
}

export default function RadioDemo({ combo }: Props) {
  let items: Item[] = [];

  combo.options.map((option) => {
    items.push({
      id: `radio-${combo.name}-${option.type}`,
      value: option.type,
      label: toTitleCase(option.type),
      Icon: SwatchBook,
    });
  });

  return (
    <RadioGroup className="grid-cols-2" defaultValue="r1">
      {items.map((item) => (
        <div
          key={item.id}
          className="border-green-highlight group relative flex flex-col gap-4 overflow-hidden rounded-lg border p-4 has-[[data-state=checked]]:border-red-nav"
        >
          <div className="flex justify-between gap-2">
            <RadioGroupItem
              id={item.id}
              value={item.value}
              className="order-1 after:absolute after:inset-0"
            />
            <item.Icon
              className="opacity-60"
              width={16}
              height={16}
              strokeWidth={2}
              aria-hidden="true"
            />
          </div>
          <Label htmlFor={item.id}>{item.label}</Label>
          <button
            className="bg-green-highlight absolute bottom-0 right-0 overflow-hidden rounded-tl-md p-1 group-has-[[data-state=checked]]:bg-red-nav"
            type="button"
          >
            <SquareChevronUp width={24} height={24} className={'text-white'} />
          </button>
        </div>
      ))}{' '}
    </RadioGroup>
  );
}
