'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

import combo from '@/types/combo';
import { toTitleCase } from '@/utils/stringUtils';

interface FoodDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  combo: combo;
}

export function FoodDialog({ open, onOpenChange, combo }: FoodDialogProps) {
  const [menuType, setMenuType] = React.useState<'veg' | 'nonVeg'>('veg');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>
            <div className="mb-2 text-2xl font-semibold">Choose Menu Type</div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Menu Type Selection */}
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
                                return <span>{'Veg ' + toTitleCase(key)}</span>;
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
        </div>

        <div className="flex items-center justify-between gap-6">
          <Button className="w-[10%] bg-emerald-500 px-8 text-white hover:bg-emerald-600">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <Button className="flex-grow bg-emerald-500 px-8 text-white hover:bg-emerald-600">
            Next
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
