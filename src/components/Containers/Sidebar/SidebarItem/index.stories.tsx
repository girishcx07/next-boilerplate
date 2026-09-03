import type { Meta as MetaObj, StoryObj } from '@storybook/nextjs';

import SidebarItem from '@/components/Containers/Sidebar/SidebarItem';
import { SidebarProvider } from '@/components/ui/sidebar';

type Story = StoryObj<typeof SidebarItem>;
type Meta = MetaObj<typeof SidebarItem>;

export const Default: Story = {
  args: {
    label: 'Example Item',
    link: '/example',
  },
};

export default {
  component: SidebarItem,
  decorators: [
    Story => (
      <SidebarProvider>
        <Story />
      </SidebarProvider>
    ),
  ],
} as Meta;
