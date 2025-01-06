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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

import combo from '@/types/combo';
import { toTitleCase } from '@/utils/stringUtils';
import MenuItem from '@/types/menu';
import { Checkbox } from '@/components/ui/checkbox';

interface FoodDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  combo: combo;
  menu: Record<string, MenuItem[]>;
  category: 'Bengali' | 'Non-Bengali' | 'Birthday Snack-Up' | 'Other';
}

export function FoodDialog({
  open,
  onOpenChange,
  combo,
  menu,
  category,
}: FoodDialogProps) {
  const [currentStep, setCurrentStep] = React.useState<
    'selectDiet' | 'selectMenu' | 'selectAddOns'
  >('selectDiet');
  const [menuType, setMenuType] = React.useState<'veg' | 'nonVeg'>('veg');

  const handleNext = () => {
    if (currentStep === 'selectDiet') setCurrentStep('selectMenu');
    else if (currentStep === 'selectMenu') setCurrentStep('selectAddOns');
    else if (currentStep === 'selectAddOns') handleAddToCart();
  };

  const handleBack = () => {
    if (currentStep === 'selectMenu') setCurrentStep('selectDiet');
    else if (currentStep === 'selectAddOns') setCurrentStep('selectMenu');
  };

  const [showMore, setShowMore] = useState<Record<string, boolean>>({});

  const [selections, setSelections] = React.useState<Record<string, string[]>>(
    Object.fromEntries(Object.keys(combo).map((key) => [key, []])),
  );

  const [addOns, setAddOns] = React.useState<Record<string, string[]>>({});

  const handleSelection = (
    groupTitle: string,
    value: string,
    maxSelections: number,
    isAddOn: boolean = false,
  ) => {
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

    const totalPrice = Number(combo.price) + addOnsPrice;

    console.log('Combo Name:', combo.name);
    console.log('Category:', category);
    console.log('Diet Type:', menuType === 'veg' ? 'Veg' : 'Non-Veg');
    console.log('Menu Items Selected:', selections);
    console.log('Add-Ons Selected:', addOns);
    console.log('Total Price:', totalPrice.toFixed(2));
  };

  function filterMenuItems(
    menu: Record<string, MenuItem[]>,
    selectedCategory: 'Bengali' | 'Non-Bengali' | 'Birthday Snack-Up' | 'Other',
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

    console.log(filteredMenu);
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
            {currentStep === 'selectDiet' && (
              <div className="mb-2 text-2xl font-semibold">
                Choose Menu Type
              </div>
            )}
            {currentStep === 'selectMenu' && (
              <div className="mb-2 text-2xl font-semibold">
                Choose Menu Items
              </div>
            )}
            {currentStep === 'selectAddOns' && (
              <div className="mb-2 text-2xl font-semibold">Choose Add-Ons</div>
            )}
          </DialogTitle>
        </DialogHeader>
        <div className="h-full overflow-auto">
          {/* Menu Type Selection */}
          {currentStep === 'selectDiet' && (
            <div>
              <RadioGroup
                value={menuType}
                onValueChange={(value: 'veg' | 'nonVeg') => setMenuType(value)}
                className="flex w-full flex-col gap-4 md:flex-row"
              >
                <div className={'flex-1'}>
                  <div className="mb-4 flex w-full items-center justify-between">
                    <Label
                      htmlFor="veg"
                      className={'w-full cursor-pointer space-y-4'}
                    >
                      <div className="flex w-full items-center">
                        <RadioGroupItem value="veg" id="veg" />
                        <span className="ml-2">Veg</span>
                      </div>
                      <ul className="space-y-2 rounded-2xl bg-white/50 p-4">
                        {Object.keys(combo).map((key) =>
                          key === 'id' ||
                          key === 'name' ||
                          key === 'price' ||
                          combo[key as keyof typeof combo] === 0 ? null : (
                            <li
                              key={key}
                              className="flex items-center justify-between text-sm text-gray-600"
                            >
                              {(() => {
                                if (key === 'starter' || key === 'gravy') {
                                  return (
                                    <span>{'Veg ' + toTitleCase(key)}</span>
                                  );
                                }
                                return <span>{toTitleCase(key)}</span>;
                              })()}
                              <span>x{combo[key as keyof typeof combo]}</span>
                            </li>
                          ),
                        )}
                      </ul>
                    </Label>
                  </div>
                </div>
                <div className={'flex-1'}>
                  <div className="mb-4 flex w-full items-center justify-between">
                    <Label
                      htmlFor="nonVeg"
                      className={'w-full cursor-pointer space-y-4'}
                    >
                      <div className="flex w-full items-center">
                        <RadioGroupItem value="nonVeg" id="nonVeg" />
                        <span className="ml-2">Non-Veg</span>
                      </div>
                      <ul className="space-y-2 rounded-2xl bg-white/50 p-4">
                        {Object.keys(combo).map((key) =>
                          (combo.name === 'Combo 1' && key === 'dal') ||
                          key === 'id' ||
                          key === 'name' ||
                          key === 'price' ||
                          combo[key as keyof typeof combo] === 0 ? null : (
                            <li
                              key={key}
                              className="flex items-center justify-between text-sm text-gray-600"
                            >
                              {(() => {
                                if (key === 'starter' || key === 'gravy') {
                                  return (
                                    <span>{'Non-Veg ' + toTitleCase(key)}</span>
                                  );
                                }
                                return <span>{toTitleCase(key)}</span>;
                              })()}
                              <span>x{combo[key as keyof typeof combo]}</span>
                            </li>
                          ),
                        )}
                      </ul>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Menu Items Selection */}
          {currentStep === 'selectMenu' && (
            <div className={'overflow-y-auto'}>
              <div className="flex flex-col gap-4">
                {Object.keys(combo).map((key) =>
                  key === 'id' ||
                  key === 'name' ||
                  key === 'price' ||
                  key === 'papad' ||
                  key === 'salad' ||
                  key === 'chutney' ||
                  combo[key as keyof typeof combo] === 0 ? null : (
                    <div key={key}>
                      <div className="flex items-center justify-between">
                        <span>{toTitleCase(key)}</span>
                        <span>
                          {selections[key]?.length || 0} out of{' '}
                          {combo[key as keyof typeof combo]} selected
                        </span>
                      </div>
                      <div>
                        <ul className="space-y-2 rounded-2xl bg-white/50 p-4">
                          {filteredMenu[
                            toTitleCase(key) as keyof typeof filteredMenu
                          ] &&
                            filteredMenu[
                              toTitleCase(key) as keyof typeof filteredMenu
                            ].map((item) => (
                              <div
                                key={item.id}
                                className="flex cursor-pointer items-center justify-between p-1 text-sm text-gray-600"
                              >
                                <Label
                                  htmlFor={`${key}-${item.id}`}
                                  className="w-full cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {item.name}
                                </Label>
                                <Checkbox
                                  id={`${key}-${item.id}`}
                                  className="peer"
                                  checked={selections[key]?.includes(item.name)}
                                  onCheckedChange={() => {
                                    const maxSelections =
                                      combo[key as keyof typeof combo];
                                    if (typeof maxSelections === 'number') {
                                      handleSelection(
                                        key,
                                        item.name,
                                        maxSelections,
                                      );
                                    }
                                  }}
                                  disabled={
                                    selections[key]?.length ===
                                      combo[key as keyof typeof combo] &&
                                    !selections[key]?.includes(item.name)
                                  }
                                />
                              </div>
                            ))}
                        </ul>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          )}

          {/* Add-Ons Selection */}
          {currentStep === 'selectAddOns' && (
            <div className={'overflow-y-auto'}>
              <div className="flex flex-col gap-4">
                {Object.keys(menu).map((key) => (
                  <div key={key}>
                    <div className="flex items-center justify-between">
                      <span>{toTitleCase(key)}</span>
                    </div>
                    <div>
                      <ul className="space-y-2 rounded-2xl bg-white/50 p-4">
                        {menu[key].slice(0, 5).map((item) => (
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
                                  <img
                                    src="/veg.svg"
                                    alt="Veg"
                                    className="mr-2 h-4 w-4"
                                  />
                                ) : (
                                  <img
                                    src="/non-veg.svg"
                                    alt="Non-Veg"
                                    className="mr-2 h-4 w-4"
                                  />
                                )}
                                {item.name}
                              </span>
                              <span>{item.price}</span>
                            </Label>
                            <Checkbox
                              id={`addon-${key}-${item.id}`}
                              className="peer"
                              checked={selections[key]?.includes(item.name)}
                              onCheckedChange={() => {
                                handleSelection(key, item.name, Infinity, true);
                              }}
                            />
                          </div>
                        ))}
                        {showMore[key] &&
                          menu[key].slice(4).map((item) => (
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
                                    <img
                                      src="/veg.svg"
                                      alt="Veg"
                                      className="mr-2 h-4 w-4"
                                    />
                                  ) : (
                                    <img
                                      src="/non-veg.svg"
                                      alt="Non-Veg"
                                      className="mr-2 h-4 w-4"
                                    />
                                  )}
                                  {item.name}
                                </span>
                                <span>{item.price}</span>
                              </Label>
                              <Checkbox
                                id={`addon-${key}-${item.id}`}
                                className="peer"
                                checked={selections[key]?.includes(item.name)}
                                onCheckedChange={() => {
                                  handleSelection(key, item.name, Infinity);
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
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <DialogFooter>
          <div className="flex w-full items-center justify-between gap-6">
            <Button
              onClick={handleBack}
              className="w-[10%] bg-emerald-500 px-8 text-white hover:bg-emerald-600"
              disabled={currentStep === 'selectDiet'}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            {currentStep !== 'selectAddOns' ? (
              <Button
                onClick={handleNext}
                className="flex-grow bg-emerald-500 px-8 text-white hover:bg-emerald-600"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="flex-grow bg-emerald-500 px-8 text-white hover:bg-emerald-600"
              >
                Add to Cart
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
