import type { FC, PropsWithChildren } from 'react';

import Footer from '@/components/Containers/Footer';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import WithSidebar from '@/components/withSidebar';

const DefaultLayout: FC<PropsWithChildren> = ({ children }) => (
  <SidebarProvider>
    <WithSidebar navKeys={['home', 'dashboard', 'about']} />
    <SidebarInset>
      <header className="flex h-14 items-center gap-2 border-b px-4">
        <SidebarTrigger />
      </header>
      <div className="flex flex-1 flex-col p-4">{children}</div>
      <Footer />
    </SidebarInset>
  </SidebarProvider>
);

export default DefaultLayout;
