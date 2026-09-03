import '../src/styles/globals.css';

import type { Preview } from '@storybook/nextjs';

import { TooltipProvider } from '@/components/ui/tooltip';
import { NotificationProvider } from '@/providers/NotificationProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';

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
