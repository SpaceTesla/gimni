'use client';

import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export default function OccasionDropdown() {
  const [occasion, setOccasion] = React.useState('');

  return (
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
            <SelectItem value="Naming ceremony">Naming ceremony</SelectItem>
            <SelectItem value="House Party">House Party</SelectItem>
            <SelectItem value="Baby Shower">Baby Shower</SelectItem>
            <SelectItem value="Rice Ceremony">Rice Ceremony</SelectItem>
            <SelectItem value="Mourning">Mourning</SelectItem>
            <SelectItem value="Others">Others</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
