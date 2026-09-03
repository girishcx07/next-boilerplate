'use client';

import { useRouter } from 'next/navigation';
import type { ComponentProps, FC } from 'react';

import Select from '@/components/Common/Select';

type WithSidebarSelectProps = Pick<
  ComponentProps<typeof Select>,
  'values' | 'defaultValue' | 'label' | 'className'
>;

const WithRouterSelect: FC<WithSidebarSelectProps> = ({
  values,
  label,
  defaultValue,
  className,
}) => {
  const { push } = useRouter();

  return (
    <Select
      inline
      label={label}
      values={values}
      defaultValue={defaultValue}
      className={className}
      onChange={value => push(value)}
    />
  );
};

export default WithRouterSelect;
