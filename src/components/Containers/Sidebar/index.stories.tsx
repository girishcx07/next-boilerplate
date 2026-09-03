import type { Meta as MetaObj, StoryObj } from '@storybook/nextjs';

import Sidebar from '@/components/Containers/Sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

type Story = StoryObj<typeof Sidebar>;
type Meta = MetaObj<typeof Sidebar>;

export const Default: Story = {
  args: {
    groups: [
      {
        groupName: 'About Node.js',
        items: [
          {
            link: '/item1',
            label: 'About Node.js',
          },
          {
            link: '/item2',
            label: 'Project Governance',
          },
          {
            link: '/item3',
            label: 'Releases',
          },
          {
            link: '/item4',
            label: 'Branding',
          },
          {
            link: '/item5',
            label: 'Privacy Policy',
          },
          {
            link: '/item6',
            label: 'Security Reporting',
          },
        ],
      },
      {
        groupName: 'Get Involved',
        items: [
          {
            link: '/item7',
            label: 'Get Involved',
          },
          {
            link: '/item8',
            label: 'Collab Summit',
          },
          {
            link: '/item9',
            label: 'Contribute',
          },
          {
            link: '/item10',
            label: 'Code of Conduct',
          },
        ],
      },
      {
        groupName: 'Download',
        items: [
          {
            link: '/item11',
            label: 'Download',
          },
          {
            link: '/item12',
            label: 'Package Manager',
          },
          {
            link: '/item13',
            label: 'Node.js Releases',
          },
        ],
      },
    ],
  },
};

export default {
  component: Sidebar,
  decorators: [
    Story => (
      <SidebarProvider>
        <Story />
        <SidebarInset>
          <header className="flex h-14 items-center gap-2 border-b px-4">
            <SidebarTrigger />
            <span className="text-sm font-medium">Sidebar preview</span>
          </header>
        </SidebarInset>
      </SidebarProvider>
    ),
  ],
} as Meta;
