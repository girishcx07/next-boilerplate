'use client';

import type { Dispatch, FC, PropsWithChildren, ReactNode, SetStateAction } from 'react';
import { createContext, useCallback, useRef } from 'react';

import { toast, Toaster } from '@/components/ui/toast';

type NotificationContextType = {
  message: string | ReactNode;
  duration: number;
} | null;

export const NotificationDispatch = createContext<
  Dispatch<SetStateAction<NotificationContextType>>
>(() => {});

export const NotificationProvider: FC<PropsWithChildren> = ({ children }) => {
  const currentNotification = useRef<NotificationContextType>(null);
  const dispatch = useCallback<Dispatch<SetStateAction<NotificationContextType>>>(value => {
    const notification = typeof value === 'function' ? value(currentNotification.current) : value;

    currentNotification.current = notification;

    if (!notification) {
      toast.close();
      return;
    }

    toast.add({
      title: notification.message,
      timeout: notification.duration,
    });
  }, []);

  return (
    <NotificationDispatch.Provider value={dispatch}>
      {children}
      <Toaster />
    </NotificationDispatch.Provider>
  );
};
