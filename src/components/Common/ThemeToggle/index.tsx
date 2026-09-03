import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import type { FC, MouseEvent } from 'react';

import { Button } from '@/components/ui/button';

type ThemeToggleProps = {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

const ThemeToggle: FC<ThemeToggleProps> = ({ onClick = () => {} }) => {
  const { resolvedTheme, setTheme } = useTheme();
  const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark';

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setTheme(nextTheme);
    onClick(event);
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={handleClick}
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
    >
      <SunIcon aria-hidden="true" className="hidden dark:block" />
      <MoonIcon aria-hidden="true" className="block dark:hidden" />
    </Button>
  );
};

export default ThemeToggle;
