import type { Meta, StoryObj } from '@storybook/nextjs';
import { HomeIcon, InboxIcon, SearchIcon } from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';

const meta = {
  component: NavMain,
  decorators: [
    Story => (
      <SidebarProvider>
        <Sidebar collapsible="none">
          <Story />
        </Sidebar>
      </SidebarProvider>
    ),
  ],
} satisfies Meta<typeof NavMain>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { title: 'Home', url: '#home', icon: <HomeIcon /> },
      { title: 'Inbox', url: '#inbox', icon: <InboxIcon />, isActive: true },
      { title: 'Search', url: '#search', icon: <SearchIcon /> },
    ],
  },
};
