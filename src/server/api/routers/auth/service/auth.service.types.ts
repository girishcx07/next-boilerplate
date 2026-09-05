import type { Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

import type { LoginInputType } from '../auth.input';

export type AuthToken = JWT & {
  id: string;
  username: string;
};

export type LoginArgs = {
  input: LoginInputType;
  headers: Headers;
};

export type LogoutArgs = {
  headers: Headers;
  session: Session;
};
