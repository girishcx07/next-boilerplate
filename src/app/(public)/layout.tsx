import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid min-h-svh grid-rows-[auto_1fr_auto]">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 py-10">{children}</main>
      <SiteFooter />
    </div>
  );
};

export default PublicLayout;
