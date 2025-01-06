import React from 'react';
import { useCart } from '@/context/cartContext';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { handleCheckout } from '@/utils/checkout';

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

  return (
    <Card className="sticky top-4 rounded-3xl border-none bg-white/70 shadow-none">
      <CardHeader>
        <CardTitle className="text-3xl font-black tracking-tight">
          CART
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/2">ITEM</TableHead>
              <TableHead className="text-red-500">QUANTITY</TableHead>
              <TableHead className="text-green-500">TOTAL</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartItems.length === 0 ? (
              <TableRow>
                <TableCell className="font-medium">No items yet</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
              </TableRow>
            ) : (
              cartItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="flex items-center font-medium">
                    <Image
                      src={
                        item.dietType === 'Veg' ? '/veg.svg' : '/non-veg.svg'
                      }
                      alt="Diet Type"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                    {item.category} - {item.comboName}
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>₹{item.totalPrice * item.quantity}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
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
