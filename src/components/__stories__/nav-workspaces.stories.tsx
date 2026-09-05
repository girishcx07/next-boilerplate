import type { Meta, StoryObj } from '@storybook/nextjs';

import { NavWorkspaces } from '@/components/nav-workspaces';
import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';

const meta = {
  component: NavWorkspaces,
  decorators: [
    Story => (
      <SidebarProvider>
        <Sidebar collapsible="none">
          <Story />
        </Sidebar>
      </SidebarProvider>
    ),
  ],
} satisfies Meta<typeof NavWorkspaces>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithNestedPages: Story = {
  args: {
    workspaces: [
      {
        name: 'Engineering',
        emoji: '🛠️',
        pages: [
          { name: 'Roadmap', emoji: '🗺️' },
          { name: 'Backlog', emoji: '📋' },
        ],
      },
      {
        name: 'Design',
        emoji: '🎨',
        pages: [{ name: 'Components', emoji: '🧩' }],
      },
    ],
  },
};
