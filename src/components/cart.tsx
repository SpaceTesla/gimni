import React from 'react';
import { useCart, CartItem } from '@/context/cartContext';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { handleCheckout } from '@/utils/checkout';
import { Edit, Trash } from 'lucide-react';

interface CartProps {
  userInfo: {
    name: string;
    phone: string;
    address: string;
  };
}

const Cart: React.FC<CartProps> = ({ userInfo }) => {
  const { cartItems } = useCart();

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.totalPrice * item.quantity,
    0,
  );

  // const handleEdit = (item: CartItem) => {
  //   // Implement the edit functionality here
  //   console.log('Edit item:', item);
  // };

  const { removeItem } = useCart();
  const handleDelete = (item: CartItem) => {
    removeItem(item.id);
    console.log('Deleted item:', item);
  };

  return (
    <Card className="sticky top-4 rounded-3xl border-none bg-white/70 shadow-none">
      <CardHeader>
        <CardTitle className="text-3xl font-black tracking-tight">
          CART
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
              <div key={index} className="mb-4 border-b p-4 pt-0">
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
                  <div className={'ml-auto'}>
                    {/*  <Button*/}
                    {/*    variant={'ghost'}*/}
                    {/*    onClick={() => handleEdit(item)}*/}
                    {/*    className="rounded-full"*/}
                    {/*  >*/}
                    {/*    <Edit className="h-5 w-5 text-yellow-highlight" />*/}
                    {/*  </Button>*/}
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
                  <span className={'ml-auto'}>Price: ₹ {item.totalPrice}</span>
                </div>
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

                <div className={'mb-1 ml-2 mt-4'}>Add-Ons</div>
                {addOns.length > 0 ? (
                  <div className="flex flex-col gap-0.5 rounded-lg bg-white px-4 py-2">
                    {addOns.map((addOn, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span>{addOn}</span>
                      </div>
                    ))}
                  </div>
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
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
          <Button
            onClick={() => handleCheckout(userInfo, cartItems)}
            className="h-12 w-full bg-red-500 text-white hover:bg-red-600"
          >
            Checkout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Cart;
