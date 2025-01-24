'use client';

import * as React from 'react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ArrowLeft, X } from 'lucide-react';

import Combo from '@/types/combo';
import { toTitleCase } from '@/utils/stringUtils';
import MenuItem from '@/types/menu';
import { Checkbox } from '@/components/ui/checkbox';
import { useCart } from '@/context/cartContext';
import QuantityButton from '@/components/quantity-button';

interface FoodDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  combo?: Combo;
  menu: Record<string, MenuItem[]>;
  category: 'Meal' | 'Birthday Snack-Up' | 'Other';
  pax?: Record<string, number[]>;
  numberOfPeople: number;
}

export function AddOnsOnlyFoodDialog({
  open,
  onOpenChange,
  combo,
  menu,
  category,
  numberOfPeople,
}: FoodDialogProps) {
  const { toast } = useToast();
  const { addToCart } = useCart(); // Use your cart context or function

  const [menuType, setMenuType] = React.useState<'veg' | 'nonVeg'>('veg');
  const [quantity, setQuantity] = React.useState(numberOfPeople);

  const handleNext = () => {
    handleAddToCart();
  };

  const [showMore, setShowMore] = useState<Record<string, boolean>>({});

  const [selections, setSelections] = React.useState<Record<string, string[]>>(
    Object.fromEntries(Object.keys(combo ?? {}).map((key) => [key, []])),
  );

  const [addOns, setAddOns] = React.useState<Record<string, string[]>>({});
  const [additionals, setAdditionals] = useState<Record<string, boolean>>({
    Water: false,
    'Soft Drink': false,
    'Fruit Juice': false,
  });

  const handleSelection = (
    groupTitle: string,
    value: string,
    maxSelections: number,
    isAddOn: boolean = false,
    isAdditional: boolean = false,
  ) => {
    if (isAdditional) {
      setAdditionals((prev) => ({
        ...prev,
        [value]: !prev[value],
      }));
    } else {
      const setState = isAddOn ? setAddOns : setSelections;
      setState((prev) => {
        const currentSelections = prev[groupTitle] || [];
        let newSelections: string[];

        if (currentSelections.includes(value)) {
          newSelections = currentSelections.filter((item) => item !== value);
        } else {
          newSelections = [...currentSelections, value];
          if (newSelections.length > maxSelections) {
            newSelections = newSelections.slice(-maxSelections);
          }
        }

        return {
          ...prev,
          [groupTitle]: newSelections,
        };
      });
    }
  };

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

  const handleAddToCart = () => {
    const addOnsPrice = Object.keys(addOns).reduce((total, key) => {
      return (
        total +
        addOns[key].reduce((sum, itemName) => {
          const item = menu[key].find((item) => item.name === itemName);
          return sum + (item ? Number(item.price) : 0);
        }, 0)
      );
    }, 0);

    const additionalsPrice = Object.keys(additionals).reduce((total, key) => {
      return total + (additionals[key] ? 10 : 0); // Assuming each additional item costs 10
    }, 0);

    let totalPrice = addOnsPrice + additionalsPrice;

    const cartItem = {
      id: combo?.id.toString() ?? 'add-ons-only',
      comboName: combo?.name ?? 'Add-Ons Only',
      category,
      dietType: menuType === 'veg' ? 'Veg' : 'Non-Veg',
      selections,
      addOns: {
        ...addOns,
        ...Object.keys(additionals).reduce(
          (acc, key) => {
            if (additionals[key]) {
              acc[key] = [key];
            }
            return acc;
          },
          {} as Record<string, string[]>,
        ),
      },
      quantity,
      comboPrice: 0,
      totalPrice: Number(totalPrice.toFixed(2)),
    };

    addToCart(cartItem);

    console.log('Combo Name:', combo?.name ?? 'Add-Ons Only');
    console.log('Category:', category);
    console.log('Diet Type:', menuType === 'veg' ? 'Veg' : 'Non-Veg');
    console.log('Menu Items Selected:', selections);
    console.log('Add-Ons Selected:', addOns);
    console.log('Additionals Selected:', additionals);
    console.log('Total Price:', totalPrice.toFixed(2));

    onOpenChange(false);
  };

  function filterMenuItems(
    menu: Record<string, MenuItem[]>,
    selectedCategory: 'Meal' | 'Birthday Snack-Up' | 'Other',
    selectedDiet: 'Veg' | 'Non-Veg',
  ): Record<string, MenuItem[]> {
    const filteredMenu: Record<string, MenuItem[]> = {};

    Object.keys(menu).forEach((key) => {
      filteredMenu[key] = menu[key].filter((item) => {
        const isCategoryMatch = item.category === selectedCategory;
        const isDietMatch =
          selectedDiet === 'Non-Veg'
            ? key.toLowerCase() === 'starter' || key.toLowerCase() === 'gravy'
              ? item.diet === 'Non-Veg'
              : true
            : item.diet === selectedDiet;
        const isNotExcludedItem =
          item.name.toLowerCase() !== 'salad' &&
          item.name.toLowerCase() !== 'papad';

        return isCategoryMatch && isDietMatch && isNotExcludedItem;
      });
    });

    console.log('filteredMenu', filteredMenu);
    return filteredMenu;
  }

  const filteredMenu = filterMenuItems(
    menu,
    category,
    menuType === 'veg' ? 'Veg' : 'Non-Veg',
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[600px] max-w-xl overflow-auto">
        <DialogHeader>
          <DialogTitle>
            <div className="mb-2 text-2xl font-semibold">Choose Add-Ons</div>

            <Button
              onClick={() => {
                onOpenChange(false);
              }}
              variant={'ghost'}
              className="absolute right-4 top-4 p-2"
            >
              <X />
            </Button>
          </DialogTitle>
        </DialogHeader>

        {/* Add-Ons Selection */}
        <div className="h-full overflow-auto">
          <div className="overflow-y-auto">
            <div className="flex flex-col gap-4">
              {Object.keys(menu).map((key) => {
                const sortedItems = [...menu[key]].sort((a, b) => {
                  if (a.diet === 'Non-Veg' && b.diet === 'Veg') return -1;
                  if (a.diet === 'Veg' && b.diet === 'Non-Veg') return 1;
                  return 0;
                });

                return (
                  <div key={key}>
                    <div className="flex items-center justify-between">
                      <span>{toTitleCase(key)}</span>
                    </div>
                    <div>
                      <ul className="space-y-2 rounded-2xl bg-white/50 p-4">
                        {sortedItems.slice(0, 4).map((item) => (
                          <div
                            key={item.id}
                            className="flex cursor-pointer items-center justify-between p-1 text-sm text-gray-600"
                          >
                            <Label
                              htmlFor={`addon-${key}-${item.id}`}
                              className="flex w-full cursor-pointer items-center justify-between pr-4 pt-0.5 align-middle text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              <span className="flex items-center gap-1">
                                {item.diet === 'Veg' ? (
                                  <Image
                                    src="/veg.svg"
                                    alt="Veg"
                                    width={16}
                                    height={16}
                                    className="mr-2"
                                  />
                                ) : (
                                  <Image
                                    src="/non-veg.svg"
                                    alt="Non-Veg"
                                    width={16}
                                    height={16}
                                    className="mr-2"
                                  />
                                )}
                                {item.name}
                              </span>
                              <span>{item.price}</span>
                            </Label>
                            <Checkbox
                              id={`addon-${key}-${item.id}`}
                              className="peer"
                              checked={addOns[key]?.includes(item.name)}
                              onCheckedChange={() => {
                                handleSelection(key, item.name, Infinity, true);
                              }}
                            />
                          </div>
                        ))}
                        {showMore[key] &&
                          sortedItems.slice(4).map((item) => (
                            <div
                              key={item.id}
                              className="flex cursor-pointer items-center justify-between p-1 text-sm text-gray-600"
                            >
                              <Label
                                htmlFor={`addon-${key}-${item.id}`}
                                className="flex w-full cursor-pointer items-center justify-between pr-4 pt-0.5 align-middle text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                <span className="flex items-center gap-1">
                                  {item.diet === 'Veg' ? (
                                    <Image
                                      src="/veg.svg"
                                      alt="Veg"
                                      width={16}
                                      height={16}
                                      className="mr-2"
                                    />
                                  ) : (
                                    <Image
                                      src="/non-veg.svg"
                                      alt="Non-Veg"
                                      width={16}
                                      height={16}
                                      className="mr-2"
                                    />
                                  )}
                                  {item.name}
                                </span>
                                <span>{item.price}</span>
                              </Label>
                              <Checkbox
                                id={`addon-${key}-${item.id}`}
                                className="peer"
                                checked={addOns[key]?.includes(item.name)}
                                onCheckedChange={() => {
                                  handleSelection(
                                    key,
                                    item.name,
                                    Infinity,
                                    true,
                                  );
                                }}
                              />
                            </div>
                          ))}
                        {menu[key].length > 4 && (
                          <button
                            onClick={() =>
                              setShowMore((prev) => ({
                                ...prev,
                                [key]: !prev[key],
                              }))
                            }
                            className="ml-2 pt-2 text-sm font-semibold text-zinc-500"
                          >
                            {showMore[key]
                              ? 'Show less'
                              : `Show ${menu[key].length - 4} more`}
                          </button>
                        )}
                      </ul>
                    </div>
                  </div>
                );
              })}
              {/* Additional Items Selection */}
              <div>
                <div className="flex items-center justify-between">
                  <span>Additionals</span>
                </div>
                <div>
                  <ul className="space-y-2 rounded-2xl bg-white/50 p-4">
                    {Object.keys(additionals).map((item) => (
                      <div
                        key={item}
                        className="flex cursor-pointer items-center justify-between p-1 text-sm text-gray-600"
                      >
                        <Label
                          htmlFor={`additional-${item}`}
                          className="flex w-full cursor-pointer justify-between pr-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          <span>{item}</span>
                          <span>MRP + SC</span>
                        </Label>
                        <Checkbox
                          id={`additional-${item}`}
                          className="peer"
                          checked={additionals[item]}
                          onCheckedChange={() => {
                            handleSelection('', item, Infinity, false, true);
                          }}
                        />
                      </div>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <DialogFooter>
          <div className="flex w-full flex-wrap items-center justify-between gap-6">
            {/*<QuantityButton*/}
            {/*  initialValue={quantity}*/}
            {/*  minValue={10}*/}
            {/*  onChange={(value) => setQuantity(value)}*/}
            {/*/>*/}
            <div className="flex flex-grow items-center gap-4">
              <Button
                onClick={handleNext}
                className="h-full flex-grow bg-emerald-500 text-white hover:bg-emerald-600"
                disabled={Object.keys(addOns).length === 0}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
