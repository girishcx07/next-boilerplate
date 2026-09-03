import { ArrowUpRightIcon } from 'lucide-react';
import type { FC, HTMLAttributeAnchorTarget, PropsWithChildren } from 'react';

import ActiveLink from '@/components/Common/ActiveLink';
import { cn } from '@/lib/utils';

type NavItemType = 'nav' | 'footer';

type NavItemProps = {
  href: string;
  type?: NavItemType;
  className?: string;
  target?: HTMLAttributeAnchorTarget | undefined;
};

const NavItem: FC<PropsWithChildren<NavItemProps>> = ({
  href = '',
  type = 'nav',
  children,
  className,
  target,
}) => (
  <ActiveLink
    href={href}
    className={cn(
      'inline-flex items-center gap-2 rounded px-3 py-2 text-foreground',
      type === 'footer' && 'hover:bg-muted',
      className
    )}
    activeClassName="bg-primary text-primary-foreground [&_svg]:text-primary-foreground/50"
    allowSubPath={href.startsWith('/')}
    target={target}
  >
    <span className="text-sm leading-5 font-medium">{children}</span>

    {((type === 'nav' && href.startsWith('http')) || target === '_blank') && (
      <ArrowUpRightIcon aria-hidden="true" className="size-3 text-muted-foreground" />
    )}
  </ActiveLink>
);

export default NavItem;
