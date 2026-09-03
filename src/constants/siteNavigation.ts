import { HomeIcon, InfoIcon, LayoutDashboardIcon } from 'lucide-react';

import type { SiteNavigation } from '@/types';

export const siteNavigation: SiteNavigation = {
  topNavigation: {
    dashboard: {
      icon: LayoutDashboardIcon,
      label: 'dashboard',
      link: '/dashboard',
    },
    about: {
      icon: InfoIcon,
      label: 'about',
      link: '/about',
    },
    home: {
      icon: HomeIcon,
      label: 'home',
      link: '/',
    },
  },
  sideNavigation: {
    home: {
      icon: HomeIcon,
      label: 'home',
      link: '/',
    },
    dashboard: {
      icon: LayoutDashboardIcon,
      label: 'dashboard',
      link: '/dashboard',
    },
    about: {
      icon: InfoIcon,
      label: 'about',
      link: '/about',
    },
  },
};
