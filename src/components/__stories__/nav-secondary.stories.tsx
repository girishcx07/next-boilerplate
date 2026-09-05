import type { Meta, StoryObj } from '@storybook/nextjs';
import { HelpCircleIcon, SettingsIcon } from 'lucide-react';

import { NavSecondary } from '@/components/nav-secondary';
import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';

const meta = {
  component: NavSecondary,
  decorators: [
    Story => (
      <SidebarProvider>
        <Sidebar collapsible="none">
          <Story />
        </Sidebar>
      </SidebarProvider>
    ),
  ],
} satisfies Meta<typeof NavSecondary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithBadges: Story = {
  args: {
    items: [
      { title: 'Settings', url: '#settings', icon: <SettingsIcon /> },
      { title: 'Help', url: '#help', icon: <HelpCircleIcon />, badge: '3' },
    ],
  },
};
