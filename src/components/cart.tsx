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
import { X } from 'lucide-react';

const Cart: React.FC = () => {
  const { cartItems, removeItem } = useCart();

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
              <TableHead>ITEM</TableHead>
              <TableHead className="text-red-500">QUANTITY</TableHead>
              <TableHead className="text-green-500">TOTAL</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartItems.length === 0 ? (
              <TableRow>
                <TableCell className="font-medium">No items yet</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell></TableCell>
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
                  <TableCell>₹{item.totalPrice}</TableCell>
                  <TableCell>
                    <Button
                      variant="link"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <X />
                    </Button>
                  </TableCell>
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
          <Button className="h-12 w-full bg-red-500 text-white hover:bg-red-600">
            Checkout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Cart;
