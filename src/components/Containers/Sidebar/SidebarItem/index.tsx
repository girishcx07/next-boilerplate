'use client';

import { ArrowUpRightIcon, CircleIcon, type LucideIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import type { FC } from 'react';

import Link from '@/components/Link';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

type SidebarItemProps = {
  icon?: LucideIcon;
  label: string;
  link: string;
};

const SidebarItem: FC<SidebarItemProps> = ({ icon: Icon = CircleIcon, label, link }) => {
  const pathname = usePathname();
  const isExternal = link.startsWith('http');
  const isActive =
    !isExternal && (pathname === link || (link !== '/' && pathname.startsWith(`${link}/`)));

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={isActive}
        tooltip={label}
        render={
          <Link
            href={link}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noreferrer' : undefined}
          />
        }
      >
        <Icon aria-hidden="true" />
        <span>{label}</span>
        {isExternal && <ArrowUpRightIcon aria-hidden="true" />}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default SidebarItem;
