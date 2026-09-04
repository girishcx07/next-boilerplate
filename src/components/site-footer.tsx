import { AppConfig } from '@/constants/appConfig';

export const SiteFooter = () => {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center px-4 text-sm text-muted-foreground">
        © {new Date().getFullYear()} {AppConfig.title}
      </div>
    </footer>
  );
};
