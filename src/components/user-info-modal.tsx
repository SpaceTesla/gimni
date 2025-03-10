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
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import * as React from 'react';
import { TimeInput } from '@/components/ui/time-input';
import { SimpleDatePicker } from '@/components/simple-date-picker';

interface UserInfoModalProps {
  onSubmit: (data: {
    name: string;
    phone: string;
    address: string;
    date: Date;
    time: string;
    numberOfPeople: number;
    occasion: string;
  }) => void;
}

export function UserInfoModal({ onSubmit }: UserInfoModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(10);
  const [occasion, setOccasion] = useState('');
  const [otherOccasion, setOtherOccasion] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      toast({
        title: 'Invalid Phone Number',
        description: 'Phone number must be a 10-digit number',
      });
      return;
    }
    if (!occasion) {
      toast({
        title: 'Invalid Occasion',
        description: 'Please select an occasion',
      });
      return;
    }
    if (occasion === 'Others' && !otherOccasion) {
      toast({
        title: 'Invalid Occasion',
        description: 'Please specify your occasion',
      });
      return;
    }
    const finalOccasion = occasion === 'Others' ? otherOccasion : occasion;

    const finalTime = time ? time : '04:00 PM';

    if (date) {
      onSubmit({
        name,
        phone,
        address,
        date,
        time: finalTime,
        numberOfPeople,
        occasion: finalOccasion,
      });
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
                Date of Event
              </Label>
              <div className="col-span-3">
                <SimpleDatePicker value={date} onChange={setDate} />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">
                Time of Delivery
              </Label>
              <TimeInput
                value={time}
                onChange={setTime}
                className="col-span-3"
              />
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
              <div className="col-span-3 bg-background">
                <Select value={occasion} onValueChange={setOccasion}>
                  <SelectTrigger id="occasion">
                    <SelectValue placeholder="Select an occasion" />
                  </SelectTrigger>
                  <SelectContent className={'bg-background'}>
                    <SelectItem value="Birthday">Birthday</SelectItem>
                    <SelectItem value="House warming">House warming</SelectItem>
                    <SelectItem value="Wedding Anniversary">
                      Wedding Anniversary
                    </SelectItem>
                    <SelectItem value="Naming ceremony">
                      Naming ceremony
                    </SelectItem>
                    <SelectItem value="House Party">House Party</SelectItem>
                    <SelectItem value="Baby Shower">Baby Shower</SelectItem>
                    <SelectItem value="Rice Ceremony">Rice Ceremony</SelectItem>
                    <SelectItem value="Mourning">Mourning</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
                {occasion === 'Others' && (
                  <Input
                    id="otherOccasion"
                    value={otherOccasion}
                    onChange={(e) => setOtherOccasion(e.target.value)}
                    className="mt-2"
                    placeholder="Please specify your occasion"
                  />
                )}
              </div>
            </div>{' '}
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
