import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import { Logger } from './api/common/logger';
import { authConfig } from './auth.config';

export { authConfig } from './auth.config';

export async function getAuthSession(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  try {
    const session = await getServerSession(...args, authConfig);
    return session;
  } catch (error: unknown) {
    Logger.error('Failed to get session', error);
    return null;
  }
}

export async function getAuthUser(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  const session = await getAuthSession(...args);
  return session?.user;
}
