import type { Meta, StoryObj } from '@storybook/nextjs';

import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

const meta = {
  component: AppSidebar,
  decorators: [
    Story => (
      <SidebarProvider>
        <Story />
        <SidebarInset>
          <header className="flex h-14 items-center border-b px-3">
            <SidebarTrigger />
          </header>
        </SidebarInset>
      </SidebarProvider>
    ),
  ],
} satisfies Meta<typeof AppSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
