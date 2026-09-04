import Link from 'next/link';

import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { AppConfig } from '@/constants/appConfig';

const navigation = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/portfolio', label: 'Portfolio' },
];

export const SiteHeader = () => {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4">
        <Link href="/" className="font-semibold">
          {AppConfig.title}
        </Link>
        <nav aria-label="Primary navigation" className="flex flex-1 items-center gap-4">
          {navigation.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <ThemeToggle />
        <Button variant="outline" render={<Link href="/login" />} nativeButton={false}>
          Login
        </Button>
      </div>
    </header>
  );
};
