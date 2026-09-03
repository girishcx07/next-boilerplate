import '../src/styles/globals.css';

import type { Preview } from '@storybook/nextjs';

import { TooltipProvider } from '@/components/ui/tooltip';
import { INTER, OPEN_SANS } from '@/lib/next-fonts';
import { NotificationProvider } from '@/providers/NotificationProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';

if (typeof document !== 'undefined') {
  document.documentElement.classList.add(INTER.variable, OPEN_SANS.variable, 'font-sans');
}

const preview: Preview = {
  parameters: {
    nextjs: { router: { basePath: '' }, appDirectory: true },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    Story => (
      <ThemeProvider>
        <TooltipProvider>
          <NotificationProvider>
            <Story />
          </NotificationProvider>
        </TooltipProvider>
      </ThemeProvider>
    ),
  ],
};

export default preview;
