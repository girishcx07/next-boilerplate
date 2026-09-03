import type { AnchorHTMLAttributes, FC } from 'react';

import Link from '@/components/Link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  kind?: 'neutral' | 'primary' | 'secondary' | 'special';
  // We have an extra `disabled` prop as we simulate a button
  disabled?: boolean;
};

const variants = {
  neutral: 'outline',
  primary: 'default',
  secondary: 'secondary',
  special: 'ghost',
} as const;

const Button: FC<ButtonProps> = ({
  kind = 'primary',
  disabled = false,
  href = undefined,
  children,
  className,
  ...props
}) => (
  <Link
    role="button"
    href={disabled ? undefined : href}
    aria-disabled={disabled}
    className={cn(
      buttonVariants({ variant: variants[kind], size: 'lg' }),
      'aria-disabled:pointer-events-none aria-disabled:opacity-50',
      className
    )}
    {...props}
  >
    {children}
  </Link>
);

export default Button;
