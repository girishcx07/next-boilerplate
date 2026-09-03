'use client';

import { MenuIcon, XIcon } from 'lucide-react';
import type { FC, HTMLAttributeAnchorTarget } from 'react';
import { useState } from 'react';

import ThemeToggle from '@/components/Common/ThemeToggle';
import NavItem from '@/components/Containers/NavBar/NavItem';
import Link from '@/components/Link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navInteractionIcons = {
  show: <MenuIcon aria-hidden="true" />,
  close: <XIcon aria-hidden="true" />,
};

type NavbarProps = {
  navItems: Array<{
    text: string;
    link: string;
    target?: HTMLAttributeAnchorTarget | undefined;
  }>;
};

const NavBar: FC<NavbarProps> = ({ navItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="border-border bg-background lg:flex lg:h-16 lg:flex-row lg:items-center lg:gap-8 lg:border-b lg:px-8">
      <div className="flex h-16 shrink-0 items-center border-b border-border px-4 lg:h-full lg:border-0 lg:px-0">
        <Link className="h-7.5 flex-1 text-2xl" href="/" aria-label="Home">
          My Logo
        </Link>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setIsMenuOpen(prev => !prev)}
          className="lg:hidden"
          aria-controls="primary-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          <span data-icon="inline-start">{navInteractionIcons[isMenuOpen ? 'close' : 'show']}</span>
        </Button>
      </div>

      <div
        id="primary-navigation"
        className={cn(
          'hidden flex-1 flex-col lg:flex lg:flex-row lg:items-center',
          isMenuOpen && 'flex'
        )}
      >
        <div className="flex flex-col gap-1 border-b border-border p-4 lg:flex-1 lg:flex-row lg:border-0 lg:p-0">
          {navItems.map(({ text, link, target }) => (
            <NavItem key={link} href={link} target={target}>
              {text}
            </NavItem>
          ))}
        </div>

        <div className="flex items-center gap-2 border-b border-border p-4 lg:border-0 lg:p-0">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
