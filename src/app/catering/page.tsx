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
import ComboCard from '@/components/combo-card';

export default function FoodOrdering() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-4 pt-12">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Menu Section */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:col-span-3 lg:w-[70%] lg:gap-x-8">
            {combos.map((combo) => (
              <ComboCard key={combo.name} combo={combo} />
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
