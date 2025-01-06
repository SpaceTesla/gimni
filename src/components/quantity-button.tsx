'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface QuantityButtonProps {
  initialValue?: number;
  minValue?: number;
  onChange?: (value: number) => void;
}

export default function QuantityButton({
  initialValue = 10,
  minValue = 10,
  onChange,
}: QuantityButtonProps) {
  const [quantity, setQuantity] = useState(Math.max(initialValue, minValue));
  const [inputValue, setInputValue] = useState(quantity.toString());

  const updateQuantity = (newValue: number) => {
    const validValue = Math.max(newValue, minValue);
    setQuantity(validValue);
    setInputValue(validValue.toString());
    onChange?.(validValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };

  const handleInputBlur = () => {
    const newValue = parseInt(inputValue, 10);
    if (isNaN(newValue)) {
      updateQuantity(minValue);
    } else {
      updateQuantity(newValue);
    }
  };

  return (
    <>
      <style jsx global>{`
        @layer base {
          input[type='number']::-webkit-inner-spin-button,
          input[type='number']::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          input[type='number'] {
            -moz-appearance: textfield;
          }
        }
        .quantity-input {
          font-size: 16px !important;
          line-height: 1 !important;
        }
      `}</style>
      <div className="flex h-10 items-center">
        <Button
          variant="outline"
          size="icon"
          onClick={() => updateQuantity(quantity - 1)}
          disabled={quantity <= minValue}
          className="h-full rounded-r-none bg-emerald-500 text-white hover:bg-emerald-600"
        >
          <Minus className="h-4 w-4" />
          <span className="sr-only">Decrease quantity</span>
        </Button>
        <Input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className="quantity-input h-full w-12 rounded-none border-x-0 bg-emerald-500 px-0 text-center text-white hover:bg-emerald-600 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button
          variant="outline"
          size="icon"
          onClick={() => updateQuantity(quantity + 1)}
          className="h-full rounded-l-none bg-emerald-500 text-white hover:bg-emerald-600"
        >
          <Plus className="h-6 w-6" />
          <span className="sr-only">Increase quantity</span>
        </Button>
      </div>
    </>
  );
}
