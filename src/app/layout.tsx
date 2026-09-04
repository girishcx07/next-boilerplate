import '@/styles/globals.css';

import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import type { FC, PropsWithChildren } from 'react';

import { TooltipProvider } from '@/components/ui/tooltip';
import { AppConfig } from '@/constants/appConfig';
import { INTER, OPEN_SANS } from '@/lib/next-fonts';
import { cn } from '@/lib/utils';
import { NotificationProvider } from '@/providers/NotificationProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { TRPCReactProvider } from '@/trpc/client';

const fontClasses = cn(OPEN_SANS.variable, INTER.variable);

export const metadata: Metadata = {
  title: AppConfig.title,
  description: AppConfig.description,
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
};

const RootLayout: FC<PropsWithChildren> = async ({ children }) => {
  return (
    <html lang="en" className={cn(fontClasses, 'font-sans')} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <TRPCReactProvider>
          <ThemeProvider>
            <TooltipProvider>
              <NextTopLoader height={5} />
              <NotificationProvider>{children}</NotificationProvider>
            </TooltipProvider>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
};

export default RootLayout;

// export const runtime = 'edge';
