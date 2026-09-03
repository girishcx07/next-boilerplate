'use client';

import type { FC } from 'react';

import NavBar from '@/components/Containers/NavBar';
import { useSiteNavigation } from '@/hooks';

const WithNavBar: FC = () => {
  const { navigationItems } = useSiteNavigation();
  return (
    <div>
      <NavBar
        navItems={navigationItems.map(([, { label, link, target }]) => ({
          link,
          text: label,
          target,
        }))}
      />
    </div>
  );
};

export default WithNavBar;
