import { AuthGuard } from '@/components/AuthGuard';

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return <AuthGuard>{children}</AuthGuard>;
};

export default ProtectedLayout;
