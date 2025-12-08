'use client';

import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Button } from './button';
import { Calendar } from './calendar';

interface DatePickerProps {
  disabled?: boolean;
  name?: string;
  value?: Date;
  onBlur?: () => void;
  onChange: (value: Date | undefined) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, disabled, name, onBlur }) => {
  const [open, setOpen] = useState(false);

  const onOpenChange = (open: boolean) => {
    if (!open) onBlur?.();
    setOpen(open);
  };

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          name={name}
          role="combobox"
          className="w-48 justify-between font-normal"
          disabled={disabled}
          aria-expanded={open}
          aria-disabled={disabled}
        >
          {value ? value.toLocaleDateString() : 'Select date'}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          captionLayout="dropdown"
          onSelect={(date) => {
            onChange(date);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
DatePicker.displayName = 'DatePicker';
