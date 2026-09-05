import { api } from '@/trpc/server';

export const getAuthSession = async () => {
  try {
    return await api.auth.session();
  } catch {
    return null;
  }
};
