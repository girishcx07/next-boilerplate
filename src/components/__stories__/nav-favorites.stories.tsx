import type { Meta, StoryObj } from '@storybook/nextjs';

import { NavFavorites } from '@/components/nav-favorites';
import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';

const meta = {
  component: NavFavorites,
  decorators: [
    Story => (
      <SidebarProvider>
        <Sidebar collapsible="none">
          <Story />
        </Sidebar>
      </SidebarProvider>
    ),
  ],
} satisfies Meta<typeof NavFavorites>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    favorites: [
      { name: 'Project plan', url: '#project-plan', emoji: '📌' },
      { name: 'Design system', url: '#design-system', emoji: '🎨' },
    ],
  },
};
