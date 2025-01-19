'use client';

import React, { useState, useEffect } from 'react';
import { useCart, CartItem } from '@/context/cartContext';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { handleCheckout } from '@/utils/checkout';
import { Edit, Trash } from 'lucide-react';
import { FoodDialog } from '@/components/food-dialog';
import { AddOnsOnlyFoodDialog } from '@/components/addons-only-food-dialog';

import Combo from '@/types/combo';
import type MenuItem from '@/types/menu';
import combo from '@/types/combo';
import { useCheckout } from '@/hooks/useCheckout';

interface CartProps {
  userInfo: {
    name: string;
    phone: string;
    address: string;
    numberOfPeople: number;
    occasion: string;
    date: Date;
    time: string;
  };
  dialogInfo: {
    combos: Combo[];
    menu: Record<string, MenuItem[]>;
    pax: Record<string, number[]>;
    numberOfPeople: number;
  };
}

const Cart: React.FC<CartProps> = ({ userInfo, dialogInfo }) => {
  const { cartItems } = useCart();
  const [open, setOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<CartItem | null>(null);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.totalPrice * item.quantity,
    0,
  );

  const handleEdit = (item: CartItem) => {
    setCurrentItem(item);
    setOpen(true);
  };

  const resetDialogStates = () => {
    console.log('Current Item:', currentItem);
    setCurrentItem(null);
    setOpen(false);
  };

  const { removeItem } = useCart();
  const handleDelete = (item: CartItem) => {
    removeItem(item.id);
    console.log('Deleted item:', item);
  };

  const { handleCheckout } = useCheckout();

  console.log('Cart Items:', cartItems);
  console.log('Dialog Info:', dialogInfo);
  console.log('User Info:', userInfo);

  return (
    <Card className="sticky top-4 rounded-3xl border-none bg-white/70 shadow-none">
      <CardHeader>
        <CardTitle className="text-3xl font-black tracking-tight">
          CART
          <span className={'pl-2 text-sm font-normal'}>
            (estimate only contact for actuals)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {cartItems.length === 0 ? (
          <div className="font-medium">No items yet</div>
        ) : (
          cartItems.map((item, index) => {
            const addOns = Object.values(item.addOns).flat();
            const selections = Object.values(item.selections).flat();
            return (
              <div key={index} className="mb-4 border-b p-4 pr-6 pt-0">
                <div className="mb-2 flex items-center font-medium">
                  <Image
                    src={item.dietType === 'Veg' ? '/veg.svg' : '/non-veg.svg'}
                    alt="Diet Type"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  <span className={'text-xl font-semibold'}>
                    {item.category} - {item.comboName}
                  </span>
                  <div className={'ml-auto flex'}>
                    <Button
                      variant={'ghost'}
                      onClick={() => handleEdit(item)}
                      className="rounded-full"
                    >
                      <Edit className="h-5 w-5 text-yellow-highlight" />
                    </Button>
                    <Button
                      variant={'ghost'}
                      onClick={() => handleDelete(item)}
                      className="rounded-full"
                    >
                      <Trash className="h-5 w-5 text-red-highlight" />
                    </Button>
                  </div>
                </div>
                <div className={'flex p-2'}>
                  <span className=""> Quantity: {item.quantity}</span>
                  {userInfo.numberOfPeople < 300 && (
                    <span className={'ml-auto'}>
                      Price: ₹ {item.totalPrice}
                    </span>
                  )}
                </div>
                {selections.length > 0 && (
                  <>
                    <div className={'mb-1 ml-2'}>Selections</div>
                    <div className="flex flex-col gap-0.5 rounded-lg bg-white px-4 py-2">
                      {selections.map((selection, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between text-sm text-zinc-700"
                        >
                          <span>{selection}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {addOns.length > 0 ? (
                  <>
                    <div className={'mb-1 ml-2 mt-4'}>Add-Ons</div>
                    <div className="flex flex-col gap-0.5 rounded-lg bg-white px-4 py-2">
                      {addOns.map((addOn, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span>{addOn}</span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between pl-4 text-sm">
                    <span>No add-ons selected</span>
                  </div>
                )}
              </div>
            );
          })
        )}
        <div className="mt-6 space-y-4">
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            {userInfo.numberOfPeople < 300 ? (
              <span>₹{totalAmount.toFixed(2)}</span>
            ) : (
              <span>Contact us for the price</span>
            )}
          </div>
          <Button
            onClick={async () => {
              await handleCheckout(userInfo, cartItems);

              // Ensure the phone number is in the correct format
              const phoneNumber = '+917483139254';
              const whatsappLink = `https://wa.me/${phoneNumber}?text=Hi!%20I%20am%20interested%20to%20place%20an%20order.`;

              // Check if window is available
              if (typeof window !== 'undefined') {
                window.open(whatsappLink, '_blank');
                setTimeout(() => {
                  window.location.reload(); // Refresh the page after 2 seconds
                }, 2000);
              } else {
                console.error('Window object is not available.');
              }
            }}
            className="h-12 w-full bg-red-500 text-white hover:bg-red-600"
            disabled={cartItems.length === 0}
          >
            {userInfo.numberOfPeople >= 300 ? 'Get a Quote' : 'Checkout'}
          </Button>
        </div>
      </CardContent>
      {currentItem &&
        (currentItem.id === 'add-ons-only' ? (
          <AddOnsOnlyFoodDialog
            combo={dialogInfo.combos.find(
              (combo) => combo.name === currentItem.comboName,
            )}
            menu={dialogInfo.menu}
            open={open}
            onOpenChange={(isOpen) => {
              setOpen(isOpen);
              if (!isOpen) resetDialogStates();
            }}
            category={
              currentItem.category as 'Meal' | 'Birthday Snack-Up' | 'Other'
            }
            numberOfPeople={dialogInfo.numberOfPeople}
          />
        ) : (
          <FoodDialog
            combo={dialogInfo.combos.find(
              (combo) => combo.name === currentItem.comboName,
            )}
            menu={dialogInfo.menu}
            open={open}
            onOpenChange={(isOpen) => {
              setOpen(isOpen);
              if (!isOpen) resetDialogStates();
            }}
            category={
              currentItem.category as 'Meal' | 'Birthday Snack-Up' | 'Other'
            }
            pax={dialogInfo.pax}
            numberOfPeople={dialogInfo.numberOfPeople}
          />
        ))}
    </Card>
  );
};

export default Cart;
