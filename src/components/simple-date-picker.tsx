'use client';

import React, { useState, useEffect } from 'react';

interface SimpleDatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
}

export function SimpleDatePicker({ value, onChange }: SimpleDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value || new Date());

  useEffect(() => {
    if (value) {
      setCurrentMonth(new Date(value));
    }
  }, [value]);

  const formatDateIndian = (date: Date): string => {
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  const handleDateClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    day: number,
  ) => {
    event.preventDefault();
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    if (newDate >= new Date(new Date().setHours(0, 0, 0, 0))) {
      onChange(newDate);
      setIsOpen(false);
    }
  };

  const handleMonthChange = (increment: number) => {
    setCurrentMonth(
      (prevMonth) =>
        new Date(prevMonth.getFullYear(), prevMonth.getMonth() + increment, 1),
    );
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isDisabled = date < today;
      days.push(
        <button
          key={day}
          onClick={(event) => handleDateClick(event, day)}
          disabled={isDisabled}
          className={`m-1 p-2 ${
            isDisabled ? 'text-gray-400' : 'hover:bg-gray-200'
          } ${
            value &&
            value.getDate() === day &&
            value.getMonth() === month &&
            value.getFullYear() === year
              ? 'bg-blue-500 text-white'
              : ''
          }`}
          aria-label={`Select ${formatDateIndian(date)}`}
        >
          {day}
        </button>,
      );
    }
    return days;
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="rounded-md border px-4 py-2"
        onClick={handleToggle}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {value ? formatDateIndian(value) : 'Select a date'}
      </button>
      {isOpen && (
        <div className="absolute left-0 top-full z-10 mt-1 rounded-md border bg-white p-2 shadow-lg">
          <div className="mb-2 flex justify-between">
            <button
              type="button"
              onClick={() => handleMonthChange(-1)}
              aria-label="Previous month"
            >
              &lt;
            </button>
            <span>
              {currentMonth.toLocaleString('default', {
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <button
              type="button"
              onClick={() => handleMonthChange(1)}
              aria-label="Next month"
            >
              &gt;
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
              <div key={day} className="text-center font-bold">
                {day}
              </div>
            ))}
            {renderCalendar()}
          </div>
        </div>
      )}
      {isOpen && (
        <div className="absolute left-0 top-full z-10 mt-1 rounded-md border bg-white p-2 shadow-lg">
          <div className="mb-2 flex justify-between">
            <button
              onClick={() => handleMonthChange(-1)}
              aria-label="Previous month"
            >
              &lt;
            </button>
            <span>
              {currentMonth.toLocaleString('default', {
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <button
              onClick={() => handleMonthChange(1)}
              aria-label="Next month"
            >
              &gt;
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
              <div key={day} className="text-center font-bold">
                {day}
              </div>
            ))}
            {renderCalendar()}
          </div>
        </div>
      )}
    </div>
  );
}
