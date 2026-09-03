import type { Meta as MetaObj, StoryObj } from '@storybook/nextjs';

import NavBar from '@/components/Containers/NavBar';

type Story = StoryObj<typeof NavBar>;
type Meta = MetaObj<typeof NavBar>;

export const Default: Story = {
  args: {
    navItems: [
      {
        text: 'Home',
        link: '/',
      },
      {
        text: 'Dashboard',
        link: '/dashboard',
      },
      {
        text: 'About',
        link: '/about',
      },
    ],
  },
};

export default { component: NavBar } as Meta;
