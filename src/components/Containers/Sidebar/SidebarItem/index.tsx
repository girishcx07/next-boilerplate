'use client';

import { ArrowUpRightIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import type { FC } from 'react';

import Link from '@/components/Link';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

type SidebarItemProps = {
  label: string;
  link: string;
};

const SidebarItem: FC<SidebarItemProps> = ({ label, link }) => {
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
        <span>{label}</span>
        {isExternal && <ArrowUpRightIcon aria-hidden="true" />}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default SidebarItem;
