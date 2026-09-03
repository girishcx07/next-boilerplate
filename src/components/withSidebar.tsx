import type { FC } from 'react';

import Sidebar from '@/components/Containers/Sidebar';
import { useSiteNavigation } from '@/hooks/server';
import type { NavigationKeys, RichTranslationValues } from '@/types';

type WithSidebarProps = {
  navKeys: Array<NavigationKeys>;
  context?: Record<string, RichTranslationValues>;
};

const WithSidebar: FC<WithSidebarProps> = ({ navKeys, context }) => {
  const { getSideNavigation } = useSiteNavigation();
  const navigationEntries = getSideNavigation(navKeys, context);
  const topLevelItems = navigationEntries
    .filter(([, entry]) => entry.items.length === 0)
    .map(([, entry]) => entry);
  const mappedSidebarItems = navigationEntries
    .filter(([, entry]) => entry.items.length > 0)
    .map(([, { label, items }]) => ({
      groupName: label,
      items: items.map(([, item]) => item),
    }));

  if (topLevelItems.length > 0) {
    mappedSidebarItems.unshift({ groupName: 'Navigation', items: topLevelItems });
  }

  return <Sidebar groups={mappedSidebarItems} />;
};

export default WithSidebar;
