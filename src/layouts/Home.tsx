import type { FC, PropsWithChildren } from 'react';

import CenteredLayout from '@/layouts/Centered';

const HomeLayout: FC<PropsWithChildren> = ({ children }) => (
  <CenteredLayout>
    <main className="gap-8 md:flex-row md:gap-14 xl:gap-28 2xl:gap-32 [&>section:nth-of-type(1)]:flex [&>section:nth-of-type(1)]:max-w-125 [&>section:nth-of-type(1)]:flex-[1_0] [&>section:nth-of-type(1)]:flex-col [&>section:nth-of-type(1)]:gap-8 [&>section:nth-of-type(1)>div]:flex [&>section:nth-of-type(1)>div]:max-w-100 [&>section:nth-of-type(1)>div]:flex-col [&>section:nth-of-type(1)>div]:gap-4 [&>section:nth-of-type(1)>div>p]:text-base md:[&>section:nth-of-type(1)>div>p]:text-lg [&>section:nth-of-type(1)>div>small]:text-center [&>section:nth-of-type(1)>div>small]:text-sm [&>section:nth-of-type(1)>div>small]:text-muted-foreground xs:[&>section:nth-of-type(1)>div>small]:text-xs [&>section:nth-of-type(1)>div>small>sup]:cursor-help [&>section:nth-of-type(2)]:flex [&>section:nth-of-type(2)]:max-w-full [&>section:nth-of-type(2)]:min-w-0 [&>section:nth-of-type(2)]:flex-[1_1] [&>section:nth-of-type(2)]:flex-col [&>section:nth-of-type(2)]:items-center [&>section:nth-of-type(2)]:gap-4 md:[&>section:nth-of-type(2)]:max-w-2xl lg:[&>section:nth-of-type(2)]:max-w-3xl [&>section:nth-of-type(2)>div]:w-full [&>section:nth-of-type(2)>div]:max-w-md md:[&>section:nth-of-type(2)>div]:max-w-full [&>section:nth-of-type(2)>p]:text-center [&>section:nth-of-type(2)>p]:text-sm [&>section:nth-of-type(2)>p]:text-muted-foreground">
      {children}
    </main>
  </CenteredLayout>
);

export default HomeLayout;
