import type { ComponentProps, FC } from 'react';

import SidebarItem from '@/components/Containers/Sidebar/SidebarItem';
import {
  SidebarGroup as SidebarGroupPrimitive,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/components/ui/sidebar';

type SidebarGroupProps = {
  groupName: string;
  items: Array<ComponentProps<typeof SidebarItem>>;
};

const SidebarGroup: FC<SidebarGroupProps> = ({ groupName, items }) => (
  <SidebarGroupPrimitive>
    <SidebarGroupLabel>{groupName}</SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>
        {items.map(({ icon, label, link }) => (
          <SidebarItem key={link} icon={icon} label={label} link={link} />
        ))}
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroupPrimitive>
);

export default SidebarGroup;
