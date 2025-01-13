'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { DatePickerDemo } from '@/components/date-picker-demo';

interface UserInfoModalProps {
  onSubmit: (data: {
    name: string;
    phone: string;
    address: string;
    date: Date;
    numberOfPeople: number;
    occasion: string;
  }) => void;
}

export function UserInfoModal({ onSubmit }: UserInfoModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [numberOfPeople, setNumberOfPeople] = useState(10);
  const [occasion, setOccasion] = useState('');
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (date) {
      onSubmit({ name, phone, address, date, numberOfPeople, occasion });
    }
  };

  const handleClose = () => {
    router.push('/');
  };

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Enter Your Information</DialogTitle>
          <DialogDescription>
            Please provide your details to access the website.
          </DialogDescription>
          <Button
            onClick={handleClose}
            variant={'ghost'}
            className="absolute right-2 top-2"
          >
            <X />
          </Button>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                placeholder={'Your full name'}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="col-span-3"
                placeholder={'Valid 10 digit phone number'}
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <div className="col-span-3">
                <DatePickerDemo date={date} setDate={setDate} />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="numberOfPeople" className="text-right">
                Number of People
              </Label>
              <Input
                id="numberOfPeople"
                type="number"
                value={numberOfPeople}
                onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
                className="col-span-3"
                placeholder={'Minimum 10'}
                required
                min={10}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="occasion" className="text-right">
                Occasion
              </Label>
              <Input
                id="occasion"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="col-span-3"
                placeholder={'Eg. Wedding, Birthday, etc.'}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Address
            </Label>
            <Textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={'Optional'}
              className="col-span-3"
            />
          </div>
          <DialogFooter className={'mt-4'}>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
