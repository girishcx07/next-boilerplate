'use client';

import type { FC, PropsWithChildren } from 'react';

import { NotificationProvider } from '@/providers/NotificationProvider';

type BaseLayoutProps = PropsWithChildren;
const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return (
    <NotificationProvider>
      <div className="grid size-full grid-cols-[1fr] grid-rows-[1fr]">{children}</div>
    </NotificationProvider>
  );
};

export default BaseLayout;
