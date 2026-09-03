'use client';

import type { ReactNode } from 'react';
import { useId, useMemo } from 'react';

import {
  Select as SelectRoot,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue as SelectValueDisplay,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

type SelectValue = {
  label: string;
  value: string;
  iconImage?: ReactNode;
  disabled?: boolean;
};

type SelectOptionGroup = {
  label?: string;
  items: Array<SelectValue>;
};

const isStringArray = (values: Array<unknown>): values is Array<string> =>
  Boolean(values[0] && typeof values[0] === 'string');

const isValuesArray = (values: Array<unknown>): values is Array<SelectValue> =>
  Boolean(values[0] && typeof values[0] === 'object' && 'value' in values[0]);

type SelectProps = {
  values: Array<SelectOptionGroup> | Array<SelectValue> | Array<string>;
  defaultValue?: string;
  placeholder?: string;
  label?: string;
  inline?: boolean;
  onChange?: (value: string) => void;
  className?: string;
  ariaLabel?: string;
};

const Select = ({
  values = [],
  defaultValue,
  placeholder,
  label,
  inline,
  onChange,
  className,
  ariaLabel,
}: SelectProps) => {
  const id = useId();

  const mappedValues = useMemo(() => {
    let mappedLocalValues = values;

    if (isStringArray(mappedLocalValues)) {
      mappedLocalValues = mappedLocalValues.map(value => ({ label: value, value }));
    }

    if (isValuesArray(mappedLocalValues)) {
      return [{ items: mappedLocalValues }];
    }

    return mappedLocalValues;
  }, [values]);

  return (
    <span className={cn('inline-flex flex-col gap-1.5', className)}>
      {label && (
        <label className="block w-full text-sm font-medium text-foreground" htmlFor={id}>
          {label}
        </label>
      )}

      <SelectRoot
        defaultValue={defaultValue}
        onValueChange={value => value !== null && onChange?.(value)}
      >
        <SelectTrigger
          className={cn('h-11 min-w-68', inline && 'h-auto min-w-fit')}
          aria-label={ariaLabel}
          id={id}
        >
          <SelectValueDisplay placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent
          alignItemWithTrigger={!inline}
          align={inline ? 'start' : 'center'}
          className="max-h-48"
        >
          {mappedValues.map(({ label: groupLabel, items }, key) => (
            <SelectGroup key={groupLabel?.toString() ?? key}>
              {groupLabel && <SelectLabel>{groupLabel}</SelectLabel>}

              {items.map(({ value, label: itemLabel, iconImage, disabled }) => (
                <SelectItem key={value} value={value} disabled={disabled}>
                  {iconImage}
                  <span className="truncate">{itemLabel}</span>
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </SelectRoot>
    </span>
  );
};

export default Select;
