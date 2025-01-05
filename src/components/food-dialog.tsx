'use client';

import * as React from 'react';
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
import getMenu from '@/services/menuService';

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
  };
  const handleBack = () => {
    if (currentStep === 'selectMenu') setCurrentStep('selectDiet');
    else if (currentStep === 'selectAddOns') setCurrentStep('selectMenu');
  };

  function filterMenuItems(
    menu: Record<string, MenuItem[]>,
    selectedCategory: 'Bengali' | 'Non-Bengali' | 'Birthday Snack-Up' | 'Other',
    selectedDiet: 'Veg' | 'Non-Veg',
  ): Record<string, MenuItem[]> {
    const filteredMenu: Record<string, MenuItem[]> = {};

    Object.keys(menu).forEach((key) => {
      filteredMenu[key] = menu[key].filter(
        (item) =>
          item.category === selectedCategory && item.diet === selectedDiet,
      );
    });

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
                  combo[key as keyof typeof combo] === 0 ? null : (
                    <div key={key}>
                      <div className="flex items-center justify-between">
                        <span>{toTitleCase(key)}</span>
                        <span>
                          Select any ({combo[key as keyof typeof combo]})
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
                                className="flex items-center justify-between text-sm text-gray-600"
                              >
                                <span>{item.name}</span>
                                <span>{item.price}</span>
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
              <Button className="flex-grow bg-emerald-500 px-8 text-white hover:bg-emerald-600">
                Add to Cart
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
