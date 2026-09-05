import type { Meta, StoryObj } from '@storybook/nextjs';

import { TeamSwitcher } from '@/components/team-switcher';
import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';

const meta = {
  component: TeamSwitcher,
  decorators: [
    Story => (
      <SidebarProvider>
        <Sidebar collapsible="none">
          <Story />
        </Sidebar>
      </SidebarProvider>
    ),
  ],
} satisfies Meta<typeof TeamSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MultipleTeams: Story = {
  args: {
    teams: [
      { name: 'Acme Inc.', logo: 'A', plan: 'Enterprise' },
      { name: 'Startup Co.', logo: 'S', plan: 'Pro' },
    ],
  },
};

export const Empty: Story = {
  args: { teams: [] },
};
