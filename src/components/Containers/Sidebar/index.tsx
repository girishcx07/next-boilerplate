import type { ComponentProps, FC } from 'react';

import ThemeToggle from '@/components/Common/ThemeToggle';
import SidebarGroup from '@/components/Containers/Sidebar/SidebarGroup';
import Link from '@/components/Link';
import {
  Sidebar as SidebarPrimitive,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { AppConfig } from '@/constants/appConfig';

type SidebarProps = {
  groups: Array<ComponentProps<typeof SidebarGroup>>;
};

const SideBar: FC<SidebarProps> = ({ groups }) => (
  <SidebarPrimitive collapsible="icon">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            tooltip={AppConfig.title}
            render={<Link href="/" aria-label="Home" />}
          >
            <span className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              {AppConfig.title.charAt(0).toUpperCase()}
            </span>
            <span className="truncate font-heading font-medium">{AppConfig.title}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>

    <SidebarContent>
      {groups.map(({ groupName, items }) => (
        <SidebarGroup key={groupName} groupName={groupName} items={items} />
      ))}
    </SidebarContent>

    <SidebarFooter>
      <ThemeToggle />
    </SidebarFooter>
    <SidebarRail />
  </SidebarPrimitive>
);

export default SideBar;
