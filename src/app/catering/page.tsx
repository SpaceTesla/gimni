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

import combos from '@/data/combos';
import RadioDemo from '@/components/options';

export default function FoodOrdering() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-4 pt-12">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Menu Section */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:col-span-3 lg:w-[70%] lg:gap-x-8">
            {combos.map((combo) => (
              <Card
                key={combo.name}
                className="rounded-3xl border-none bg-white p-0 shadow-none"
              >
                <CardHeader className={'p-2'}>
                  <CardTitle className="text-center text-3xl font-black">
                    {combo.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className={'p-0'}>
                  <div className="flex flex-col justify-between">
                    <Image
                      src={combo.image}
                      alt={combo.name}
                      width={200}
                      height={200}
                      className="max-h-[240px] w-[100%] object-cover"
                    />
                    <div className="p-4">
                      <div className="flex flex-col">
                        <div className={'flex gap-2 text-primary/70'}>
                          <span className="text-lg">Price:</span>
                          <span className="text-lg font-bold">
                            {'₹ ' + combo.price}
                          </span>
                          <span className="text-lg">/ plate</span>
                        </div>
                      </div>
                      <div className={'text-lg font-black'}>CUSTOMIZATION-</div>
                      <div>
                        <RadioDemo combo={combo} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* Cart Section */}
          <div className="flex-grow">
            <Card className="sticky top-4 rounded-3xl bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl font-black tracking-tight">
                  CART -
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ITEM</TableHead>
                      <TableHead className="text-red-500">QUANTITY</TableHead>
                      <TableHead className="text-green-500">TOTAL</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        No items yet
                      </TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>-</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div className="mt-6 space-y-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>$0.00</span>
                  </div>
                  <Button className="h-12 w-full bg-red-500 text-white hover:bg-red-600">
                    Checkout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
