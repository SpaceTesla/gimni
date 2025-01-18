'use client';

import React, { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface TimeInputProps {
  onChange?: (time: string) => void;
  value?: string;
  className?: string;
}

export function TimeInput({
  className,
  onChange,
  value,
  ...props
}: TimeInputProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'value'>) {
  const [hours, setHours] = useState('12');
  const [minutes, setMinutes] = useState('00');
  const [period, setPeriod] = useState('AM');

  useEffect(() => {
    if (value) {
      const [time, meridiem] = value.split(' ');
      const [h, m] = time.split(':');
      const hour = parseInt(h);
      setHours(
        hour === 0
          ? '12'
          : String(hour > 12 ? hour - 12 : hour).padStart(2, '0'),
      );
      setMinutes(m);
      setPeriod(hour >= 12 ? 'PM' : 'AM');
    }
  }, [value]);

  const handleChange = (
    newHours: string,
    newMinutes: string,
    newPeriod: string,
  ) => {
    const h =
      newPeriod === 'PM' && newHours !== '12'
        ? String(parseInt(newHours) + 12).padStart(2, '0')
        : newHours === '12' && newPeriod === 'AM'
          ? '00'
          : newHours.padStart(2, '0');
    const displayHours =
      h === '00' ? '12' : String(parseInt(h) % 12 || 12).padStart(2, '0');
    onChange?.(`${displayHours}:${newMinutes} ${newPeriod}`);
  };

  const handleHourChange = (newHour: string) => {
    setHours(newHour);
    handleChange(newHour, minutes, period);
  };

  const handleMinuteChange = (newMinute: string) => {
    setMinutes(newMinute);
    handleChange(hours, newMinute, period);
  };

  const handlePeriodChange = (newPeriod: string) => {
    setPeriod(newPeriod);
    handleChange(hours, minutes, newPeriod);
  };

  return (
    <div className={cn('flex space-x-2', className)} {...props}>
      <Select value={hours} onValueChange={handleHourChange}>
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder="Hour" />
        </SelectTrigger>
        <SelectContent className="max-h-[200px] overflow-y-auto">
          {Array.from({ length: 12 }, (_, i) =>
            (i + 1).toString().padStart(2, '0'),
          ).map((hour) => (
            <SelectItem key={hour} value={hour}>
              {hour}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span className="flex items-center">:</span>
      <Select value={minutes} onValueChange={handleMinuteChange}>
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder="Minute" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="00">00</SelectItem>
          <SelectItem value="30">30</SelectItem>
        </SelectContent>
      </Select>
      <Select value={period} onValueChange={handlePeriodChange}>
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder="AM/PM" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="AM">AM</SelectItem>
          <SelectItem value="PM">PM</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
